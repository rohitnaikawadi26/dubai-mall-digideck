"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type StatProps = {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
};

function Stat({ value, suffix = "", label, decimals = 0 }: StatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) => {
    const pow = 10 ** decimals;
    const n = Math.round(latest * pow) / pow;
    return decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, mv, value]);

  return (
    <motion.div
      ref={ref}
      className="py-10 text-center"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-5xl font-semibold leading-none tracking-tight text-white/95 sm:text-6xl md:text-7xl">
        <motion.span>{rounded}</motion.span>
        <span className="ml-1 align-top text-white/70">{suffix}</span>
      </div>
      <div className="mt-3 text-sm font-medium tracking-[0.18em] text-white/60 sm:text-base">
        {label}
      </div>
    </motion.div>
  );
}

export default function Scale() {
  const stats = useMemo(
    () =>
      [
        { value: 100, suffix: "M+", label: "Visitors Annually" },
        { value: 5.9, suffix: "M", label: "sq ft Total Area", decimals: 1 },
        { value: 1200, suffix: "+", label: "Retail Stores" },
      ] as const,
    [],
  );

  return (
    <section
      id="scale"
      className="relative w-full bg-black text-white"
      aria-label="Scale"
    >
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24">
        <motion.h2
          className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-tight text-white/95 sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          A Destination at Unmatched Scale
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-3xl text-balance text-center text-base font-medium tracking-[-0.01em] text-white/70 sm:text-lg"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          More than a mall — a city within a city.
        </motion.p>

        <div
          className="mx-auto mt-10 h-px w-24 bg-white/15"
          aria-hidden="true"
        />

        <div className="mt-12 grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-y-0">
          {stats.map((s, idx) => (
            <div key={s.label} className="relative">
              <Stat
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                decimals={"decimals" in s ? s.decimals : 0}
              />
              <div
                className="mx-auto h-px w-24 bg-white/10 md:hidden"
                aria-hidden="true"
              />
              {idx < stats.length - 1 ? (
                <div
                  className="pointer-events-none absolute inset-y-8 right-0 hidden w-px bg-white/10 md:block"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
