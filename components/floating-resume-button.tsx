"use client";

import { useState, useEffect } from "react";
import { FileDown } from "lucide-react";

export default function FloatingResumeButton() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Set initial window height
    setWindowHeight(window.innerHeight);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDownload = () => {
    window.open(
      "https://drive.google.com/file/d/1C-SnjxyWccRPOUV-5J_zAtCU9aQ6nLtR/view?usp=sharing",
      "_blank"
    );
  };

  return (
    <div
      className="fixed right-8 transition-all duration-500 ease-out pointer-events-auto"
      style={{
        top: windowHeight
          ? `${Math.min(
              Math.max(scrollPosition + 100, 100),
              windowHeight - 150
            )}px`
          : "100px",
      }}
    >
      <button
        onClick={handleDownload}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-clickable="true"
        className="group relative flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-xl p-3 shadow-lg transition-all duration-300 hover:shadow-primary/25 hover:border-primary/50 hover:scale-110"
      >
        <FileDown
          className={`w-5 h-5 text-primary transition-transform duration-300 ${
            isHovered ? "animate-bounce" : ""
          }`}
        />
        <span
          className={`overflow-hidden transition-all duration-300 ${
            isHovered ? "w-20 opacity-100" : "w-0 opacity-0"
          }`}
        >
          Resume
        </span>

        {/* Decorative elements */}
        <div className="absolute -z-10 inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute -z-10 inset-0 rounded-xl border border-primary/20 opacity-0 group-hover:opacity-100 animate-ping" />
      </button>
    </div>
  );
}
