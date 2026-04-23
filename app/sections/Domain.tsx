"use client";

import { motion } from "framer-motion";
import Container from "../components/Container";

// Define domain items
const domainItems = [
  {
    figure: "FIG 0.1",
    title: "Literature survey",
    description:
      "Review the existing academic and industry work related to observability, monitoring systems, anomaly detection, and intelligent system interpretation.",
    image: "/images/iso_1stt.png", // Add unique image path for each section
  },
  {
    figure: "FIG 0.2",
    title: "Research gap",
    description:
      "Current observability platforms expose metrics, logs, alerts, and anomalies, but they still rely heavily on engineers to interpret what those signals mean across the system.",
    image: "/images/iso_22.png", // Unique image path for this section
  },
  {
    figure: "FIG 0.3",
    title: "Research problem",
    description:
      "Define the central challenge of helping teams move from raw observability data to meaningful system understanding with less manual interpretation.",
    image: "/images/iso_3rd.png", // Unique image path for this section
  },
  {
    figure: "FIG 0.4",
    title: "Research objectives",
    description:
      "Present the goals of the project, including building a clearer observability workflow, improving interpretability, and structuring multi-signal analysis.",
    image: "/images/iso_4th.png", // Unique image path for this section
  },
  {
    figure: "FIG 0.5",
    title: "Methodology",
    description:
      "ObserviQ is designed as an intelligent middleware layer that structures, analyzes, and connects different observability signals through specialized agents.",
    image: "/images/iso_5th.png", // Unique image path for this section
  },
  {
    figure: "FIG 0.6",
    title: "Technologies used",
    description:
      "The solution combines a modern web interface, observability workflows, agent-driven analysis, and system-level service modeling to present a clearer operational picture.",
    image: "/images/iso_2nd.webp", // Unique image path for this section
  },
];

// Define motion animations
const headerMotion = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const, // Use "easeOut" as const to resolve the TypeScript error
    },
  },
};

const containerMotion = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const, // Use "easeOut" as const to resolve the TypeScript error
    },
  },
};

export default function Domain() {
  return (
    <section id="domain" className="pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.div variants={headerMotion} className="max-w-5xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-black/45">
              Domain
            </p>

            <h2 className="max-w-4xl text-2xl font-semibold leading-[1.06] tracking-[-0.045em] text-black sm:text-3xl lg:text-5xl">
              A research direction focused on making observability more
              interpretable, structured, and system-aware.
            </h2>
          </motion.div>

          <motion.div
            variants={containerMotion}
            className="mt-12 grid gap-y-12 border-t border-black/8 pt-8 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-0 lg:gap-y-14 lg:border-t-0 lg:pt-0"
          >
            {domainItems.map((item, index) => {
              const isFirstInRowDesktop = index % 3 === 0;

              return (
                <motion.div
                  key={item.title}
                  variants={itemMotion}
                  className={`border-black/8 ${
                    !isFirstInRowDesktop ? "lg:border-l" : ""
                  }`}
                >
                  <div className="lg:px-5">
                    <div className="mb-5 text-[11px] uppercase tracking-[0.16em] text-black/35">
                      {item.figure}
                    </div>

                    <div className="flex h-[230px] items-center justify-center rounded-[16px]">
                      <div className="text-center">
                        <img
                          src={item.image} // Use the dynamic image source
                          alt={item.title}
                          className="mt-3 max-w-full h-auto object-contain"
                        />
                      </div>
                    </div>

                    <div className="mt-7">
                      <h3 className="text-[16px] font-semibold tracking-[-0.035em] text-black/90">
                        {item.title}
                      </h3>

                      <p className="mt-1 max-w-[300px] text-[14px] leading-5.5 text-black/56">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}