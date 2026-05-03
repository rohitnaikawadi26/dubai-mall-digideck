"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

type RetailPanelProps = {
  title: string;
  body: string;
  image: string;
  index: number;
  total: number;
};

function RetailPanel({ title, body, image, index, total }: RetailPanelProps) {
  return (
    <section
      className="relative flex h-screen w-screen flex-none items-center justify-center px-6 md:px-12"
      aria-label={title}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-10 md:flex-row md:justify-between">
        <div className="w-full text-center md:w-[45%] md:text-left">
          <div className="mx-auto mb-8 h-px w-24 bg-[#d4af37]/70 md:mx-0" aria-hidden="true" />
          <h3 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white/95 sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h3>
          <p className="mx-auto mt-6 max-w-md text-balance text-base font-medium tracking-[-0.01em] text-white/70 sm:text-lg md:mx-0">
            {body}
          </p>
          <div className="mx-auto mt-10 h-px w-16 bg-white/15 md:mx-0" aria-hidden="true" />
        </div>

        <div className="relative h-[45vh] w-full md:h-[65vh] md:w-[50%]">
          <div className="absolute inset-0 overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.02] shadow-[0_30px_90px_rgba(0,0,0,0.7)]">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] hover:scale-105"
              style={{ backgroundImage: `url('${image}')` }}
            />
            <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true" />
          </div>
        </div>
      </div>

      {index < total - 1 ? (
        <div
          className="pointer-events-none absolute inset-y-24 right-0 hidden w-px bg-white/10 md:block"
          aria-hidden="true"
        />
      ) : null}
    </section>
  );
}

export default function Retail() {
  const panels = useMemo(
    () => [
      {
        title: "Global Brands",
        body: "A curated mix of the world’s most wanted names—presented with space, light, and restraint.",
        image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop",
      },
      {
        title: "Flagship Stores",
        body: "Immersive, architectural flagships designed as destinations—where the store is the statement.",
        image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2000&auto=format&fit=crop",
      },
      {
        title: "Pop-up Experiences",
        body: "Limited-time takeovers that keep the floor dynamic—culture, drops, and moments worth arriving for.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
      },
      {
        title: "Retail Innovation",
        body: "Seamless discovery—digital layers, frictionless service, and experiences that feel effortless.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop",
      },
    ],
    [],
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(panels.length - 1) * 100}%`],
  );

  return (
    <section
      id="retail"
      ref={sectionRef}
      className="relative w-full bg-[#030303]"
      style={{ height: `${panels.length * 100}vh` }}
      aria-label="Retail"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%),linear-gradient(to_bottom,#030303,#000)]"
            aria-hidden="true"
          />
        </div>

        <motion.div
          className="relative z-10 flex h-full w-full"
          style={{ x }}
        >
          {panels.map((p, i) => (
            <RetailPanel
              key={p.title}
              title={p.title}
              body={p.body}
              image={p.image}
              index={i}
              total={panels.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
