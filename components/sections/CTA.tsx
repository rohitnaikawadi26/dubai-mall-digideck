"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type CtaModal = {
  title: string;
  description: string;
  contact: string;
};

export default function CTA() {
  const actions = ["Lease a Space", "Partner With Us", "Book an Event"] as const;
  const [activeAction, setActiveAction] = useState<(typeof actions)[number] | null>(null);

  const modalMap = useMemo<Record<(typeof actions)[number], CtaModal>>(
    () => ({
      "Lease a Space": {
        title: "Lease a Space",
        description:
          "Bring your brand to the world’s most visited destination with premium visibility and sustained high-intent footfall.",
        contact: "leasing@dubaimall.ae  |  +971 4 000 0001",
      },
      "Partner With Us": {
        title: "Partner With Us",
        description:
          "Collaborate on campaigns, activations, and long-term strategic initiatives that scale across a global audience.",
        contact: "partnerships@dubaimall.ae  |  +971 4 000 0002",
      },
      "Book an Event": {
        title: "Book an Event",
        description:
          "Host high-impact launches and experiences with production-ready spaces built for business outcomes and brand reach.",
        contact: "events@dubaimall.ae  |  +971 4 000 0003",
      },
    }),
    [],
  );

  const activeModal = activeAction ? modalMap[activeAction] : null;

  return (
    <section
      id="cta"
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      aria-label="Final call to action"
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_50%),linear-gradient(120deg,#050505,#0a0a0a,#030303)]"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          scale: [1, 1.03, 1],
          opacity: [0.95, 1, 0.95],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundSize: "180% 180%" }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,0.18)_0.8px,transparent_0.8px)] [background-size:26px_26px]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.22,
              delayChildren: 0.2,
            },
          },
        }}
      >
        <motion.h2
          className="text-balance text-5xl font-semibold leading-[1.06] tracking-[0.01em] text-white/95 sm:text-6xl md:text-7xl"
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          Be Part of Something Bigger
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-balance text-base font-medium leading-relaxed tracking-[0.03em] text-white/72 sm:text-lg md:text-xl"
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          Join the world&apos;s most visited destination. Partner. Activate. Launch.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {actions.map((label) => (
            <motion.button
              key={label}
              type="button"
              onClick={() => setActiveAction(label)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-[230px] rounded-full border border-white/25 bg-white/[0.02] px-8 py-4 text-base font-medium tracking-[0.08em] text-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-sm transition duration-500 hover:border-white/45 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(255,255,255,0.10)]"
            >
              {label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <motion.p
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 px-6 text-center text-sm font-medium tracking-[0.14em] text-white/58 sm:text-base"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        The opportunity is here. The audience is waiting.
      </motion.p>

      <AnimatePresence>
        {activeModal ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveAction(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeModal.title} details`}
          >
            <motion.div
              className="relative w-full max-w-2xl rounded-[28px] border border-white/12 bg-[#070707]/95 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:p-10"
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-4 top-4 rounded-full border border-white/15 px-3 py-1 text-xs tracking-[0.1em] text-white/70 transition hover:border-white/35 hover:text-white"
                onClick={() => setActiveAction(null)}
                aria-label="Close dialog"
              >
                Close
              </button>

              <div className="mb-6 h-px w-24 bg-white/30" aria-hidden="true" />
              <h3 className="text-balance text-3xl font-semibold leading-[1.08] tracking-[0.01em] text-white/95 sm:text-4xl">
                {activeModal.title}
              </h3>
              <p className="mt-5 text-base font-medium leading-relaxed tracking-[0.02em] text-white/70 sm:text-lg">
                {activeModal.description}
              </p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">
                  Contact
                </p>
                <p className="mt-3 text-sm tracking-[0.04em] text-white/78 sm:text-base">
                  {activeModal.contact}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
