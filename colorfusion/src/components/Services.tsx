"use client";

import { fadeUp, springIn, staggerChildren } from "@/constants/motion";
import { motion } from "framer-motion";

const services = [
  {
    icon: "🎨",
    title: "Web Design",
    desc: "Custom website design tailored to your brand and business needs.",
  },
  {
    icon: "💻",
    title: "Development",
    desc: "Front-end and back-end development using the latest technologies.",
  },
  {
    icon: "✨",
    title: "Branding",
    desc: "Create a consistent brand identity across all your digital platforms.",
  },
];

export const Services = () => {
  return (
    <section
      id="services"
      className="relative bg-blue-900 py-24 text-[#FFFAFF] md:py-32"
    >
      {/* Top stroke graphic */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-30">
        <svg width="1200" height="50" viewBox="0 0 1200 50">
          <motion.path
            d="M0,25 L300,0 L600,50 L900,0 L1200,25"
            stroke="#FC5130"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </svg>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          variants={staggerChildren}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div variants={fadeUp}>
            <div className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5">
              <span className="font-sans text-sm font-medium text-[#FFFAFF]">
                Services
              </span>
            </div>
          </motion.div>

          <motion.h2
            className="mb-4 font-sans text-3xl font-bold tracking-tight md:text-4xl"
            variants={fadeUp}
          >
            What we offer
          </motion.h2>

          <motion.p className="font-sans text-[#FFFAFF]/70" variants={fadeUp}>
            We provide a range of services to help you build your online
            presence.
          </motion.p>

          <div className="relative mx-auto mt-10 h-10 w-48">
            <svg width="180" height="20" viewBox="0 0 180 20">
              <motion.path
                d="M0,20 C60,20 90,0 180,0"
                stroke="#30BCED"
                strokeWidth="2"
                fill="none"
                initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(({ icon, title, desc }, idx) => (
            <motion.div
              key={idx}
              variants={springIn({ idx })}
              className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 transition-colors duration-500 hover:bg-white/10"
            >
              <div className="relative">
                <div className="mb-5 font-sans text-3xl">{icon}</div>
                <h3 className="mb-3 font-sans text-xl font-bold">{title}</h3>
                <p className="font-sans text-[#FFFAFF]/70">{desc}</p>
                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center text-sky-400 hover:text-sky-400/80"
                  >
                    Learn more
                    <svg
                      className="ml-1 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom stroke graphic */}
      <div className="absolute right-0 bottom-0 w-full rotate-180 overflow-hidden opacity-30">
        <svg width="1200" height="50" viewBox="0 0 1200 50">
          <motion.path
            d="M0,25 Q300,0 600,25 T1200,25"
            stroke="#FC5130"
            strokeWidth="2"
            fill="none"
            initial={{ strokeDasharray: 1600, strokeDashoffset: 1600 }}
            whileInView={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
          />
        </svg>
      </div>
    </section>
  );
};
