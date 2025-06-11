"use client";

import { useEffect, useState } from "react";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const navItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shadowClass = scrolled ? "shadow-md" : "shadow-none";

  return (
    <header
      className={`fixed top-0 z-40 w-full bg-[#FFFAFF]/90 backdrop-blur-md transition-shadow duration-300 ${shadowClass}`}
    >
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-2"
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-sky-400 to-blue-900">
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
              C
            </div>
          </div>
          <span className="bg-gradient-to-r from-blue-900 to-sky-400 bg-clip-text font-sans text-xl font-bold text-transparent">
            ColorFusion
          </span>
        </motion.div>

        {/* Nav */}
        <nav
          className={`${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-8 bg-blue-900/95 p-10 text-white transition-transform duration-300 md:static md:inset-auto md:flex md:translate-x-0 md:flex-row md:gap-6 md:bg-transparent md:p-0 md:text-blue-900`}
        >
          {/* Close button (mobile only) */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 md:hidden"
          >
            <XMarkIcon className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </button>

          {navLinks.map(({ label, href }, index) => (
            <motion.div
              key={label}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              transition={{
                delay: 0.2 + index * 0.08,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="relative"
            >
              <a
                onClick={() => setMenuOpen(false)}
                href={href}
                className="text-lg font-medium transition-colors hover:text-orange-500 md:text-base"
              >
                {label}
              </a>
              <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-orange-500"></div>
            </motion.div>
          ))}
        </nav>

        {/* CTA + Mobile menu button */}
        <div className="flex items-center gap-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2 + navLinks.length * 0.08,
              duration: 0.8,
              ease: "easeOut",
            }}
            className="hidden h-10 min-w-[120px] rounded-md bg-orange-500 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-500/90 md:flex"
          >
            Get Started
          </motion.button>

          <button
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-blue-900 hover:bg-blue-900/10 md:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
