"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FaGithub } from "react-icons/fa";
import { fadeUp, springIn, staggerChildren } from "@/constants/motion";

const projects = [
  {
    title: "Artisan Portfolio",
    type: "Web Design",
    desc: "A comprehensive portfolio website for a renowned artisan.",
    color: "bg-sky-400",
    dot: "bg-sky-400",
    badge: "text-sky-400 bg-sky-400/10",
    iconColor: "text-sky-400",
  },
  {
    title: "Wellness Tracker",
    type: "Mobile App",
    desc: "A beautiful mobile app for tracking wellness and fitness goals.",
    color: "bg-orange-500",
    dot: "bg-orange-500",
    badge: "text-orange-500 bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    title: "Luxury Boutique",
    type: "E-Commerce",
    desc: "A premium shopping experience for a high-end fashion boutique.",
    color: "bg-blue-900",
    dot: "bg-blue-900",
    badge: "text-blue-900 bg-blue-900/10",
    iconColor: "text-blue-900",
  },
  {
    title: "Eco Startup",
    type: "Branding",
    desc: "Complete brand identity for an eco-friendly startup.",
    color: "bg-orange-500",
    dot: "bg-orange-500",
    badge: "text-orange-500 bg-orange-500/10",
    iconColor: "text-orange-500",
  },
  {
    title: "Restaurant Website",
    type: "Web Design",
    desc: "Modern website with online ordering system for a local restaurant.",
    color: "bg-sky-400",
    dot: "bg-sky-400",
    badge: "text-sky-400 bg-sky-400/10",
    iconColor: "text-sky-400",
  },
  {
    title: "Travel Blog",
    type: "Web Development",
    desc: "Custom blog platform for travel enthusiasts with location mapping.",
    color: "bg-blue-900",
    dot: "bg-blue-900",
    badge: "text-blue-900 bg-blue-900/10",
    iconColor: "text-blue-900",
  },
];

const circleVariants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 1.5,
    },
  },
};

export const Work = () => {
  return (
    <section id="work" className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerChildren}
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={fadeUp}>
            <div className="mb-4 inline-block rounded-full bg-sky-400/10 px-4 py-1.5">
              <span className="text-sm font-medium text-sky-400">Our Work</span>
            </div>
          </motion.div>

          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tight text-blue-900 md:text-4xl"
            variants={fadeUp}
          >
            Recent projects
          </motion.h2>

          <motion.p className="text-blue-900/70" variants={fadeUp}>
            Take a look at some of our recent work and see what we can do for
            you.
          </motion.p>

          <div className="relative mx-auto mt-4 h-10 w-64">
            <svg width="240" height="30" viewBox="0 0 240 10">
              <motion.path
                d="M0,10 C40,20 80,5 120,10 S200,18 240,7"
                stroke="#083D77"
                strokeWidth="2"
                fill="none"
                initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1, delay: 1.3 }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Top-left circle */}
          <div className="absolute -top-10 -left-10 hidden lg:block">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              className="overflow-visible opacity-40"
            >
              <motion.circle
                cx="40"
                cy="40"
                r="39"
                stroke="#FC5130"
                strokeWidth="1"
                fill="none"
                variants={circleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </svg>
          </div>

          {/* Bottom-right circle */}
          <div className="absolute -right-10 -bottom-10 hidden lg:block">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="overflow-visible opacity-40"
            >
              <motion.circle
                cx="60"
                cy="60"
                r="59"
                stroke="#30BCED"
                strokeWidth="1"
                fill="none"
                variants={circleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </svg>
          </div>

          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              variants={springIn({ idx })}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <div className={`h-24 w-full ${proj.color}`} />
              <div className="p-6">
                <div className="mb-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${proj.badge}`}
                  >
                    {proj.type}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-blue-900">
                  {proj.title}
                </h3>
                <p className="mb-6 text-blue-900/70">{proj.desc}</p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className={`h-2 w-2 rounded-full ${proj.dot}`} />
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    <span className="h-2 w-2 rounded-full bg-gray-200" />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      title="View on GitHub"
                      className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-blue-900/10 ${proj.iconColor}`}
                    >
                      <FaGithub className="h-4 w-4" />
                    </button>
                    <button
                      title="View Project"
                      className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-blue-900/10 ${proj.iconColor}`}
                    >
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                y: {
                  duration: 0.5,
                  delay: 1.8,
                  ease: "easeOut",
                },
              },
            },
          }}
        >
          <button className="inline-flex items-center justify-center rounded-md border border-sky-400 px-8 py-3 text-sm font-medium text-sky-400 transition-colors hover:bg-sky-400/10 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none">
            View All Projects
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
