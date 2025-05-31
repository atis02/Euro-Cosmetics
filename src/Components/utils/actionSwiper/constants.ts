export const actionData = [
  {
    title: "Elemis & Thim",
    desc: "матовая помада и гидрофильный бальзам в подарок",
    image: "/images/aksiya.webp",
    date: "5-7 мая",
  },
  {
    title: "Elemis & Thim",
    desc: "матовая помада и гидрофильный бальзам в подарок",
    image: "/images/aksiya2.webp",
    date: "5-18 мая",
  },
  {
    title: "Elemis & Thim",
    desc: "матовая помада и гидрофильный бальзам в подарок",
    image: "/images/aksiya3.webp",
    date: "6-31 мая",
  },
];
export const VISIBLE_COUNT = 1.5;
export const itemVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
    zIndex: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    zIndex: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: (_: number) => ({
    opacity: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
    zIndex: 0,
  }),
};
