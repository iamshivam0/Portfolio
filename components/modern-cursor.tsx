"use client";

import { useEffect, useState } from "react";

export default function ModernCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.onclick !== null ||
        target.closest("[onclick]") !== null ||
        target.hasAttribute("data-clickable") ||
        target.closest("[data-clickable]") !== null;

      setIsPointer(isClickable);
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <>
      <style jsx global>{`
        body,
        div[onclick],
        a,
        button,
        [role="button"],
        [data-clickable="true"] {
          cursor: none !important;
        }

        @keyframes float {
          0% {
            transform: translateY(0px) translateX(-50%);
          }
          50% {
            transform: translateY(-8px) translateX(-50%);
          }
          100% {
            transform: translateY(0px) translateX(-50%);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-50">
        {/* Main cursor */}
        <div
          className="fixed top-0 left-0 w-4 h-4 transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
          }}
        >
          <div
            className={`absolute inset-0 rounded-full border-2 transition-all duration-150 ease-out ${
              isPointer
                ? "scale-150 border-primary/50 bg-primary/10"
                : "border-primary/80"
            }`}
          />
          {/* Improved click indicator */}
          {isPointer && (
            <div
              className="absolute -top-6 left-1/2 text-sm font-semibold text-primary"
              style={{
                animation: "float 2s ease-in-out infinite",
                textShadow: "0 0 10px rgba(var(--primary), 0.3)",
              }}
            >
              view
            </div>
          )}
          {/* Enhanced decorative elements */}
          {isPointer && (
            <>
              <div
                className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-primary/80 rounded-full"
                style={{
                  animation:
                    "scaleIn 0.3s ease-out, ping 1.5s ease-in-out infinite",
                }}
              />
              <div
                className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-primary/80 rounded-full"
                style={{
                  animation:
                    "scaleIn 0.3s ease-out 0.15s, ping 1.5s ease-in-out infinite 0.75s",
                }}
              />
            </>
          )}
        </div>

        {/* Following dot */}
        <div
          className="fixed top-0 left-0 transition-transform duration-150 ease-out"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${
              isPointer ? 0 : 1
            })`,
          }}
        >
          <div
            className={`w-1 h-1 -ml-[2px] -mt-[2px] rounded-full bg-primary/80`}
          />
        </div>
      </div>
    </>
  );
}
