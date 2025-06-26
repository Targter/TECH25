"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life?: number;
}

interface ParticleWrapperProps {
  children: ReactNode;
}

export function ParticleWrapper({ children }: ParticleWrapperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sparklesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number>(0);
  const scrollYRef = useRef<number>(0);
  
  // Performance optimization refs
  const frameCountRef = useRef<number>(0);
  const lastResizeTimeRef = useRef<number>(0);
  const sparklePoolRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const container = canvas?.parentElement;

    if (!canvas || !ctx || !container) return;

    // Enable performance optimizations
    ctx.imageSmoothingEnabled = false;

    // Debounced resize function
    const resizeCanvas = () => {
      const now = performance.now();
      if (now - lastResizeTimeRef.current < 100) return; // Debounce resize
      lastResizeTimeRef.current = now;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      createParticles();
    };

    const createParticles = () => {
      const width = canvas.width;
      const height = canvas.height;
      const particles = particlesRef.current;
      particles.length = 0;
      
      // Reduced particle count with adaptive scaling
      const baseCount = 30;
      const screenFactor = Math.min(width * height / (1920 * 1080), 1);
      const count = Math.floor(baseCount * screenFactor);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.4 + 0.3,
        });
      }
    };

    // Object pool for sparkles
    const getSparkle = (): Particle => {
      return sparklePoolRef.current.pop() || {
        x: 0, y: 0, size: 0, speedX: 0, speedY: 0, opacity: 0, life: 0
      };
    };

    const releaseSparkle = (sparkle: Particle) => {
      if (sparklePoolRef.current.length < 50) {
        sparklePoolRef.current.push(sparkle);
      }
    };

    // Optimized line drawing with reduced frequency
    const drawLines = (particles: Particle[]) => {
      // Only draw lines every other frame for performance
      if (frameCountRef.current % 2 !== 0) return;
      
      const threshold = 100 * 100; // Reduced threshold
      const maxLines = 15; // Limit maximum lines drawn
      let lineCount = 0;
      
      for (let i = 0; i < particles.length && lineCount < maxLines; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length && lineCount < maxLines; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < threshold) {
            const opacity = (1 - distSq / threshold) * 0.25;
            ctx.strokeStyle = `rgba(0,255,180,${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            lineCount++;
          }
        }
      }
    };

    // Reduced frame rate for better performance
    const TARGET_FPS = 30;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;
    let lastFrameTime = 0;

    const animate = (currentTime: number) => {
      // Frame rate limiting
      if (currentTime - lastFrameTime < FRAME_INTERVAL) {
        animationFrameIdRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = currentTime;
      frameCountRef.current++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const sparkles = sparklesRef.current;

      // Reduced shadow blur frequency and intensity
      if (frameCountRef.current % 3 === 0) {
        ctx.shadowColor = "rgba(0,255,180,0.3)";
        ctx.shadowBlur = Math.min(5 + scrollYRef.current * 0.005, 10);
      }

      // Update and draw particles in single loop
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        // Boundary checking
        if (p.x < 0 || p.x > canvas.width) p.speedX = -p.speedX;
        if (p.y < 0 || p.y > canvas.height) p.speedY = -p.speedY;

        // Draw particle
        ctx.fillStyle = `rgba(0,255,180,${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 6.28318); // Use constant instead of Math.PI * 2
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      drawLines(particles);

      // Optimized sparkle handling
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.speedX;
        s.y += s.speedY;
        s.opacity -= 0.025;
        s.life! -= 1;

        if (s.opacity > 0 && s.life! > 0) {
          ctx.fillStyle = `rgba(255, 255, 120, ${s.opacity})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, 6.28318);
          ctx.fill();
        } else {
          // Return to pool instead of creating garbage
          releaseSparkle(sparkles.splice(i, 1)[0]);
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    // Throttled click handler
    let lastClickTime = 0;
    const handleClick = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastClickTime < 100) return; // Throttle clicks
      lastClickTime = now;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Reduced sparkle count
      const sparkleCount = Math.min(12, 20 - sparklesRef.current.length);
      for (let i = 0; i < sparkleCount; i++) {
        const sparkle = getSparkle();
        sparkle.x = x;
        sparkle.y = y;
        sparkle.size = Math.random() * 1.5 + 0.5;
        sparkle.speedX = (Math.random() - 0.5) * 2.5;
        sparkle.speedY = (Math.random() - 0.5) * 2.5;
        sparkle.opacity = 1;
        sparkle.life = 35;
        sparklesRef.current.push(sparkle);
      }
    };

    // Throttled scroll handler
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollYRef.current = window.scrollY;
      }, 16);
    };

    resizeCanvas();
    animate(performance.now());

    // Use passive listeners for better performance
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);

    window.addEventListener("scroll", handleScroll, { passive: true });
    canvas.addEventListener("click", handleClick, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      canvas.removeEventListener("click", handleClick);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black"
        style={{ zIndex: 2 }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}