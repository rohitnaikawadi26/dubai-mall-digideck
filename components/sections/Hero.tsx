"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const lines = [
    "Not a Mall.",
    "A Global Destination.",
    "100 Million Visitors. Every Year.",
  ] as const;

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.18,
                delayChildren: 0.15,
              },
            },
          }}
        >
          {lines.map((line) => (
            <motion.p
              key={line}
              className="text-balance text-4xl font-semibold leading-[1.05] tracking-[0.01em] text-white/95 sm:text-5xl md:text-6xl lg:text-7xl"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.85,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {line}
            </motion.p>
          ))}
          
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
              },
            }}
            className="mt-16"
          >
            <button
              onClick={() => {
                document.getElementById('scale')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-4 rounded-full border border-white/20 bg-black/40 px-8 py-4 text-xs font-semibold tracking-[0.2em] text-white backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/60 hover:bg-white/[0.05] sm:text-sm"
              aria-label="Enter the Digideck Experience"
            >
              <span>ENTER EXPERIENCE</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:bg-[#d4af37]/20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 transition-transform duration-500 group-hover:translate-y-0.5 group-hover:opacity-100 group-hover:text-[#d4af37]">
                  <path d="M12 5v14M5 12l7 7 7-7"/>
                </svg>
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
