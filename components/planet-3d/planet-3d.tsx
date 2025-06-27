"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Animation state manager
const ANIMATION_STATE_KEY = 'planet_animation_completed';

function getAnimationState() {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(ANIMATION_STATE_KEY) === 'true';
}

function setAnimationState(completed: boolean) {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(ANIMATION_STATE_KEY, completed.toString());
}

function Planet({ position = [0, 0, 0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isClient, setIsClient] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [scale, setScale] = useState(0.1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const lastFrameTime = useRef(0);
  
  // Handle client-side hydration and check animation state
  useEffect(() => {
    setIsClient(true);
    const wasCompleted = getAnimationState();
    if (wasCompleted) {
      setScale(2);
      setAnimationCompleted(true);
    }
  }, []);

  // Pre-create and cache materials for better performance
  const materials = useMemo(() => {
    const baseMaterial = new THREE.MeshPhongMaterial({
      specular: new THREE.Color("#ffffff"),
      shininess: 15,
      emissiveIntensity: 0.6
    });

    // Set initial state - always start with orange until we know the state
    baseMaterial.color.copy(new THREE.Color("#FF4500"));
    baseMaterial.emissive.copy(new THREE.Color("#FF1000"));

    return {
      material: baseMaterial,
      startColor: new THREE.Color("#FF4500"),
      endColor: new THREE.Color("#5D3FD3"),
      startEmissive: new THREE.Color("#FF1000"),
      endEmissive: new THREE.Color("#1a0033"),
      tempColor: new THREE.Color(),
      tempEmissive: new THREE.Color()
    };
  }, []);

  // Update material colors when animation state changes
  useEffect(() => {
    if (!isClient) return;
    
    if (animationCompleted) {
      materials.material.color.copy(materials.endColor);
      materials.material.emissive.copy(materials.endEmissive);
    } else {
      materials.material.color.copy(materials.startColor);
      materials.material.emissive.copy(materials.startEmissive);
    }
  }, [animationCompleted, isClient, materials]);

  const config = useMemo(() => ({
    finalSize: 2,
    normalSpeed: 0.01, // Much slower base rotation
    maxSpeed: 3, // Reduced max animation speed
    transitionDuration: 4, // Slightly faster transition
    rotationMultiplier: 0.01 // Slower rotation multiplier
  }), []);

  // Optimized animation updates
  const updateAnimation = useCallback((state: RootState) => {
    if (!isClient) return;
    
    const currentTime = state.clock.getElapsedTime();
    
    if (currentTime - lastFrameTime.current < 0.016) return;
    lastFrameTime.current = currentTime;

    if (!meshRef.current) return;

    // Skip animation if already completed - just gentle rotation
    if (animationCompleted) {
      meshRef.current.rotation.y += config.normalSpeed * config.rotationMultiplier;
      return;
    }

    if (startTime === null) {
      setStartTime(currentTime);
      return;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / config.transitionDuration, 1);

    // Smooth scaling animation
    if (progress < 1) {
      const c4 = (2 * Math.PI) / 3;
      const elasticProgress = progress === 0 ? 0 : progress === 1 ? 1 : 
        Math.max(0, Math.min(1, Math.pow(2, -8 * progress) * Math.sin((progress * 8 - 0.75) * c4) + 1));
      setScale(THREE.MathUtils.lerp(0.1, config.finalSize, elasticProgress));
    }

    // Gentle spin animation during growth
    const spinProgress = Math.min(elapsed / (config.transitionDuration * 0.7), 1);
    const easeOutSpin = 1 - Math.pow(1 - spinProgress, 2);
    const speed = config.normalSpeed + (config.maxSpeed - config.normalSpeed) * (1 - easeOutSpin);
    meshRef.current.rotation.y += speed * config.rotationMultiplier;

    // Smooth color transition
    const colorProgress = Math.min(elapsed / (config.transitionDuration * 1.1), 1);
    const easeInOutColor = colorProgress < 0.5 
      ? 2 * colorProgress * colorProgress 
      : 1 - Math.pow(-2 * colorProgress + 2, 2) / 2;
    
    materials.tempColor.copy(materials.startColor).lerp(materials.endColor, easeInOutColor);
    materials.tempEmissive.copy(materials.startEmissive).lerp(materials.endEmissive, easeInOutColor);
    
    materials.material.color.copy(materials.tempColor);
    materials.material.emissive.copy(materials.tempEmissive);

    // Mark animation as completed
    if (progress >= 1 && colorProgress >= 1 && !animationCompleted) {
      setAnimationCompleted(true);
      setAnimationState(true);
    }
  }, [animationCompleted, startTime, config, materials, isClient]);

  useFrame(updateAnimation);

  return (
    <Sphere
      ref={meshRef}
      args={[1, 24, 24]} // Increased geometry quality for hero page
      position={position as [number, number, number]}
      scale={scale}
      material={materials.material}
    />
  );
}

function Rings({ position = [0, 0, 0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isClient, setIsClient] = useState(false);
  const [ringScale, setRingScale] = useState(0.1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const lastFrameTime = useRef(0);
  
  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    const wasCompleted = getAnimationState();
    if (wasCompleted) {
      setRingScale(3);
      setAnimationCompleted(true);
    }
  }, []);
  
  // Memoize ring assets with better quality
  const ringAssets = useMemo(() => ({
    material: new THREE.MeshPhongMaterial({
      color: "#9F7AEA",
      emissive: "#1a0033",
      specular: "#ffffff",
      shininess: 20,
      transparent: true,
      opacity: 0.85
    }),
    geometry: new THREE.TorusGeometry(1, 0.04, 12, 48), // Higher quality for hero
    finalSize: 3,
    transitionDuration: 4,
    baseSpinSpeed: 0.015, // Much slower base rotation
    maxSpinSpeed: 1.5, // Reduced max speed
    rotationMultiplier: 0.01
  }), []);

  const updateRingAnimation = useCallback((state: RootState) => {
    if (!isClient) return;
    
    const currentTime = state.clock.getElapsedTime();
    
    // Throttle updates
    if (currentTime - lastFrameTime.current < 0.016) return;
    lastFrameTime.current = currentTime;

    if (!meshRef.current) return;

    // Gentle rotation when animation completed
    if (animationCompleted) {
      meshRef.current.rotation.x = Math.PI / 2;
      meshRef.current.rotation.y += ringAssets.baseSpinSpeed * ringAssets.rotationMultiplier;
      return;
    }

    if (startTime === null) {
      setStartTime(currentTime);
      return;
    }

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / ringAssets.transitionDuration, 1);

    // Smooth ring scaling
    if (progress < 1) {
      const c4 = (2 * Math.PI) / 3;
      const elasticProgress = progress === 0 ? 0 : progress === 1 ? 1 : 
        Math.max(0, Math.min(1, Math.pow(2, -8 * progress) * Math.sin((progress * 8 - 0.75) * c4) + 1));
      setRingScale(THREE.MathUtils.lerp(0.1, ringAssets.finalSize, elasticProgress));
    }

    // Moderate spin during animation
    const spinSpeed = ringAssets.baseSpinSpeed + (ringAssets.maxSpinSpeed * (1 - progress * 0.8));
    meshRef.current.rotation.x = Math.PI / 2;
    meshRef.current.rotation.y += spinSpeed * ringAssets.rotationMultiplier;

    if (progress >= 1 && !animationCompleted) {
      setAnimationCompleted(true);
    }
  }, [animationCompleted, startTime, ringAssets, isClient]);

  useFrame(updateRingAnimation);

  return (
    <mesh
      ref={meshRef}
      position={position as [number, number, number]}
      scale={ringScale}
      geometry={ringAssets.geometry}
      material={ringAssets.material}
    />
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const lastFrameTime = useRef(0);
  
  // Optimized star field for hero page
  const starAssets = useMemo(() => {
    const count = 1200; // More stars for hero page
    const pos = new Float32Array(count * 3);
    
    // Deterministic random for consistent star field
    let seedValue = 12345;
    const seedRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      return seedValue / 233280;
    };

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 25 + seedRandom() * 20; // Varied distance
      const theta = seedRandom() * Math.PI * 2;
      const phi = seedRandom() * Math.PI;
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    
    const mat = new THREE.PointsMaterial({
      size: 0.06,
      color: "#ffffff",
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8
    });

    return { geometry: geom, material: mat, rotationSpeed: 0.003 }; // Very slow rotation
  }, []);

  const updateStars = useCallback((state: RootState) => {
    const currentTime = state.clock.getElapsedTime();
    
    // Lower frequency updates for stars
    if (currentTime - lastFrameTime.current < 0.05) return; // ~20fps
    lastFrameTime.current = currentTime;

    if (!starsRef.current) return;

    if (startTime === null) {
      setStartTime(currentTime);
      return;
    }

    const elapsed = currentTime - startTime;
    starsRef.current.rotation.y = elapsed * starAssets.rotationSpeed;
  }, [startTime, starAssets.rotationSpeed]);

  useFrame(updateStars);

  return <points ref={starsRef} geometry={starAssets.geometry} material={starAssets.material} />;
}

function ResponsiveCamera() {
  const [viewport, setViewport] = useState({ width: 1920, height: 1080 }); // Default to desktop

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const updateViewport = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
      }, 150);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });
    return () => {
      window.removeEventListener('resize', updateViewport);
      clearTimeout(timeoutId);
    };
  }, []);

  // Optimized camera settings for hero page
  const cameraSettings = useMemo(() => {
    const isMobile = viewport.width < 768;
    const isTablet = viewport.width >= 768 && viewport.width < 1024;
    
    return {
      position: (isMobile ? [0, 0, 10] : isTablet ? [0, 0, 9] : [0, 0, 8]) as [number, number, number],
      fov: isMobile ? 60 : isTablet ? 50 : 45
    };
  }, [viewport.width]);

  return cameraSettings;
}

