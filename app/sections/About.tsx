"use client";

import { motion } from "framer-motion";
import Container from "../components/Container";

const teamMembers = [
  {
    id: "MEM 0.1",
    name: "Rusiru De Silva",
    role: "Metric & Signal Discovery Lead",
    email: "IT22927316@my.sliit.lk",
    achievement:
      "Leads research and development for metrics and signal processing. Contributes to defining signal strategies for the project.",
    image: "/images/im1.png", // Image path for person1
    linkedin: "https://www.linkedin.com/in/rusiruds/" // Dummy LinkedIn link
  },
  {
    id: "MEM 0.2",
    name: "Nimasha Piyumini",
    role: "Log Structure & Enrichment Lead",
    email: "IT22034922@my.sliit.lk",
    achievement:
      "Focused on structuring and enriching the system's logs, improving data flow and enhancing insights derived from system activities.",
    image: "/images/im2.png", // Image path for person2
    linkedin: "https://www.linkedin.com/in/nimashagamage/" // Dummy LinkedIn link
  },
  {
    id: "MEM 0.3",
    name: "Nayanahari Kusalanjani",
    role: "Adaptive Alert Tuning Lead",
    email: "IT22034540@my.sliit.lk",
    achievement:
      "Developed and fine-tuned adaptive alerting mechanisms to improve the system's responsiveness to critical events.",
    image: "/images/im3.png", // Image path for person3
    linkedin: "https://www.linkedin.com/in/nayanahari-kusalanjani/" // Dummy LinkedIn link
  },
  {
    id: "MEM 0.4",
    name: "Yomith Gamage",
    role: "Anomaly Detection & Insight Lead",
    email: "IT22195470@my.sliit.lk",
    achievement:
      "Managed the detection of anomalies in system behavior and generated insights to support critical decision-making.",
    image: "/images/im4a.png", // Image path for person4
    linkedin: "https://www.linkedin.com/in/lavindu-yomith-5b9b69187/" // Dummy LinkedIn link
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

export default function About() {
  return (
    <section id="about" className="pb-20 sm:pb-24 lg:pb-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="w-full"
        >
          <motion.div variants={headerMotion} className="w-full max-w-4xl">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">
              About us
            </p>

            <h2 className="max-w-3xl text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-black sm:text-[42px] lg:text-[56px]">
              Meet the team behind the project.
            </h2>

            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-black/56">
              This section introduces the four group members, along with
              identification photographs, e-mail details, and relevant project
              contributions.
            </p>
          </motion.div>

          <motion.div
            variants={containerMotion}
            className="mt-10 grid w-full gap-y-10 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4 lg:gap-x-0"
          >
            {teamMembers.map((member, index) => {
              const isFirstInDesktopRow = index % 4 === 0;

              return (
                <motion.div
                  key={member.id}
                  variants={itemMotion}
                  className={`w-full border-black/8 ${!isFirstInDesktopRow ? "lg:border-l" : ""}`}
                >
                  <div className="w-full lg:pl-5 lg:pr-5">
                    <div className="mb-4 text-[10px] uppercase tracking-[0.16em] text-black/35">
                      {member.id}
                    </div>

                    <div className="flex h-[250px] w-full items-center justify-center rounded-[14px]">
                      <div className="text-center">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <img
                            src={member.image}
                            alt={`${member.name}'s photo`}
                            className="w-full h-full object-cover rounded-[14px]"
                          />
                        </a>
                      </div>
                    </div>

                    <div className="mt-5 w-full">
                      <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-black/90">
                        {member.name}
                      </h3>

                      <p className="mt-1 text-[13px] text-black/45">
                        {member.role}
                      </p>

                      <a
                        href={`mailto:${member.email}`}
                        className="mt-2 inline-block text-[13px] text-black/38 transition hover:text-black/65"
                      >
                        {member.email}
                      </a>

                      <p className="mt-4 max-w-[250px] text-[14px] leading-5.5 text-black/56">
                        {member.achievement}
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