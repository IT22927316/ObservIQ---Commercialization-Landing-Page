"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../components/Container";

const milestoneItems = [
  {
    id: "01",
    title: "Project Proposal",
    date: "May 2026",
    marks: "Marks allocated here",
    description:
      "Initial proposal submission covering the project idea, scope, research direction, objectives, and early planning.",
  },
  {
    id: "02",
    title: "Progress Presentation 1",
    date: "June 2026",
    marks: "Marks allocated here",
    description:
      "First progress review showing initial research findings, architecture direction, and early implementation progress.",
  },
  {
    id: "03",
    title: "Progress Presentation 2",
    date: "August 2026",
    marks: "Marks allocated here",
    description:
      "Second evaluation covering deeper implementation progress, technical refinement, and milestone completion.",
  },
  {
    id: "04",
    title: "Final Assessment",
    date: "October 2026",
    marks: "Marks allocated here",
    description:
      "Final project submission and full evaluation of the completed system, report, and technical outcome.",
  },
  {
    id: "05",
    title: "Viva",
    date: "October 2026",
    marks: "Marks allocated here",
    description:
      "Final presentation and discussion of the project, demonstrating understanding of the research and implementation.",
  },
];

const headerMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.06 + i * 0.06,
      duration: 0.45,
      ease: "easeOut",
    },
  }),
};

export default function Milestones() {
  const [openId, setOpenId] = useState<string>("01");

  return (
    <section id="milestones" className="pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="w-full"
        >
          <motion.div variants={headerMotion} className="w-full max-w-4xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">
              Milestones
            </p>

            <h2 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px]">
              Key academic checkpoints across the project timeline.
            </h2>

            <p className="mt-4 max-w-2xl text-[13px] leading-6 text-black/56">
              This section outlines the major project assessments, along with
              their dates, allocated marks, and a short description of what each
              milestone covers.
            </p>
          </motion.div>

          <div className="mt-10 w-full">
            {milestoneItems.map((item, index) => {
              const isOpen = openId === item.id;

              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={itemMotion}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="border-b border-black/8"
                >
                  <button
                    onClick={() =>
                      setOpenId((prev) => (prev === item.id ? "" : item.id))
                    }
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <div className="min-w-0">
                      <div className="mb-2 text-[10px] uppercase tracking-[0.16em] text-black/35">
                        STEP {item.id}
                      </div>

                      <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-black/90">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden rounded-full border border-black/8 px-2.5 py-1 text-[10px] text-black/45 sm:inline-flex">
                        {item.date}
                      </span>
                      <span className="hidden rounded-full border border-black/8 px-2.5 py-1 text-[10px] text-black/45 sm:inline-flex">
                        {item.marks}
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/8 text-[14px] text-black/50">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pr-0 sm:pr-24">
                          <div className="mb-3 flex flex-wrap gap-2 sm:hidden">
                            <span className="rounded-full border border-black/8 px-2.5 py-1 text-[10px] text-black/45">
                              {item.date}
                            </span>
                            <span className="rounded-full border border-black/8 px-2.5 py-1 text-[10px] text-black/45">
                              {item.marks}
                            </span>
                          </div>

                          <p className="max-w-2xl text-[14px] leading-6 text-black/56">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}