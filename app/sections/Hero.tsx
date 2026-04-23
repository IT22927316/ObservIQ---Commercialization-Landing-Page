"use client";

import { motion } from "framer-motion";
import Container from "../components/Container";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-10 pt-16 sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top,rgba(110,124,246,0.16),transparent_60%)]" />

      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-black/45"
          >
            Smart Observability Middleware
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-6xl lg:text-7xl"
          >
            A cleaner way to understand complex systems
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-[15px] leading-7 text-black/58 sm:text-[17px]"
          >
            ObserviQ helps teams understand metrics, logs, alerts, and anomalies
            across distributed services through a cleaner observability
            experience.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="https://github.com/nimashag/nodejs-springboot-observabilitydata-collection-app"
              className="inline-flex items-center justify-center rounded-full bg-black/90 px-5 py-3 text-sm font-medium text-white no-underline transition hover:bg-black/80"
              style={{ color: 'white' }}
              target="_blank"
            >
              Explore project
            </a>

            <a
              href="#documents"
              className="rounded-full border border-[#e5e7eb] bg-white px-5 py-3 text-sm font-medium text-[#111111] transition hover:bg-[#f7f7f4]"
            >
              View documents
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}