export default function PlanetScene({ containerClass = "" }) {
  const { position, fov } = ResponsiveCamera();
  const [pixelRatio, setPixelRatio] = useState(1);

  useEffect(() => {
    // Optimize for hero page - allow higher quality on good devices
    const optimalRatio = Math.min(window.devicePixelRatio, 2);
    setPixelRatio(optimalRatio);
  }, []);

  // Optimized Canvas props for hero page
  const canvasProps = useMemo(() => ({
    camera: { position, fov, near: 0.1, far: 100 },
    dpr: pixelRatio,
    gl: { 
      antialias: true, // Enable for hero page quality
      powerPreference: "high-performance" as const,
      alpha: true,
      depth: true,
      stencil: false,
      preserveDrawingBuffer: false
    },
    style: { 
      background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0a 70%)',
      touchAction: 'none',
      willChange: 'transform',
      transform: 'translateZ(0)'
    },
    frameloop: 'always' as const, // Always render for hero smoothness
    resize: { debounce: 150 }
  }), [position, fov, pixelRatio]);

  // Gentle OrbitControls for hero page
  const controlsSettings = useMemo(() => ({
    enableZoom: false,
    autoRotate: true,
    autoRotateSpeed: 0.15, // Very slow auto-rotation
    enablePan: false,
    enableDamping: true,
    dampingFactor: 0.03,
    maxPolarAngle: Math.PI * 0.8,
    minPolarAngle: Math.PI * 0.2,
    touches: {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    }
  }), []);

  return (
    <div 
      className={`w-full h-full min-h-[500px] ${containerClass}`}
      style={{ 
        contain: 'layout style paint',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <Canvas {...canvasProps}>
        <ambientLight intensity={0.12} color="#4a5568" />
        <pointLight position={[15, 15, 15]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#5D3FD3" />
        <Planet position={[0, 0, 0]} />
        <Rings position={[0, 0, 0]} />
        <Stars />
        <OrbitControls {...controlsSettings} />
      </Canvas>
    </div>
  );
}