"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Attraction = {
  id: "aquarium" | "ice" | "vr" | "fountain";
  title: string;
  preview: string;
  description: string;
  x: string; // percentage
  y: string; // percentage
};

/** Modal preview: one dedicated file per hotspot in `public/`. */
const attractionVideoMap: Record<Attraction["id"], string> = {
  aquarium: "/dubai-aquarium.mp4",
  ice: "/dubai-mall-ice-rink.mp4",
  vr: "/vr-theme-park.mp4",
  fountain: "/dubai-fountain.mp4",
};

export default function Attractions() {
  const attractions = useMemo<Attraction[]>(
    () => [
      {
        id: "aquarium",
        title: "Aquarium",
        preview: "Underwater wonder at full scale.",
        description:
          "A world-class aquarium experience—dramatic scale, immersive viewing, and unforgettable moments for families and explorers alike.",
        x: "22%",
        y: "31%",
      },
      {
        id: "ice",
        title: "Ice Rink",
        preview: "A winter scene in the heart of the city.",
        description:
          "A signature rink experience—sport, leisure, and spectacle—designed as a social center with energy that carries day to night.",
        x: "66%",
        y: "24%",
      },
      {
        id: "vr",
        title: "VR Park",
        preview: "Next‑gen play, engineered for immersion.",
        description:
          "High-impact virtual adventures—motion, sound, and story—where entertainment becomes a destination in itself.",
        x: "74%",
        y: "66%",
      },
      {
        id: "fountain",
        title: "Dubai Fountain",
        preview: "Iconic water, light, and rhythm.",
        description:
          "A landmark spectacle—timed choreography, music, and scale—creating nightly moments that feel cinematic and shared.",
        x: "36%",
        y: "59%",
      },
    ],
    [],
  );

  const [activeId, setActiveId] = useState<Attraction["id"] | null>(null);
  const [hoveredId, setHoveredId] = useState<Attraction["id"] | null>("aquarium");
  const active = activeId ? attractions.find((a) => a.id === activeId) : null;

  useEffect(() => {
    if (!activeId) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeId]);

  return (
    <section
      id="attractions"
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      aria-label="Attractions"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_50%),linear-gradient(to_bottom,#060606,#000)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-start px-6 pb-10 pt-16 sm:pt-20">
        <motion.h2
          className="text-balance text-center text-4xl font-semibold leading-[1.08] tracking-[0.01em] text-white/95 sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          Beyond Shopping. Pure Experience.
        </motion.h2>
        <motion.p
          className="mx-auto mt-5 max-w-3xl text-balance text-center text-base font-medium leading-relaxed tracking-[0.03em] text-white/70 sm:text-lg"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          Where millions come to experience, not just shop.
        </motion.p>

        <div className="mt-8 flex flex-1 items-center justify-center">
          <motion.div
            className="relative h-[56vh] w-full max-w-5xl rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] sm:h-[60vh]"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Interactive map"
          >
            <div
              className="absolute inset-0 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_60%)]"
              aria-hidden="true"
            />
            <video
              className="absolute inset-0 h-full w-full rounded-[28px] object-cover opacity-30"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src="/busy-shopping-mall-interior.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 rounded-[28px] opacity-70 [background-image:linear-gradient(to_right,rgba(212,175,55,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.10)_1px,transparent_1px)] [background-size:160px_160px]"
              aria-hidden="true"
            />

            {attractions.map((a, index) => {
              const isHovered = hoveredId === a.id;
              
              return (
              <div
                key={a.id}
                className={`absolute transition-all duration-500 ${isHovered ? 'z-20' : 'z-10'}`}
                style={{ left: a.x, top: a.y, transform: "translate(-50%, -50%)" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="group relative"
                    onMouseEnter={() => setHoveredId(a.id)}
                    // We intentionally don't reset hoveredId on mouse leave so one is always visible
                  >
                    <motion.div
                      role="button"
                      tabIndex={0}
                      aria-label={a.title}
                      onClick={() => setActiveId(a.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setActiveId(a.id);
                      }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-black/40 text-white shadow-xl backdrop-blur-md transition-colors duration-300 ${isHovered ? 'border-[#d4af37] bg-[#d4af37] text-black' : 'hover:bg-[#d4af37]/80 hover:text-black'}`}
                    >
                      <span className="text-lg font-light leading-none">+</span>
                      
                      <motion.div
                        className="absolute inset-0 rounded-full border border-[#d4af37]/80"
                        animate={{ scale: [1, 2.2], opacity: [0.8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: index * 0.3 }}
                      />
                    </motion.div>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="pointer-events-none absolute left-1/2 top-12 w-[280px] -translate-x-1/2 rounded-2xl border border-white/15 bg-black/80 px-5 py-4 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.95 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#d4af37]">
                            {a.title}
                          </div>
                          <div className="mt-2 text-sm font-medium leading-relaxed text-white/90">
                            {a.preview}
                          </div>
                          <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                            <span>Click for details</span>
                            <span className="h-px w-6 bg-[#d4af37]/50" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            )})}

            <div
              className="absolute bottom-8 left-8 hidden items-center gap-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/90 drop-shadow-md sm:flex"
              aria-hidden="true"
            >
              <motion.span 
                className="h-px w-12 bg-[#d4af37]" 
                animate={{ width: ["2rem", "4rem", "2rem"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              INTERACT TO EXPLORE
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveId(null)}
            aria-label="Attraction details"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              className="relative w-full max-w-3xl rounded-[28px] border border-white/10 bg-[#070707] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:p-10"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 rounded-full border border-white/15 px-3 py-1 text-xs tracking-[0.1em] text-white/70 transition hover:border-white/35 hover:text-white"
                onClick={() => setActiveId(null)}
                aria-label="Close dialog"
              >
                Close
              </button>
              <div className="mb-6 h-px w-28 bg-[#d4af37]/70" aria-hidden="true" />
              <h3 className="text-balance text-3xl font-semibold leading-[1.12] tracking-[0.01em] text-white/95 sm:text-4xl md:text-5xl">
                {active.title}
              </h3>
              <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed tracking-[0.02em] text-white/70 sm:text-lg">
                {active.description}
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs font-medium uppercase tracking-[0.3em] text-white/45">
                  Media Preview
                </div>
                <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
                  <video
                    key={active?.id || "empty"}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                  >
                    <source src={active ? attractionVideoMap[active.id] : "/busy-shopping-mall-interior.mp4"} type="video/mp4" />
                  </video>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="mt-6 rounded-full border border-white/20 px-5 py-2 text-sm tracking-[0.08em] text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Back
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
