// components/BackgroundStars.tsx
"use client"
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function BackgroundStars({ count = 2000 }) {
  const meshRef = useRef<THREE.Points>(null!);

  // Generate star positions within a sphere shell
  const positions = useMemo(() => {
    const temp = [];
    const radius = 14;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + Math.random() * 6; // Distance behind planet

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      temp.push(x, y, z);
    }

    return new Float32Array(temp);
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
  attach="attributes-position"
  args={[positions, 3]} // array + itemSize
/>
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#ffffff"
        opacity={1}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
