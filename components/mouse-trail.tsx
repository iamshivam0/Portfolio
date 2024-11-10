"use client";

import { useEffect, useState, useRef } from "react";

interface Point {
  x: number;
  y: number;
  opacity: number;
  hue: number;
  scale: number;
  spread: number;
}

export default function MouseTrail() {
  const [points, setPoints] = useState<Point[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(0);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      setHue((prev) => (prev + 0.5) % 360);
      setPoints((prevPoints) => {
        const newPoints = [
          {
            x: mousePosition.x,
            y: mousePosition.y,
            opacity: 1,
            hue: hue,
            scale: 1,
            spread: 0,
          },
          ...prevPoints,
        ];

        return newPoints
          .map((point, index) => ({
            ...point,
            opacity: Math.max(0, 1 - index * 0.025),
            scale: 1 + index * 0.1,
            spread: index * 2,
          }))
          .filter((point) => point.opacity > 0)
          .slice(0, 25);
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1]">
      <svg
        className="absolute h-full w-full"
        style={{
          filter: "blur(8px) contrast(150%)",
        }}
      >
        <defs>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            <feColorMatrix
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 25 -15"
            />
          </filter>
        </defs>
        {points.map((point, index) => (
          <g key={index} filter="url(#liquid)">
            <circle
              cx={point.x}
              cy={point.y}
              r={5 + point.spread}
              fill={`hsla(${(hue + index * 5) % 360}, 100%, 50%, ${
                point.opacity * 0.5
              })`}
              style={{
                transform: `scale(${point.scale})`,
                transformOrigin: `${point.x}px ${point.y}px`,
                transition: "transform 0.15s ease-out",
              }}
            />
          </g>
        ))}
      </svg>

      {/* Glow effect */}
      <div
        className="absolute pointer-events-none mix-blend-screen"
        style={{
          left: mousePosition.x - 15,
          top: mousePosition.y - 15,
          width: "30px",
          height: "30px",
          background: `radial-gradient(circle, hsla(${hue}, 100%, 50%, 0.8) 0%, transparent 70%)`,
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}
