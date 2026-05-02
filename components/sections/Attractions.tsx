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
  aquarium: "/Dubai_Aquarium.mp4",
  ice: "/Dubai_mall_ice_rink.mp4",
  vr: "/VR_Theme_Park.mp4",
  fountain: "/Dubai%20Fountain.mp4",
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
              <source src="/Busy_shopping_mall_interior_people.mp4" type="video/mp4" />
            </video>
            <div
              className="absolute inset-0 rounded-[28px] opacity-70 [background-image:linear-gradient(to_right,rgba(212,175,55,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.10)_1px,transparent_1px)] [background-size:160px_160px]"
              aria-hidden="true"
            />

            {attractions.map((a) => (
              <div
                key={a.id}
                className="absolute"
                style={{ left: a.x, top: a.y, transform: "translate(-50%, -50%)" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="group relative"
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                  >
                    <motion.div
                      role="button"
                      tabIndex={0}
                      aria-label={a.title}
                      onClick={() => setActiveId(a.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setActiveId(a.id);
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative h-4 w-4 cursor-pointer rounded-full bg-[#d4af37]/90 shadow-[0_0_0_6px_rgba(212,175,55,0.12),0_10px_30px_rgba(0,0,0,0.45)] outline-none ring-0 transition"
                    >
                      <span
                        className="absolute inset-0 rounded-full bg-[#d4af37]/70 blur-[10px]"
                        aria-hidden="true"
                      />
                    </motion.div>

                    <motion.div
                      className="pointer-events-none absolute left-1/2 top-7 w-[260px] -translate-x-1/2 rounded-2xl border border-white/10 bg-black/65 px-4 py-3 backdrop-blur-md"
                      variants={{
                        rest: { opacity: 0, y: 8, scale: 0.98 },
                        hover: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="text-sm font-semibold tracking-[0.08em] text-white/90">
                        {a.title}
                      </div>
                      <div className="mt-1 text-sm leading-snug text-white/65">
                        {a.preview}
                      </div>
                      <div className="mt-3 h-px w-10 bg-[#d4af37]/60" aria-hidden="true" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            ))}

            <div
              className="absolute bottom-6 left-6 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-white/45 sm:flex"
              aria-hidden="true"
            >
              <span className="h-px w-10 bg-[#d4af37]/60" />
              Explore attractions
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
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                  >
                    <source src={active ? attractionVideoMap[active.id] : "/Busy_shopping_mall_interior_people.mp4"} type="video/mp4" />
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
