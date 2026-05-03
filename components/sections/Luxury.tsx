"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

type LuxuryPanelProps = {
  data: {
    title: string;
    subtitle: string;
    body: string;
    image?: string;
    isIntro: boolean;
  };
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function LuxuryPanel({ data, index, total, progress }: LuxuryPanelProps) {
  const enterStart = index * (1 / total); 
  const enterEnd = enterStart + (1 / total) * 0.4;
  
  const exitStart = (index + 1) * (1 / total);
  const exitEnd = exitStart + (1 / total) * 0.4;

  const y = useTransform(
    progress,
    [0, enterStart, enterEnd],
    index === 0 ? ["0%", "0%", "0%"] : ["100%", "100%", "0%"] 
  );

  const scale = useTransform(
    progress,
    [0, exitStart, exitEnd],
    [1, 1, 0.9]
  );

  const opacity = useTransform(
    progress,
    [0, exitStart, exitEnd],
    [1, 1, 0]
  );

  if (data.isIntro) {
    return (
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,transparent_65%)]" aria-hidden="true" />
        
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-10 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" aria-hidden="true" />
          
          <h2 className="text-balance text-6xl font-light leading-tight tracking-tight text-white/95 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] sm:text-7xl md:text-[5.5rem]">
            Where the World's Most <br className="hidden md:block"/>
            <span className="bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#997A15] bg-clip-text font-semibold text-transparent drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
              Iconic Brands
            </span> Belong
          </h2>
          
          <p className="mx-auto mt-10 text-balance text-sm font-semibold uppercase tracking-[0.35em] text-[#d4af37] drop-shadow-[0_5px_15px_rgba(0,0,0,1)] sm:text-base">
            {data.subtitle}
          </p>
          
          <p className="mx-auto mt-6 max-w-3xl text-balance text-xl font-light leading-relaxed tracking-[0.03em] text-white/90 drop-shadow-[0_5px_15px_rgba(0,0,0,1)] sm:text-2xl">
            {data.body}
          </p>
          
          <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" aria-hidden="true" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ y, scale, opacity }} className="absolute inset-0 flex items-center justify-center px-6 py-24 md:p-12 lg:p-24">
      <div className="flex h-full max-h-[750px] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 shadow-[0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:flex-row">
        
        <div className="flex flex-1 flex-col justify-center p-10 md:p-16 lg:p-20">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]/90">
            {data.subtitle}
          </p>
          <h3 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-[0.01em] text-white/95 sm:text-5xl md:text-6xl lg:text-7xl">
            {data.title}
          </h3>
          <p className="mt-6 max-w-xl text-balance text-base font-medium tracking-[0.02em] text-white/70 sm:text-lg">
            {data.body}
          </p>
        </div>

        {data.image && (
          <div className="relative min-h-[300px] w-full md:h-full md:w-[45%] lg:w-[50%]">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[5s] hover:scale-105" 
              style={{ backgroundImage: `url('${data.image}')` }} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-l" aria-hidden="true" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Luxury() {
  const panels = useMemo(
    () => [
      {
        title: "Where the World's Most Iconic Brands Belong",
        subtitle: "150+ LUXURY BRANDS. ONE DESTINATION.",
        body: "Fashion Avenue. Global Flagships. Ultra High Net Worth Audience.",
        isIntro: true,
      },
      {
        title: "Luxury Brands",
        subtitle: "Luxury Chapter 1",
        body: "The definitive destination for the world's most sought-after houses.",
        image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2000&auto=format&fit=crop",
        isIntro: false,
      },
      {
        title: "Fashion Avenue",
        subtitle: "Luxury Chapter 2",
        body: "A dedicated precinct delivering a five-star bespoke shopping experience.",
        image: "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2000&auto=format&fit=crop",
        isIntro: false,
      },
      {
        title: "Exclusive Experience",
        subtitle: "Luxury Chapter 3",
        body: "VIP valet, personal shopping, and discrete private suites.",
        image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2000&auto=format&fit=crop",
        isIntro: false,
      },
    ],
    [],
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="luxury"
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: `${panels.length * 100}vh` }}
      aria-label="Luxury"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/luxury-section-video.mp4" type="video/mp4" />
        </video>
        
        {/* Subtle cinematic overlays for text readability without blur */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2),rgba(0,0,0,0.8))]" aria-hidden="true" />
        
        <div className="absolute inset-0 z-10">
          {panels.map((data, index) => (
            <LuxuryPanel
              key={data.title}
              data={data}
              index={index}
              total={panels.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
