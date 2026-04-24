"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "../components/Container";

// Define contact items
const contactItems = [
  {
    id: "CNT 0.1",
    title: "General inquiries",
    description:
      "Reach out for project-related questions, or general information about the system.",
    href: "mailto:russapaypal@gmail.com", 
    tone: "gold",
    image: "/images/cont1.png", 
  },
  {
    id: "CNT 0.2",
    title: "Project support",
    description:
      "Use this contact path for presentation requests, document access, or technical follow-up.",
    href: "mailto:russapaypal@gmail.com", 
    tone: "blue",
    image: "/images/cont2.png", 
  },
  {
    id: "CNT 0.3",
    title: "Technical inquiries",
    description:
      "Contact for questions regarding technical aspects or system operations.",
    href: "mailto:russapaypal@gmail.com", 
    tone: "violet",
    image: "/images/cont3.png",
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
      ease: "easeOut" as const, 
    },
  },
};

const containerMotion = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const, // Use valid Framer Motion easing
    },
  },
};

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  );
}

// Helper function to get tone classes
function getToneClasses(tone: string) {
  switch (tone) {
    case "gold":
      return {
        card: "bg-[linear-gradient(180deg,#F1C66F_0%,#EDC980_45%,#F3D79D_100%)]",
        badge: "bg-white/42 border-white/28 text-black/65",
        title: "text-black/88",
        desc: "text-black/62",
        button: "border-black/10 text-black/72 hover:bg-white/20",
      };

    case "blue":
      return {
        card: "bg-[linear-gradient(180deg,#BFE0FF_0%,#CBE4FF_45%,#D9ECFF_100%)]",
        badge: "bg-white/48 border-white/28 text-black/65",
        title: "text-black/88",
        desc: "text-black/62",
        button: "border-black/10 text-black/72 hover:bg-white/20",
      };

    case "violet":
      return {
        card: "bg-[linear-gradient(180deg,#CFC8FF_0%,#D9D2FF_45%,#E6DFFF_100%)]",
        badge: "bg-white/48 border-white/28 text-black/65",
        title: "text-black/88",
        desc: "text-black/62",
        button: "border-black/10 text-black/72 hover:bg-white/20",
      };

    case "lilac":
    default:
      return {
        card: "bg-[linear-gradient(180deg,#E7C8F7_0%,#EDD8FA_48%,#F5EAFD_100%)]",
        badge: "bg-white/52 border-white/28 text-black/65",
        title: "text-black/88",
        desc: "text-black/62",
        button: "border-black/10 text-black/72 hover:bg-white/22",
      };
  }
}

export default function Contact() {
  const [loadingPhase, setLoadingPhase] = useState<'loading' | 'low-quality' | 'high-quality'>('loading');

  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingPhase('low-quality'), 1000);
    const timer2 = setTimeout(() => setLoadingPhase('high-quality'), 2000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  return (
    <section id="contact" className="pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="w-full"
        >
          <motion.div variants={headerMotion} className="w-full max-w-4xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">
              Contact us
            </p>

            <h2 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px]">
              How can we help?
            </h2>

            <p className="mt-4 max-w-2xl text-[14px] leading-6 text-black/56">
              Get in touch for project questions, presentation requests, document
              access, or general academic communication.
            </p>
          </motion.div>

          {loadingPhase === 'loading' ? (
            <LoadingSpinner />
          ) : (
            <motion.div
              variants={containerMotion}
              className="mt-10 grid w-full gap-y-10 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-0"
            >
              {contactItems.map((item, index) => {
                const tone = getToneClasses(item.tone);
                const isFirstInDesktopRow = index % 3 === 0;

                return (
                  <motion.div
                    key={item.id}
                    variants={itemMotion}
                    className={`w-full border-black/8 ${
                      !isFirstInDesktopRow ? "lg:border-l" : ""
                    }`}
                  >
                    <div className="w-full lg:pl-5 lg:pr-5">
                      <div className="mb-4 text-[10px] uppercase tracking-[0.16em] text-black/35">
                        {item.id}
                      </div>

                      <div className="flex items-center justify-center rounded-[14px]">
                        <div className="text-center">
                          <img
                            src={item.image}
                            alt={item.title}
                            className={`h-full w-full object-contain rounded-[14px] ${loadingPhase === 'low-quality' ? 'blur-sm' : ''}`}
                          />
                        </div>
                      </div>

                      <div className="mt-5 w-full">
                        <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-black/90">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-[13px] text-black/45">
                          {item.description}
                        </p>

                        <div className="mt-4 max-w-[250px] text-[14px] leading-5.5 text-black/56">
                          <div>
                            <a
                              href={item.href}
                              className="inline-flex items-center justify-center rounded-full border border-black/8 px-3 py-1.5 text-[11px] text-black/70 transition hover:bg-black/[0.03] hover:text-black"
                              target="_blank"
                            >
                              Contact via email
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}