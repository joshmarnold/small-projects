export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const springIn = ({ idx = 0 }: { idx?: number }) => ({
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      opacity: { duration: 0.3, delay: 0 },
      scale: {
        delay: 1 + idx * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 10,
      },
      y: {
        delay: 1 + idx * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 12,
      },
    },
  },
});
