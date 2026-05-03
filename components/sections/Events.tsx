"use client";

import type { MotionValue } from "framer-motion";
import { AnimatePresence, animate, motion, useInView, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type EventItem = {
  id: "concerts" | "activations" | "launches" | "corporate";
  title: string;
  description: string;
};

/** Modal preview: dedicated file per timeline row (`public/`). */
const eventModalVideoMap: Record<EventItem["id"], string> = {
  concerts: "/concert-inside.mp4",
  activations: "/brand-activation.mp4",
  launches: "/product-launches.mp4",
  corporate: "/corporate-event.mp4",
};

type TimelineItemProps = {
  item: EventItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpen: (id: EventItem["id"]) => void;
};

function TimelineItem({ item, index, total, progress, onOpen }: TimelineItemProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const local = useTransform(progress, [start, end], [0, 1]);
  const opacity = useTransform(local, [0, 0.3, 1], [0.35, 0.75, 1]);
  const x = useTransform(local, [0, 1], [30, 0]);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(item.id);
      }}
      className="group relative cursor-pointer pl-12 py-2 outline-none"
      style={{ opacity, x }}
      whileHover={{ x: 8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Outer ring */}
      <span className="absolute left-0 top-4 h-6 w-6 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm transition-colors duration-500 group-hover:border-[#d4af37]/60">
        {/* Inner dot */}
        <span className="absolute inset-[6px] rounded-full bg-white/40 transition-all duration-500 group-hover:bg-[#d4af37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
      </span>
      
      <div className="flex items-center gap-4">
        <h3 className="text-3xl font-semibold leading-tight tracking-[0.01em] text-white/80 transition-colors duration-500 group-hover:text-[#d4af37] sm:text-4xl">
          {item.title}
        </h3>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100 group-hover:border-[#d4af37]/50 group-hover:bg-[#d4af37]/20 group-hover:text-[#d4af37]">
           <svg className="ml-0.5 h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
      </div>
      
      <p className="mt-2 text-xs font-semibold tracking-[0.15em] uppercase text-white/30 transition-colors duration-500 group-hover:text-[#d4af37]/80">
        Click to view gallery
      </p>
      <div className="mt-4 h-px w-12 bg-white/10 transition-all duration-500 group-hover:w-32 group-hover:bg-[#d4af37]/50" />
    </motion.div>
  );
}

function EventsCounter() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, 1000, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, mv]);

  return (
    <motion.div
      ref={ref}
      className="mt-10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-5xl font-semibold leading-none tracking-tight text-white/95 sm:text-6xl">
        <motion.span>{rounded}</motion.span>
        <span className="ml-1 text-white/75">+</span>
      </div>
      <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-white/65 sm:text-base">
        Events Hosted Annually
      </p>
    </motion.div>
  );
}

export default function Events() {
  const items = useMemo<EventItem[]>(
    () => [
      {
        id: "concerts",
        title: "Concerts",
        description:
          "Global music productions and headline performances designed to drive destination-wide footfall and media visibility.",
      },
      {
        id: "activations",
        title: "Brand Activations",
        description:
          "Immersive campaigns and experiential takeovers that convert brand presence into measurable audience engagement.",
      },
      {
        id: "launches",
        title: "Product Launches",
        description:
          "High-impact unveilings for regional and global releases with premium production, storytelling, and amplification.",
      },
      {
        id: "corporate",
        title: "Corporate Events",
        description:
          "Executive forums, strategic summits, and private showcases aligned with enterprise-level standards and scale.",
      },
    ],
    [],
  );

  const [activeId, setActiveId] = useState<EventItem["id"] | null>(null);
  const active = activeId ? items.find((i) => i.id === activeId) : null;
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 25%"],
  });

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
      id="events"
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      aria-label="Events"
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
        <source src="/concert-inside.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_50%),linear-gradient(to_bottom,rgba(7,7,7,0.7),rgba(0,0,0,0.9))]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 py-16">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[0.01em] text-white/95 sm:text-5xl md:text-6xl">
              A Global Stage for World-Class Events
            </h2>
            <p className="mt-5 max-w-xl text-balance text-base font-medium leading-relaxed tracking-[0.04em] text-white/80 sm:text-lg">
              Where global brands meet millions in real time.
            </p>
            <p className="mt-4 max-w-xl text-balance text-base font-medium leading-relaxed tracking-[0.03em] text-white/70 sm:text-lg">
              Concerts. Brand Activations. Product Launches. Experiences at scale.
            </p>
            <EventsCounter />
          </motion.div>

          <motion.div
            ref={timelineRef}
            className="relative"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute bottom-0 left-[11px] top-0 w-px bg-white/15" aria-hidden="true" />
            <div className="space-y-6">
              {items.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  index={index}
                  total={items.length}
                  progress={timelineProgress}
                  onOpen={setActiveId}
                />
              ))}
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
            role="dialog"
            aria-modal="true"
            aria-label="Event details"
          >
            <motion.div
              className="relative w-full max-w-3xl rounded-[28px] border border-white/10 bg-[#070707] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:p-10"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
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
              <div className="mb-6 h-px w-24 bg-[#d4af37]/70" aria-hidden="true" />
              <h3 className="text-3xl font-semibold leading-[1.1] tracking-[0.01em] text-white/95 sm:text-4xl">
                {active.title}
              </h3>
              <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed tracking-[0.02em] text-white/70 sm:text-lg">
                {active.description}
              </p>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-xs font-medium uppercase tracking-[0.28em] text-white/45">
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
                    <source
                      src={active ? eventModalVideoMap[active.id] : "/concert-inside.mp4"}
                      type="video/mp4"
                    />
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
