"use client";

import { motion } from "framer-motion";
import { fadeUp, springIn, staggerChildren } from "../constants/motion";

export const Features = () => {
  const features = [
    {
      icon: "📱",
      title: "Responsive Design",
      desc: "Websites that look great on any device, from mobile to desktop.",
      color: "bg-sky-400/10",
      bgBlob: "bg-sky-400",
    },
    {
      icon: "🧩",
      title: "Modern Components",
      desc: "Pre-built components that are easy to customize and use.",
      color: "bg-orange-500/10",
      bgBlob: "bg-orange-500",
    },
    {
      icon: "♿",
      title: "Accessibility",
      desc: "Ensure your website is usable by everyone, regardless of ability.",
      color: "bg-blue-900/10",
      bgBlob: "bg-blue-900",
    },
    {
      icon: "⚡",
      title: "Performance",
      desc: "Optimized for speed and performance, with fast load times.",
      color: "bg-orange-500/10",
      bgBlob: "bg-orange-500",
    },
    {
      icon: "🔍",
      title: "SEO Optimized",
      desc: "Built with search engines in mind, to help you rank higher.",
      color: "bg-sky-400/10",
      bgBlob: "bg-sky-400",
    },
    {
      icon: "👨‍💻",
      title: "Developer Friendly",
      desc: "Clean code that's easy to understand and modify.",
      color: "bg-blue-900/10",
      bgBlob: "bg-blue-900",
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          variants={staggerChildren}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.div
            variants={fadeUp}
            className="mb-4 inline-block rounded-full bg-orange-500/10 px-4 py-1.5"
          >
            <span className="text-sm font-medium text-orange-500">
              Features
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mb-4 font-sans text-3xl font-bold tracking-tight text-blue-900 md:text-4xl"
          >
            Designed for the modern web
          </motion.h2>

          <motion.p variants={fadeUp} className="font-sans text-blue-900/70">
            Our platform offers everything you need to create stunning websites
            with this beautiful color palette.
          </motion.p>

          <div className="relative mx-auto mt-4 h-10 w-48">
            <svg width="180" height="20" viewBox="0 0 180 10">
              <motion.path
                d="M0,10 C30,20 60,5 90,10 S150,18 180,7"
                stroke="#FC5130"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(({ icon, title, desc, color, bgBlob }, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={springIn({ idx })}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Blob background */}
              <div
                className={`absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-10 transition-transform duration-300 group-hover:scale-125 ${bgBlob}`}
              />
              <div className="relative">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full text-2xl ${color}`}
                >
                  {icon}
                </div>
                <h3 className="mb-3 font-sans text-xl font-bold text-blue-900">
                  {title}
                </h3>
                <p className="font-sans text-blue-900/70">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
