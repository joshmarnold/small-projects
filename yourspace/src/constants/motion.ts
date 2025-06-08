export const fadeInUpOut = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400, // higher = snappier
      damping: 24, // lower = more bounce
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    transition: {
      duration: 0.2,
    },
  },
};

export const staggeredContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

export const childMotionProps = {
  variants: fadeInUpOut,
};

export const childWithoutParentMotionProps = {
  initial: "hidden",
  animate: "visible",
  variants: fadeInUpOut,
};

export const parentMotionProps = {
  initial: "hidden",
  animate: "visible",
  variants: staggeredContainer,
};
