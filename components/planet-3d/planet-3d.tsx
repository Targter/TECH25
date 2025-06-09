"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Planet({ position = [0, 0, 0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0.1);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Memoize materials to prevent recreation
  const material = useMemo(() => new THREE.MeshPhongMaterial({
    specular: new THREE.Color("#ffffff"),
    shininess: 10,
    emissiveIntensity: 0.8
  }), []);

  // Memoize colors to avoid recreation
  const colors = useMemo(() => ({
    startColor: new THREE.Color("#FF4500"),
    endColor: new THREE.Color("#5D3FD3"),
    startEmissive: new THREE.Color("#FF0000"),
    endEmissive: new THREE.Color("#000000")
  }), []);

  const finalSize = 2;
  const normalSpeed = 0.1;
  const maxSpeed = 15;
  const transitionDuration = 5;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    if (startTime === null) {
      setStartTime(clock.getElapsedTime());
      return;
    }

    const elapsed = clock.getElapsedTime() - startTime;
    const progress = Math.min(elapsed / transitionDuration, 1);

    // Explosive growth animation (easeOutElastic)
    if (progress < 1) {
      const c4 = (2 * Math.PI) / 3;
      const elasticProgress = progress === 0 ? 0 : progress === 1 ? 1 : 
        Math.pow(2, -10 * progress) * Math.sin((progress * 10 - 0.75) * c4) + 1;
      setScale(THREE.MathUtils.lerp(0.1, finalSize, elasticProgress));
    }

    // Optimized spin animation
    const spinProgress = Math.min(elapsed / (transitionDuration * 0.8), 1);
    const easeOutSpin = 1 - Math.pow(1 - spinProgress, 3);
    const speed = maxSpeed - (maxSpeed - normalSpeed) * easeOutSpin;
    meshRef.current.rotation.y += speed * 0.05;

    // Color transition with memoized colors
    const colorProgress = Math.min(elapsed / (transitionDuration * 1.2), 1);
    const tempColor = colors.startColor.clone().lerp(colors.endColor, colorProgress);
    const tempEmissive = colors.startEmissive.clone().lerp(colors.endEmissive, colorProgress);
    
    material.color.copy(tempColor);
    material.emissive.copy(tempEmissive);
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 24, 24]} // Reduced geometry complexity
      position={position as [number, number, number]}
      scale={scale}
      material={material}
    />
  );
}

function Rings({ position = [0, 0, 0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [ringScale, setRingScale] = useState(0.1);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Memoize ring material
  const material = useMemo(() => new THREE.MeshPhongMaterial({
    color: "#9F7AEA",
    emissive: "#000000",
    specular: "#ffffff",
    shininess: 10,
    transparent: true,
    opacity: 0.8
  }), []);

  // Memoize geometry
  const geometry = useMemo(() => new THREE.TorusGeometry(1, 0.05, 12, 64), []);

  const finalSize = 3;
  const transitionDuration = 5;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    if (startTime === null) {
      setStartTime(clock.getElapsedTime());
      return;
    }

    const elapsed = clock.getElapsedTime() - startTime;
    const progress = Math.min(elapsed / transitionDuration, 1);

    if (progress < 1) {
      const c4 = (2 * Math.PI) / 3;
      const elasticProgress = progress === 0 ? 0 : progress === 1 ? 1 : 
        Math.pow(2, -10 * progress) * Math.sin((progress * 10 - 0.75) * c4) + 1;
      setRingScale(THREE.MathUtils.lerp(0.1, finalSize, elasticProgress));
    }

    const spinSpeed = 0.5 + (5 * (1 - progress));
    meshRef.current.rotation.x = Math.PI / 2;
    meshRef.current.rotation.y += spinSpeed * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      position={position as [number, number, number]}
      scale={ringScale}
      geometry={geometry}
      material={material}
    />
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Memoize star data
  const { geometry, material } = useMemo(() => {
    const count = 1500; // Reduced count for better performance
    const pos = new Float32Array(count * 3);
    
    let seedValue = 12345;
    const seedRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      return seedValue / 233280;
    };

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (seedRandom() - 0.5) * 50;
      pos[i3 + 1] = (seedRandom() - 0.5) * 50;
      pos[i3 + 2] = (seedRandom() - 0.5) * 50;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    
    const mat = new THREE.PointsMaterial({
      size: 0.1,
      color: "#ffffff",
      sizeAttenuation: true
    });

    return { geometry: geom, material: mat };
  }, []);

  useFrame(({ clock }) => {
    if (!starsRef.current) return;

    if (startTime === null) {
      setStartTime(clock.getElapsedTime());
      return;
    }

    const elapsed = clock.getElapsedTime() - startTime;
    starsRef.current.rotation.y = elapsed * 0.02;
  });

  return <points ref={starsRef} geometry={geometry} material={material} />;
}

function ResponsiveCamera() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Calculate responsive camera position
  const cameraPosition = useMemo((): [number, number, number] => {
    const isMobile = viewport.width < 768;
    const isTablet = viewport.width >= 768 && viewport.width < 1024;
    
    if (isMobile) return [0, 0, 12];
    if (isTablet) return [0, 0, 11];
    return [0, 0, 10];
  }, [viewport.width]);

  const fov = useMemo(() => {
    const isMobile = viewport.width < 768;
    return isMobile ? 55 : 45;
  }, [viewport.width]);

  return { position: cameraPosition, fov };
}

export default function PlanetScene({ containerClass = "" }) {
  const { position, fov } = ResponsiveCamera();
  const [pixelRatio, setPixelRatio] = useState(1);

  useEffect(() => {
    // Limit pixel ratio for performance
    setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }, []);

  return (
    <div className={`w-full h-full min-h-[400px] ${containerClass}`}>
      <Canvas 
        camera={{ position, fov }}
        dpr={pixelRatio}
        gl={{ 
          antialias: window.devicePixelRatio <= 1, // Disable on high DPI for performance
          powerPreference: "high-performance",
          alpha: false
        }}
        style={{ 
          background: 'linear-gradient(to bottom, #0a0a0a, #1a0a2e)',
          touchAction: 'none' // Prevent mobile scroll interference
        }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Planet position={[0, 0, 0]} />
        <Rings position={[0, 0, 0]} />
        <Stars />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          enablePan={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
          }}
        />
      </Canvas>
    </div>
  );
}