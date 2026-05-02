"use client";

import type { MotionValue } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

type RetailPanelProps = {
  title: string;
  body: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
};

function RetailPanel({ title, body, index, total, scrollYProgress }: RetailPanelProps) {
  const start = index / total;
  const end = (index + 1) / total;

  const local = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(local, [0, 0.25, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(local, [0, 0.3], [18, 0]);

  return (
    <section
      className="relative flex h-screen w-screen flex-none items-center justify-center px-6"
      aria-label={title}
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div style={{ opacity, y }} className="text-center">
          <div className="mx-auto mb-8 h-px w-24 bg-white/15" aria-hidden="true" />
          <h3 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight text-white/95 sm:text-6xl md:text-7xl">
            {title}
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base font-medium tracking-[-0.01em] text-white/70 sm:text-lg">
            {body}
          </p>
          <div className="mx-auto mt-10 h-px w-24 bg-white/10" aria-hidden="true" />
        </motion.div>
      </div>

      {index < total - 1 ? (
        <div
          className="pointer-events-none absolute inset-y-20 right-0 hidden w-px bg-white/10 md:block"
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
      },
      {
        title: "Flagship Stores",
        body: "Immersive, architectural flagships designed as destinations—where the store is the statement.",
      },
      {
        title: "Pop-up Experiences",
        body: "Limited-time takeovers that keep the floor dynamic—culture, drops, and moments worth arriving for.",
      },
      {
        title: "Retail Innovation",
        body: "Seamless discovery—digital layers, frictionless service, and experiences that feel effortless.",
      },
    ],
    [],
  );

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
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
      className="relative w-full bg-black"
      style={{ height: `${panels.length * 100}vh` }}
      aria-label="Retail"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_55%)]" aria-hidden="true" />

        <motion.div
          className="relative z-10 flex h-full w-full"
          style={{ x }}
        >
          {panels.map((p, i) => (
            <RetailPanel
              key={p.title}
              title={p.title}
              body={p.body}
              index={i}
              total={panels.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
