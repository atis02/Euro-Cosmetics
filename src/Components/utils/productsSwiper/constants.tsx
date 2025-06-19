
export const VISIBLE_COUNT = 4;
export const itemVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    clipPath: direction > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
    zIndex: 0,
  }),
  visible: {
    x: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    zIndex: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: (_: number) => ({
    transition: { duration: 0.4, ease: "easeInOut" },
    zIndex: 0,
  }),
};
