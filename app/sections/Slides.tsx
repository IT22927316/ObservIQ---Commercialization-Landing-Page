"use client";

import { motion } from "framer-motion";
import Container from "../components/Container";

const slideItems = [
  {
    id: "SLD 0.1",
    title: "Proposal presentation",
    description:
      "Slides covering the initial concept, research direction, system scope, and the early foundation of the project.",
    href: "https://drive.google.com/file/d/1sdCODuDy2S_HPZO4giwqZUUtIAX2i8ph/view?usp=sharing",
    tone: "gold",
    image: "/images/proposal.png", // Add image for proposal
  },
  {
    id: "SLD 0.2",
    title: "Progress presentation 1",
    description:
      "First progress deck presenting the initial findings, architecture direction, and the early stages of implementation.",
    href: "https://drive.google.com/file/d/1mXWaMxyIKrk9ZxScvXXsw4RQB0Q5WZ5g/view?usp=drive_link",
    tone: "blue",
    image: "/images/pp1.png", // Add image for PP1
  },
  {
    id: "SLD 0.3",
    title: "Progress presentation 2",
    description:
      "Second progress deck showing deeper implementation progress, and milestone completion.",
    href: "https://drive.google.com/file/d/1lKhuCUYA1FUriG-zDKZC1ySc0Wq7du7o/view?usp=sharing",
    tone: "violet",
    image: "/images/pp2.png", // Add image for PP2
  },
  {
    id: "SLD 0.4",
    title: "Final presentation",
    description:
      "Final presentation deck summarizing the full project, key results, and final evaluation readiness.",
    href: "#",
    tone: "lilac",
    image: "/images/final.png", // Add image for final
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
      ease: "easeOut",
    },
  },
};

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

export default function Slides() {
  return (
    <section id="slides" className="pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="w-full"
        >
          <motion.div variants={headerMotion} className="w-full max-w-4xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">
              Slides
            </p>

            <h2 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px]">
              Presentation decks across the project journey.
            </h2>

            <p className="mt-4 max-w-2xl text-[14px] leading-6 text-black/56">
              A collection of the presentation slides used for proposal,
              progress reviews, and final academic submissions.
            </p>
          </motion.div>

          <motion.div
            variants={containerMotion}
            className="mt-10 grid w-full gap-y-10 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4 lg:gap-x-0"
          >
            {slideItems.map((item, index) => {
              const tone = getToneClasses(item.tone);
              const isFirstInDesktopRow = index % 4 === 0;

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

                    <div className="flex items-center justify-center rounded-[14px] border border-black/8">
                      <div className="text-center">
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-contain rounded-[14px]"
                          />
                        </a>
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
                            View Presentation
                          </a>
                        </div>
                      </div>
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