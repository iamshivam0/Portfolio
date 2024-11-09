"use client";

import { useEffect, useState, useRef } from "react";

interface Point {
  x: number;
  y: number;
  opacity: number;
  hue: number;
}

export default function MouseTrail() {
  const [points, setPoints] = useState<Point[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hue, setHue] = useState(0);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const interpolatePoints = (
    start: { x: number; y: number },
    end: { x: number; y: number },
    steps: number
  ) => {
    const points = [];
    for (let i = 0; i <= steps; i++) {
      points.push({
        x: start.x + (end.x - start.x) * (i / steps),
        y: start.y + (end.y - start.y) * (i / steps),
      });
    }
    return points;
  };

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      setHue((prev) => (prev + 0.3) % 360);

      setPoints((prevPoints) => {
        if (!lastPointRef.current) {
          lastPointRef.current = mousePosition;
          return prevPoints;
        }

        const distance = Math.hypot(
          mousePosition.x - lastPointRef.current.x,
          mousePosition.y - lastPointRef.current.y
        );

        const interpolatedPoints =
          distance > 5
            ? interpolatePoints(
                lastPointRef.current,
                mousePosition,
                Math.min(3, distance / 10)
              )
            : [mousePosition];

        const newPoints = interpolatedPoints.map((point) => ({
          x: point.x,
          y: point.y,
          opacity: 1,
          hue: hue,
        }));

        lastPointRef.current = mousePosition;

        return [...newPoints, ...prevPoints]
          .map((point, index) => ({
            ...point,
            opacity: Math.max(0, 1 - index * 0.035),
          }))
          .filter((point) => point.opacity > 0)
          .slice(0, 20);
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
          filter: "blur(0.5px) brightness(1.2)",
        }}
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: `hsla(${hue}, 100%, 50%, 0.6)` }}
            />
            <stop
              offset="100%"
              style={{ stopColor: `hsla(${(hue + 60) % 360}, 100%, 50%, 0)` }}
            />
          </linearGradient>
        </defs>
        {points.length > 1 && (
          <>
            <path
              d={`M ${points
                .map((point) => `${point.x} ${point.y}`)
                .join(" L ")}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 0 2px hsla(0, 0%, 100%, 0.2))",
              }}
            />
            <path
              d={`M ${points
                .map((point) => `${point.x} ${point.y}`)
                .join(" L ")}`}
              fill="none"
              stroke={`hsla(${hue}, 100%, 50%, 0.2)`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "blur(2px)",
              }}
            />
          </>
        )}
      </svg>

      {points[0] && (
        <div
          style={{
            position: "absolute",
            left: points[0].x - 3,
            top: points[0].y - 3,
            width: "6px",
            height: "6px",
            backgroundColor: `hsla(${hue}, 100%, 50%, 0.8)`,
            borderRadius: "50%",
            filter: "blur(0.5px) brightness(1.2)",
            boxShadow: `0 0 4px 1px hsla(${hue}, 100%, 50%, 0.4), 0 0 8px 2px hsla(${hue}, 100%, 50%, 0.2)`,
          }}
        />
      )}
    </div>
  );
}
