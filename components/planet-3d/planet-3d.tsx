"use client";

import { useRef, useState,  useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Planet({ position = [0, 0, 0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0.1);
  const [color, setColor] = useState("#FF4500");
  const [emissive, setEmissive] = useState("#FF0000");
  const [finalSize] = useState(2);
  const [startTime, setStartTime] = useState<number | null>(null);

  const normalSpeed = 0.1;
  const maxSpeed = 15;
  const transitionDuration = 5;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Initialize start time on first frame
    if (startTime === null) {
      setStartTime(clock.getElapsedTime());
      return;
    }

    const elapsed = clock.getElapsedTime() - startTime;
    const progress = Math.min(elapsed / transitionDuration, 1);

    // Explosive growth animation (easeOutElastic)
    if (progress < 1) {
      const elasticProgress = 1 - Math.pow(2, -10 * progress) * Math.cos(progress * Math.PI * 4);
      const currentScale = THREE.MathUtils.lerp(0.1, finalSize, elasticProgress);
      setScale(currentScale);
    }

    // Spin animation (fast to slow)
    const spinProgress = Math.min(elapsed / (transitionDuration * 0.8), 1);
    const easeOutSpin = 1 - Math.pow(1 - spinProgress, 3);
    const speed = maxSpeed - (maxSpeed - normalSpeed) * easeOutSpin;
    meshRef.current.rotation.y += speed * 0.05;

    // Color transition (volcanic to normal)
    const colorProgress = Math.min(elapsed / (transitionDuration * 1.2), 1);
    const newColor = new THREE.Color("#FF4500").lerp(
      new THREE.Color("#5D3FD3"),
      colorProgress
    );
    const newEmissive = new THREE.Color("#FF0000").lerp(
      new THREE.Color("#000000"),
      colorProgress
    );
    setColor(`#${newColor.getHexString()}`);
    setEmissive(`#${newEmissive.getHexString()}`);
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 32, 32]}
      position={position as [number, number, number]}
      scale={scale}
    >
      <meshPhongMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.8}
        specular="#ffffff"
        shininess={10}
      />
    </Sphere>
  );
}

function Rings({ position = [0, 0, 0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [ringScale, setRingScale] = useState(0.1);
  const [finalSize] = useState(3);
  const [startTime, setStartTime] = useState<number | null>(null);
  const transitionDuration = 5;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    // Initialize start time on first frame
    if (startTime === null) {
      setStartTime(clock.getElapsedTime());
      return;
    }

    const elapsed = clock.getElapsedTime() - startTime;
    const progress = Math.min(elapsed / transitionDuration, 1);

    // Ring growth animation
    if (progress < 1) {
      const elasticProgress = 1 - Math.pow(2, -10 * progress) * Math.cos(progress * Math.PI * 3.5);
      const currentScale = THREE.MathUtils.lerp(0.1, finalSize, elasticProgress);
      setRingScale(currentScale);
    }

    // Fast initial spin that slows down
    const spinSpeed = 0.5 + (5 * (1 - progress));
    meshRef.current.rotation.x = Math.PI / 2;
    meshRef.current.rotation.y += spinSpeed * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      position={position as [number, number, number]}
      scale={ringScale}
    >
      <torusGeometry args={[1, 0.05, 16, 100]} />
      <meshPhongMaterial
        color="#9F7AEA"
        emissive="#000000"
        specular="#ffffff"
        shininess={10}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  
  // Use useMemo to generate consistent star positions
  const { positions } = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    
    // Use a seeded approach for consistent positions
    const seed = 12345; // Fixed seed
    let seedValue = seed;
    
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

    return { positions: pos, particlesCount: count };
  }, []); // Empty dependency array - only compute once

  useFrame(({ clock }) => {
    if (!starsRef.current) return;

    // Initialize start time on first frame
    if (startTime === null) {
      setStartTime(clock.getElapsedTime());
      return;
    }

    const elapsed = clock.getElapsedTime() - startTime;
    starsRef.current.rotation.y = elapsed * 0.02;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        sizeAttenuation={true}
      />
    </points>
  );
}

// Clean component without client checking - let dynamic import handle hydration
export default function PlanetScene({ containerClass = "" }) {
  return (
    <div className={`w-full h-full ${containerClass}`}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Planet position={[0, 0, 0]} />
        <Rings position={[0, 0, 0]} />
        <Stars />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}