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
  const [scale, setScale] = useState(0.1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const lastFrameTime = useRef(0);
  
  // Check if animation was already completed
  useEffect(() => {
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
      shininess: 10,
      emissiveIntensity: 0.8
    });

    // Set initial state based on animation completion
    const wasCompleted = getAnimationState();
    baseMaterial.color.copy(wasCompleted ? new THREE.Color("#5D3FD3") : new THREE.Color("#FF4500"));
    baseMaterial.emissive.copy(wasCompleted ? new THREE.Color("#000000") : new THREE.Color("#FF0000"));

    return {
      material: baseMaterial,
      startColor: new THREE.Color("#FF4500"),
      endColor: new THREE.Color("#5D3FD3"),
      startEmissive: new THREE.Color("#FF0000"),
      endEmissive: new THREE.Color("#000000"),
      tempColor: new THREE.Color(),
      tempEmissive: new THREE.Color()
    };
  }, []);

  const config = useMemo(() => ({
    finalSize: 2,
    normalSpeed: 0.1,
    maxSpeed: 15,
    transitionDuration: 5,
    rotationMultiplier: 0.05
  }), []);

  // Throttled animation updates for better performance
  const updateAnimation = useCallback((state: RootState) => {
    const currentTime = state.clock.getElapsedTime();
    
    // Throttle updates to ~60fps max
    if (currentTime - lastFrameTime.current < 0.016) return;
    lastFrameTime.current = currentTime;

    if (!meshRef.current) return;

    // Skip animation if already completed
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

    // Batch DOM updates
    requestAnimationFrame(() => {
      if (!meshRef.current) return;

      // Explosive growth animation (easeOutElastic) with clamping
      if (progress < 1) {
        const c4 = (2 * Math.PI) / 3;
        const elasticProgress = progress === 0 ? 0 : progress === 1 ? 1 : 
          Math.max(0, Math.min(1, Math.pow(2, -10 * progress) * Math.sin((progress * 10 - 0.75) * c4) + 1));
        setScale(THREE.MathUtils.lerp(0.1, config.finalSize, elasticProgress));
      }

      // Optimized spin animation
      const spinProgress = Math.min(elapsed / (config.transitionDuration * 0.8), 1);
      const easeOutSpin = 1 - Math.pow(1 - spinProgress, 3);
      const speed = config.maxSpeed - (config.maxSpeed - config.normalSpeed) * easeOutSpin;
      meshRef.current.rotation.y += speed * config.rotationMultiplier;

      // Efficient color transition using pre-allocated color objects
      const colorProgress = Math.min(elapsed / (config.transitionDuration * 1.2), 1);
      materials.tempColor.copy(materials.startColor).lerp(materials.endColor, colorProgress);
      materials.tempEmissive.copy(materials.startEmissive).lerp(materials.endEmissive, colorProgress);
      
      materials.material.color.copy(materials.tempColor);
      materials.material.emissive.copy(materials.tempEmissive);

      // Mark animation as completed when done
      if (progress >= 1 && colorProgress >= 1 && !animationCompleted) {
        setAnimationCompleted(true);
        setAnimationState(true);
      }
    });
  }, [animationCompleted, startTime, config, materials]);

  useFrame(updateAnimation);

  return (
    <Sphere
      ref={meshRef}
      args={[1, 16, 16]} // Further reduced geometry for better performance
      position={position as [number, number, number]}
      scale={scale}
      material={materials.material}
    />
  );
}

