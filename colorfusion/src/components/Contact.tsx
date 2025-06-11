"use client";

import { motion } from "framer-motion";

const fadeSlideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeSlideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const Contact = () => {
  return (
    <section
      id="contact"
      className="relative bg-[#050401] py-24 text-[#FFFAFF] md:py-32"
    >
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-30">
        <svg width="1200" height="80" viewBox="0 0 1200 80">
          <motion.path
            d="M0,80 C400,80 600,0 1200,0"
            stroke="#30BCED"
            strokeWidth="2"
            fill="none"
            initial={{ strokeDasharray: 1600, strokeDashoffset: 1600 }}
            whileInView={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </svg>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          {/* Contact info */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            variants={fadeSlideLeft}
          >
            <div className="inline-block rounded-full bg-white/10 px-4 py-1.5">
              <span className="text-sm font-medium">Get in touch</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Let&apos;s work together
            </h2>
            <p className="text-white/70">
              Ready to start your next project? Contact us today to discuss how
              we can help you achieve your goals.
            </p>
            <div className="relative h-10 w-48">
              <svg width="180" height="20" viewBox="0 0 180 20">
                <motion.path
                  d="M0,10 Q45,0 90,10 T180,10"
                  stroke="#FC5130"
                  strokeWidth="2"
                  fill="none"
                  initial={{ strokeDasharray: 300, strokeDashoffset: 300 }}
                  whileInView={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </svg>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <span>📍</span>
                </div>
                <p>123 Design Street, Creative City</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <span>📧</span>
                </div>
                <p>hello@colorfusion.com</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                  <span>📱</span>
                </div>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeSlideRight}
            className="relative rounded-2xl bg-white/5 p-6 backdrop-blur-sm md:p-8"
          >
            <div className="pointer-events-none absolute -top-10 -right-10 -bottom-10 -left-10 opacity-10">
              <svg width="600" height="600" viewBox="0 0 600 600">
                <circle
                  cx="300"
                  cy="300"
                  r="299"
                  stroke="#FC5130"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
            <form className="relative z-10 space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg bg-white/10 p-3 text-white placeholder-white/50 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-lg bg-white/10 p-3 text-white placeholder-white/50 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Your message"
                  className="w-full rounded-lg bg-white/10 p-3 text-white placeholder-white/50 focus:ring-2 focus:ring-sky-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-500/90 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
