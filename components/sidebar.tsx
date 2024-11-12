"use client";

import { aboutYou } from "@/lib/data";
import { useEffect, useState, useRef } from "react";

export default function Sidebar() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateEyePosition = (eyeRef: React.RefObject<HTMLDivElement>) => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    const eyeRect = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    // Calculate the distance between mouse and eye center
    const deltaX = mousePosition.x - eyeCenterX;
    const deltaY = mousePosition.y - eyeCenterY;

    // Calculate the distance ratio
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 100; // Maximum pixel distance for full eye movement
    const ratio = Math.min(distance / maxDistance, 1);

    // Calculate maximum movement (3px in any direction)
    const maxMove = 3;
    const moveX = (deltaX / distance) * maxMove * ratio;
    const moveY = (deltaY / distance) * maxMove * ratio;

    return {
      x: isNaN(moveX) ? 0 : moveX,
      y: isNaN(moveY) ? 0 : moveY,
    };
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col space-y-2 p-4 h-fit static md:sticky top-24">
        {/* Title/Name */}
        <p className="font-semibold leading-none tracking-tight">
          {aboutYou.name}
        </p>
        {/* Description with hover effect container */}
        <div className="group relative">
          <p className="text-sm text-muted-foreground tracking-tight">
            {aboutYou.description}
          </p>
          <p className="text-sm text-muted-foreground tracking-tight mt-2 overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out italic">
            "Crafting digital experiences with code, turning ideas into
            interactive realities, one line at a time."
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col items-center justify-center p-8 h-32  static md:sticky top-64">
        <div className="flex gap-8">
          <div className="eye-container w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center overflow-hidden">
            <div
              ref={leftEyeRef}
              className="eye-pupil w-6 h-6 rounded-full bg-black relative"
              style={{
                transform: `translate(${
                  calculateEyePosition(leftEyeRef).x
                }px, ${calculateEyePosition(leftEyeRef).y}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
          <div className="eye-container w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center overflow-hidden">
            <div
              ref={rightEyeRef}
              className="eye-pupil w-6 h-6 rounded-full bg-black relative"
              style={{
                transform: `translate(${
                  calculateEyePosition(rightEyeRef).x
                }px, ${calculateEyePosition(rightEyeRef).y}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