function Rings({ position = [0, 0, 0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [ringScale, setRingScale] = useState(0.1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const lastFrameTime = useRef(0);
  
  // Check if animation was already completed
  useEffect(() => {
    const wasCompleted = getAnimationState();
    if (wasCompleted) {
      setRingScale(3);
      setAnimationCompleted(true);
    }
  }, []);
  
  // Memoize ring assets
  const ringAssets = useMemo(() => ({
    material: new THREE.MeshPhongMaterial({
      color: "#9F7AEA",
      emissive: "#000000",
      specular: "#ffffff",
      shininess: 10,
      transparent: true,
      opacity: 0.8
    }),
    geometry: new THREE.TorusGeometry(1, 0.05, 8, 32), // Reduced geometry
    finalSize: 3,
    transitionDuration: 5,
    baseSpinSpeed: 0.5,
    maxSpinSpeed: 5,
    rotationMultiplier: 0.05
  }), []);

  const updateRingAnimation = useCallback((state: RootState) => {
    const currentTime = state.clock.getElapsedTime();
    
    // Throttle updates
    if (currentTime - lastFrameTime.current < 0.016) return;
    lastFrameTime.current = currentTime;

    if (!meshRef.current) return;

    // Skip animation if already completed
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

    // Batch updates
    requestAnimationFrame(() => {
      if (!meshRef.current) return;

      if (progress < 1) {
        const c4 = (2 * Math.PI) / 3;
        const elasticProgress = progress === 0 ? 0 : progress === 1 ? 1 : 
          Math.max(0, Math.min(1, Math.pow(2, -10 * progress) * Math.sin((progress * 10 - 0.75) * c4) + 1));
        setRingScale(THREE.MathUtils.lerp(0.1, ringAssets.finalSize, elasticProgress));
      }

      const spinSpeed = ringAssets.baseSpinSpeed + (ringAssets.maxSpinSpeed * (1 - progress));
      meshRef.current.rotation.x = Math.PI / 2;
      meshRef.current.rotation.y += spinSpeed * ringAssets.rotationMultiplier;

      if (progress >= 1 && !animationCompleted) {
        setAnimationCompleted(true);
      }
    });
  }, [animationCompleted, startTime, ringAssets]);

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
  
  // Memoize star data with reduced count
  const starAssets = useMemo(() => {
    const count = 800; // Significantly reduced for better performance
    const pos = new Float32Array(count * 3);
    
    // Use a more efficient random number generator
    let seedValue = 12345;
    const seedRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      return seedValue / 233280;
    };

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (seedRandom() - 0.5) * 40; // Reduced spread
      pos[i3 + 1] = (seedRandom() - 0.5) * 40;
      pos[i3 + 2] = (seedRandom() - 0.5) * 40;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    
    const mat = new THREE.PointsMaterial({
      size: 0.08,
      color: "#ffffff",
      sizeAttenuation: true
    });

    return { geometry: geom, material: mat, rotationSpeed: 0.01 };
  }, []);

  const updateStars = useCallback((state: RootState) => {
    const currentTime = state.clock.getElapsedTime();
    
    // Less frequent updates for stars
    if (currentTime - lastFrameTime.current < 0.033) return; // ~30fps
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
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const updateViewport = () => {
      // Debounce resize events
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
      }, 100);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });
    return () => {
      window.removeEventListener('resize', updateViewport);
      clearTimeout(timeoutId);
    };
  }, []);

  // Calculate responsive camera position
  const cameraSettings = useMemo(() => {
    const isMobile = viewport.width < 768;
    const isTablet = viewport.width >= 768 && viewport.width < 1024;
    
    return {
      position: (isMobile ? [0, 0, 12] : isTablet ? [0, 0, 11] : [0, 0, 10]) as [number, number, number],
      fov: isMobile ? 55 : 45
    };
  }, [viewport.width]);

  return cameraSettings;
}

export default function PlanetScene({ containerClass = "" }) {
  const { position, fov } = ResponsiveCamera();
  const [pixelRatio, setPixelRatio] = useState(1);

  useEffect(() => {
    // Optimize pixel ratio for performance
    const optimalRatio = Math.min(window.devicePixelRatio, 1.5);
    setPixelRatio(optimalRatio);
  }, []);

  // Memoize Canvas props to prevent unnecessary re-renders
  const canvasProps = useMemo(() => ({
    camera: { position, fov },
    dpr: pixelRatio,
    gl: { 
      antialias: false, // Disable for better performance
      powerPreference: "high-performance" as const,
      alpha: false,
      depth: true,
      stencil: false,
      preserveDrawingBuffer: false
    },
    style: { 
      background: 'linear-gradient(to bottom, #0a0a0a, #1a0a2e)',
      touchAction: 'none',
      willChange: 'transform', // Hint for GPU acceleration
      transform: 'translateZ(0)' // Force hardware acceleration
    },
    frameloop: 'demand' as const, // Only render when needed
    resize: { debounce: 100 }
  }), [position, fov, pixelRatio]);

  // Optimized OrbitControls settings
  const controlsSettings = useMemo(() => ({
    enableZoom: false,
    autoRotate: true,
    autoRotateSpeed: 0.3, // Slightly reduced for smoother performance
    enablePan: false,
    enableDamping: true,
    dampingFactor: 0.05,
    maxPolarAngle: Math.PI,
    minPolarAngle: 0,
    touches: {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    }
  }), []);

  return (
    <div 
      className={`w-full h-full min-h-[400px] ${containerClass}`}
      style={{ 
        contain: 'layout style paint',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <Canvas {...canvasProps}>
        <ambientLight intensity={0.08} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Planet position={[0, 0, 0]} />
        <Rings position={[0, 0, 0]} />
        <Stars />
        <OrbitControls {...controlsSettings} />
      </Canvas>
    </div>
  );
}