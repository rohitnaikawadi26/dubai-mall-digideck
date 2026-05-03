"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type CtaModal = {
  title: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  department: string;
};

export default function CTA() {
  const actions = ["Lease a Space", "Partner With Us", "Book an Event"] as const;
  const [activeAction, setActiveAction] = useState<(typeof actions)[number] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalMap = useMemo<Record<(typeof actions)[number], CtaModal>>(
    () => ({
      "Lease a Space": {
        title: "Global Leasing Desk",
        description:
          "Secure a flagship presence in the world's most sought-after retail ecosystem. Connect with our dedicated luxury leasing directors for portfolio integration.",
        contactEmail: "leasing@thedubaimall.com",
        contactPhone: "+971 4 362 7500",
        department: "EMAAR Malls Management",
      },
      "Partner With Us": {
        title: "Strategic Partnerships",
        description:
          "Collaborate on high-net-worth activations, global campaigns, and exclusive brand takeovers within Fashion Avenue and our premium precincts.",
        contactEmail: "partnerships@thedubaimall.com",
        contactPhone: "+971 4 362 7511",
        department: "Brand & Corporate Alliances",
      },
      "Book an Event": {
        title: "Immersive Events",
        description:
          "Launch your next global collection or host an exclusive VIP viewing in our highly curated, world-class architectural event spaces.",
        contactEmail: "events@thedubaimall.com",
        contactPhone: "+971 4 362 7522",
        department: "Venue & Production Management",
      },
    }),
    [],
  );

  const activeModal = activeAction ? modalMap[activeAction] : null;

  const handleClose = () => {
    setActiveAction(null);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(false);
    }, 500);
  };

  const handleInitiate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <section
      id="cta"
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      aria-label="Final call to action"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2560&auto=format&fit=crop')" }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.35, 0.45, 0.35],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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
            onClick={handleClose}
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
                onClick={handleClose}
                aria-label="Close dialog"
              >
                Close
              </button>

              <div className="mb-6 h-px w-16 bg-[#d4af37]/80" aria-hidden="true" />
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#d4af37]/85">
                {activeModal.department}
              </p>
              <h3 className="text-balance text-3xl font-semibold leading-[1.08] tracking-[0.01em] text-white/95 sm:text-4xl">
                {activeModal.title}
              </h3>
              <p className="mt-5 text-base font-medium leading-relaxed tracking-[0.02em] text-white/70 sm:text-lg">
                {activeModal.description}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition hover:bg-white/[0.04]">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">
                    Direct Email
                  </p>
                  <a href={`mailto:${activeModal.contactEmail}`} className="mt-3 block text-sm tracking-[0.04em] text-white/90 transition hover:text-[#d4af37] sm:text-base">
                    {activeModal.contactEmail}
                  </a>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition hover:bg-white/[0.04]">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/45">
                    Corporate Line
                  </p>
                  <a href={`tel:${activeModal.contactPhone.replace(/\s/g, '')}`} className="mt-3 block text-sm tracking-[0.04em] text-white/90 transition hover:text-[#d4af37] sm:text-base">
                    {activeModal.contactPhone}
                  </a>
                </div>
              </div>
              
              <div className="mt-8 h-[56px] w-full">
                <AnimatePresence mode="wait">
                  {!isSubmitting && !isSuccess ? (
                    <motion.button
                      key="initiate"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      type="button"
                      className="h-full w-full rounded-full bg-[#d4af37]/90 px-8 text-sm font-semibold tracking-[0.1em] text-black shadow-[0_0_20px_rgba(212,175,55,0.15)] transition hover:bg-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                      onClick={handleInitiate}
                    >
                      INITIATE DIALOGUE
                    </motion.button>
                  ) : isSubmitting ? (
                    <motion.button
                      key="submitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      disabled
                      className="flex h-full w-full cursor-wait items-center justify-center rounded-full border border-white/20 bg-white/5 text-xs font-semibold tracking-[0.1em] text-white/70 sm:text-sm"
                    >
                      <svg className="mr-3 h-5 w-5 animate-spin text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      ESTABLISHING SECURE CONNECTION...
                    </motion.button>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex h-full w-full items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 text-xs font-semibold tracking-[0.08em] text-[#d4af37] sm:text-sm"
                    >
                      <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                      REQUEST RECEIVED. A DIRECTOR WILL CONTACT YOU.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
