"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

type StatProps = {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
  subtext: string;
};

function Stat({ value, suffix = "", label, decimals = 0, subtext }: StatProps) {
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
      className="group relative flex h-full flex-col items-center justify-center rounded-2xl border border-[#d4af37]/20 bg-gradient-to-b from-[#d4af37]/[0.08] to-transparent px-6 py-10 text-center shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:from-[#d4af37]/[0.15] hover:to-black/5 hover:shadow-[0_20px_60px_rgba(212,175,55,0.25)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#d4af37]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />

      <div className="relative z-10 bg-gradient-to-br from-[#FFDF73] via-[#D4AF37] to-[#997A15] bg-clip-text text-4xl font-semibold leading-none tracking-tight text-transparent transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] sm:text-5xl md:text-6xl">
        <motion.span>{rounded}</motion.span>
        <span className="ml-1 align-top text-3xl sm:text-4xl">{suffix}</span>
      </div>
      <div className="relative z-10 mt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]/90 transition-colors duration-500 group-hover:text-[#FFDF73] sm:text-xs">
        {label}
      </div>
      <div className="relative z-10 mt-6 h-px w-8 bg-[#d4af37]/30 transition-colors duration-500 group-hover:bg-[#d4af37]/70" aria-hidden="true" />
      <div className="relative z-10 mt-5 text-xs font-medium tracking-[0.03em] text-white/70 transition-colors duration-500 group-hover:text-white/95">
        {subtext}
      </div>
    </motion.div>
  );
}

export default function Scale() {
  const stats = useMemo(
    () =>
      [
        { value: 100, suffix: "M+", label: "Visitors Annually", subtext: "Surpassing the world's most famous landmarks in sustained high-intent footfall." },
        { value: 5.9, suffix: "M", label: "sq ft Total Area", decimals: 1, subtext: "The largest, most premium retail and lifestyle ecosystem globally." },
        { value: 1200, suffix: "+", label: "Retail Stores", subtext: "Including 200+ exclusive ultra-luxury flagships in Fashion Avenue." },
        { value: 200, suffix: "+", label: "Global Brands", subtext: "A curated mix of the world’s most wanted names—presented with space, light, and restraint." },
      ] as const,
    [],
  );

  return (
    <section
      id="scale"
      className="relative w-full bg-black text-white"
      aria-label="Scale"
    >
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.45] bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2560&auto=format&fit=crop')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12),transparent_70%)]" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-6 h-px w-16 bg-[#d4af37]/70"
          aria-hidden="true"
        />

        <motion.h2
          className="text-balance text-center text-4xl font-semibold leading-[1.08] tracking-[0.01em] text-white/95 sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          A Destination at <br className="hidden sm:block" /> Unmatched Scale
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-balance text-center text-base font-medium tracking-[0.02em] text-white/70 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          More than a mall — a city within a city engineered for brand growth.
        </motion.p>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.3 + idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Stat
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                decimals={"decimals" in s ? s.decimals : 0}
                subtext={s.subtext}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
