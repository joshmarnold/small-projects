"use client";

import { motion } from "framer-motion";

const sections = [
  {
    heading: "Company",
    items: ["About", "Careers", "Blog"],
  },
  {
    heading: "Services",
    items: ["Web Design", "Development", "Branding"],
  },
  {
    heading: "Legal",
    items: ["Terms", "Privacy", "Cookies"],
  },
];

export const Footer = () => {
  return (
    <footer className="relative bg-[#FFFAFF] py-12 md:py-16">
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-20">
        <svg
          width="1200"
          height="30"
          viewBox="0 0 1200 30"
          className="overflow-visible"
        >
          <motion.path
            d="M0,15 L300,0 L600,30 L900,0 L1200,15"
            stroke="#083D77"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ strokeDasharray: 1600, strokeDashoffset: 1600 }}
            whileInView={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </svg>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-sky-400 to-blue-900">
              <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#FFFAFF]">
                C
              </div>
            </div>
            <span className="font-space bg-gradient-to-r from-blue-900 to-sky-400 bg-clip-text text-xl font-bold text-transparent">
              ColorFusion
            </span>
          </div>

          <div className="flex flex-wrap gap-8">
            {sections.map((section) => (
              <div key={section.heading} className="space-y-3">
                <h3 className="font-space text-sm font-medium text-blue-900">
                  {section.heading}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="font-jakarta text-sm text-blue-900/70 transition-colors hover:text-orange-500"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-blue-900/10 pt-6 text-center">
          <p className="text-sm text-blue-900/60">
            © 2025 ColorFusion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
