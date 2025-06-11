"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const AnimatedUnderline = () => {
  return (
    <div className="relative mb-8">
      <div className="absolute -bottom-2 left-0">
        <svg width="300" height="30" viewBox="0 0 300 30">
          <motion.path
            d="M0,15 Q75,0 150,15 T300,15"
            stroke="#FC5130"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </div>
  );
};

const AnimatedCircle = () => {
  const radius = 178;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="absolute -top-20 -left-20 z-0">
      <svg width="360" height="360" viewBox="0 0 360 360">
        <motion.circle
          cx="180"
          cy="180"
          r={radius}
          stroke="#30BCED"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          animate={{ strokeDashoffset: 0 }}
          transition={{ delay: 0.1, duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export const Home = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="mb-6 font-sans text-4xl font-bold tracking-tight text-blue-900 md:text-6xl lg:text-7xl">
              Design with <span className="text-orange-500">Purpose</span>,
              <br />
              Build with <span className="text-sky-400">Passion</span>
            </h1>

            <AnimatedUnderline />

            <p className="mb-8 max-w-xl font-sans text-lg text-blue-900/70 md:text-xl">
              Elevate your digital presence with our stunning designs. Create
              beautiful websites that stand out from the crowd.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="inline-flex h-12 items-center justify-center rounded-md bg-orange-500 px-8 text-base font-medium text-white transition-colors hover:bg-orange-500/90 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none">
                Get Started
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex h-12 items-center justify-center rounded-md border border-sky-400 px-8 text-base font-medium text-sky-400 transition-colors hover:bg-sky-400/10 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none">
                View Showcase
              </button>
            </div>
          </motion.div>

          {/* Graphic Card (desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <motion.div
                initial={{ y: [12, -12] }}
                animate={{ y: [12, -12] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -top-10 -left-10 z-10 h-40 w-40 rounded-2xl bg-sky-400 shadow-xl"
              />
              <motion.div
                initial={{ y: [-15, 15] }}
                animate={{ y: [-15, 15] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -right-10 -bottom-10 z-10 h-40 w-40 rounded-2xl bg-orange-500 shadow-xl"
              />
              <motion.div
                initial={{ y: [-18, 18] }}
                animate={{ y: [-18, 18] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-1/2 -right-5 z-10 h-24 w-24 -translate-y-1/2 rounded-full bg-blue-900 shadow-xl"
              />

              <AnimatedCircle />

              <div className="relative z-20 overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4 h-6 w-24 rounded-full bg-sky-400/20" />
                <div className="mb-6 h-10 w-3/4 rounded-lg bg-blue-900/10" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded-full bg-blue-900/5" />
                  <div className="h-4 w-5/6 rounded-full bg-blue-900/5" />
                  <div className="h-4 w-4/6 rounded-full bg-blue-900/5" />
                </div>
                <div className="mt-8 flex gap-3">
                  <div className="h-10 w-28 rounded-lg bg-orange-500" />
                  <div className="h-10 w-28 rounded-lg border border-sky-400 bg-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
