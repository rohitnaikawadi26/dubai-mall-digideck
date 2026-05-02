"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

type LuxuryPanelProps = {
  title: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function LuxuryPanel({ title, index, total, progress }: LuxuryPanelProps) {
  const start = index / total;
  const end = (index + 1) / total;

  const local = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(local, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(local, [0, 0.3], [24, 0]);
  const scale = useTransform(local, [0, 0.5, 1], [0.97, 1, 1.015]);

  return (
    <section
      className="relative flex h-screen w-screen flex-none items-center justify-center px-6"
      aria-label={title}
    >
      <motion.div style={{ opacity, y, scale }} className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#d4af37]/80">
          Luxury Chapter {index + 1}
        </p>
        <h3 className="mt-5 text-balance text-5xl font-semibold leading-[1.08] tracking-[0.01em] text-white/95 sm:text-6xl md:text-7xl">
          {title}
        </h3>
      </motion.div>

      {index < total - 1 ? (
        <div
          className="pointer-events-none absolute inset-y-24 right-0 hidden w-px bg-white/10 md:block"
          aria-hidden="true"
        />
      ) : null}
    </section>
  );
}

export default function Luxury() {
  const panels = useMemo(
    () => ["Luxury Brands", "Fashion Avenue", "Exclusive Experience"],
    [],
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.24, 0.32], [0, 1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.16], [20, 0]);
  const panelProgress = useTransform(scrollYProgress, [0.25, 1], [0, 1]);
  const x = useTransform(panelProgress, [0, 1], ["0%", `-${(panels.length - 1) * 100}%`]);

  return (
    <section
      id="luxury"
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: `${(panels.length + 1) * 100}vh` }}
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
          <source src="/Luxury%20section%20Vedio.mp4" type="video/mp4" />
        </video>
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12),transparent_45%),linear-gradient(to_bottom,rgba(5,5,5,0.65),rgba(0,0,0,0.9))]"
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[3px]" aria-hidden="true" />

        <motion.div
          className="relative z-20 mx-auto flex h-full max-w-6xl items-center justify-center px-6"
          style={{ opacity: introOpacity, y: introY }}
        >
          <div className="text-center">
            <div className="mx-auto mb-8 h-px w-28 bg-[#d4af37]/70" aria-hidden="true" />
            <h2 className="text-balance text-4xl font-semibold leading-[1.12] tracking-[0.01em] text-white/95 sm:text-5xl md:text-6xl lg:text-7xl">
              Where the World&apos;s Most Iconic Brands Belong
            </h2>
            <p className="mx-auto mt-5 text-balance text-base font-medium tracking-[0.12em] text-[#d4af37]/85 sm:text-lg">
              150+ luxury brands. One destination.
            </p>
            <p className="mx-auto mt-6 max-w-4xl text-balance text-base font-medium leading-relaxed tracking-[0.05em] text-white/70 sm:text-lg md:text-xl">
              Fashion Avenue. Global Flagships. Ultra High Net Worth Audience.
            </p>
            <div className="mx-auto mt-10 h-px w-16 bg-white/20" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.div className="absolute inset-0 z-10 flex h-full w-full" style={{ x }}>
          {panels.map((title, index) => (
            <LuxuryPanel
              key={title}
              title={title}
              index={index}
              total={panels.length}
              progress={panelProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
