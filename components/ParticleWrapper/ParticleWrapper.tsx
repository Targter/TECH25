"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ intensity = 0.7, rotationSpeed = 0.002, starCount = 1500 }: { 
  intensity?: number; 
  rotationSpeed?: number; 
  starCount?: number; 
}) {
  const starsRef = useRef<THREE.Points>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const lastFrameTime = useRef(0);
  
  // Enhanced star field for website background
  const starAssets = useMemo(() => {
    const count = starCount;
    const pos = new Float32Array(count * 3);
    
    // Deterministic random for consistent star field
    let seedValue = 12345;
    const seedRandom = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      return seedValue / 233280;
    };

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 30 + seedRandom() * 25; // Wider spread for background
      const theta = seedRandom() * Math.PI * 2;
      const phi = seedRandom() * Math.PI;
      
      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    
    const mat = new THREE.PointsMaterial({
      size: 0.08,
      color: "#ffffff",
      sizeAttenuation: true,
      transparent: true,
      opacity: intensity
    });

    return { geometry: geom, material: mat, rotationSpeed };
  }, [intensity, rotationSpeed, starCount]);

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
  const [viewport, setViewport] = useState({ width: 1920, height: 1080 });

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

  // Camera settings optimized for background use
  const cameraSettings = useMemo(() => {
    const isMobile = viewport.width < 768;
    const isTablet = viewport.width >= 768 && viewport.width < 1024;
    
    return {
      position: (isMobile ? [0, 0, 12] : isTablet ? [0, 0, 10] : [0, 0, 8]) as [number, number, number],
      fov: isMobile ? 65 : isTablet ? 55 : 50
    };
  }, [viewport.width]);

  return cameraSettings;
}

interface StarfieldBackgroundProps {
  className?: string;
  intensity?: number;
  rotationSpeed?: number;
  starCount?: number;
  children?: React.ReactNode;
}

export default function StarfieldBackground({ 
  className = "",
  intensity = 0.7,
  rotationSpeed = 0.002,
  starCount = 1500,
  children
}: StarfieldBackgroundProps) {
  const { position, fov } = ResponsiveCamera();
  const [pixelRatio, setPixelRatio] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Optimize pixel ratio for background performance
    const optimalRatio = Math.min(window.devicePixelRatio, 1.5);
    setPixelRatio(optimalRatio);
  }, []);

  // Canvas props optimized for background use
  const canvasProps = useMemo(() => ({
    camera: { position, fov, near: 0.1, far: 100 },
    dpr: pixelRatio,
    gl: { 
      antialias: false, // Disable for better background performance
      powerPreference: "default" as const,
      alpha: true,
      depth: false, // Disable depth buffer for background
      stencil: false,
      preserveDrawingBuffer: false
    },
    style: { 
      background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0a0a 70%)',
      touchAction: 'none',
      pointerEvents: 'none' as const, // Allow clicks to pass through
      position: 'fixed' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1, // Behind all content
      willChange: 'transform',
      transform: 'translateZ(0)'
    },
    frameloop: 'always' as const,
    resize: { debounce: 150 }
  }), [position, fov, pixelRatio]);

  return (
    <>
      {/* Starfield background - only render on client */}
      {isClient && (
        <div className={`fixed inset-0 -z-10 ${className}`}>
          <Canvas {...canvasProps}>
            <ambientLight intensity={0.08} color="#4a5568" />
            <Stars 
              intensity={intensity}
              rotationSpeed={rotationSpeed}
              starCount={starCount}
            />
          </Canvas>
        </div>
      )}
      
      {/* Website content */}
      {children}
    </>
  );
}