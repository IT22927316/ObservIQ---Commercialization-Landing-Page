"use client";

import { motion } from "framer-motion";
import Container from "../components/Container";

// Define document items
const documentItems = [
  {
    id: "DOC 0.1",
    title: "Project Charter",
    type: "PDF",
    status: "Available",
    href: "https://drive.google.com/file/d/1BF7VRu4aqA8MrKUPAL7rZIW1UE997Woz/view?usp=drive_link",
  },
  {
    id: "DOC 0.2",
    title: "Proposal Documents",
    type: "PDF",
    status: "Available",
    href: "https://drive.google.com/drive/folders/1IhL-8aH_OUjbpqBJAlZehreExgQS7IyV?usp=sharing",
  },
  {
    id: "DOC 0.3",
    title: "Checklist Documents",
    type: "PDF",
    status: "Available",
    href: "https://drive.google.com/drive/folders/1mcDWe12V0pVI89DuUQ4d7NU3AtE_50TF?usp=sharing",
  },
  {
    id: "DOC 0.4",
    title: "Research Paper",
    type: "PDF",
    status: "Available",
    href: "https://drive.google.com/file/d/1K6WQT1Np0tFnQIzYNmrk22TQC0bfc8ag/view?usp=sharing",
  },
  {
    id: "DOC 0.5",
    title: "Final Report",
    type: "PDF",
    status: "Pending",
    href: "",
  },
  {
    id: "DOC 0.6",
    title: "Log Book / Supporting Files",
    type: "PDF",
    status: "Pending",
    href: "",
  },
  {
    id: "VID 0.1",
    title: "Product Demo Video",
    type: "MP4",
    status: "Available",
    href: "https://drive.google.com/file/d/1x2YL52WvWtKjFp7Bm3cDpN-wadA0ZjHl/view?usp=sharing",
  },
];

// Define motion animations
const headerMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const, // Explicitly use 'easeOut' as a valid easing function
    },
  },
};

const listMotion = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const, // Explicitly use 'easeOut' as a valid easing function
    },
  },
};

export default function Documents() {
  return (
    <section id="documents" className="pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="w-full"
        >
          <motion.div variants={headerMotion} className="w-full max-w-4xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">
              Documents
            </p>

            <h2 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px]">
              A structured index of project documents and deliverables.
            </h2>

            <p className="mt-4 max-w-2xl text-[13px] leading-6 text-black/56">
              This section lists the major project documents that have been
              produced or are planned for submission, with direct links for
              viewing when available.
            </p>
          </motion.div>

          <motion.div
            variants={listMotion}
            className="mt-10 w-full border-t border-black/8"
          >
            {documentItems.map((item) => {
              const isAvailable = item.status === "Available";

              return (
                <motion.div
                  key={item.id}
                  variants={itemMotion}
                  className="grid w-full items-center gap-4 border-b border-black/8 py-5 md:grid-cols-[120px_minmax(0,1fr)_80px_100px_110px]"
                >
                  <div className="text-[10px] uppercase tracking-[0.16em] text-black/35">
                    {item.id}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-black/90">
                      {item.title}
                    </h3>
                  </div>

                  <div className="text-[12px] text-black/45">{item.type}</div>

                  <div>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[10px] ${
                        isAvailable
                          ? "border-[#94c7a3] bg-[#eef8f1] text-[#177245]"
                          : "border-[#e2c291] bg-[#f8f8c2] text-[#d4912c]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <a
                      href={item.href}
                      className="inline-flex items-center justify-center rounded-full border border-black/8 px-3 py-1.5 text-[11px] text-black/70 transition hover:bg-black/[0.03] hover:text-black"
                      target="_blank"
                    >
                      View Source
                    </a>
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