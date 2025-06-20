"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Hit generate and let AI do the rest",
      description: "Create flawless marketing videos without lifting a finger",
      buttonText: "Try Suplimax",
      buttonHref: "/suplimax",
      bgColor: "bg-[#5c6ac4]",
      hoverColor: "hover:bg-[#4a58b0]",
    },
    {
      title: "Stunning Real Estate Videos",
      description: "Automatically generate property tours in seconds",
      buttonText: "Try Real Estate",
      buttonHref: "/real-estate",
      bgColor: "bg-[#5c6ac4]",
      hoverColor: "hover:bg-[#4a58b0]",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative w-full max-w-4xl h-96">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-1000 space-y-6 ${
              index === activeSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              {slide.title}
            </h1>
            <p className="text-lg text-gray-600">{slide.description}</p>
            <Link
              href={slide.buttonHref}
              className={`inline-block ${slide.bgColor} ${slide.hoverColor} text-white font-medium py-3 px-8 rounded-md text-lg transition-colors`}
            >
              {slide.buttonText}
            </Link>
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === activeSlide ? "bg-[#5c6ac4]" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
