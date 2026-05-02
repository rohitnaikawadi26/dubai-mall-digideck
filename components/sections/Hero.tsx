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
        <source src="/Hero%20Vedio.mp4" type="video/mp4" />
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
              className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white/95 sm:text-5xl md:text-6xl lg:text-7xl"
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
        </motion.div>
      </div>
    </section>
  );
}
