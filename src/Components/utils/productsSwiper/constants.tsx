export const images = [
  {
    image: "/images/product.webp",
    productStatus: "/images/energy.png",
    title: "BABOR nutri restore",
    sellPrice: 1179,
    discountPrice: 350,
    category: "Ампулы для лица",
  },
  {
    image: "/images/product2.webp",
    productStatus: "/images/energy.png",
    title: "BABOR nutri restore",
    sellPrice: 1179,
    discountPrice: 350,
    category: "Ампулы для лица",
  },
  {
    image: "/images/product3.webp",
    productStatus: "/images/energy.png",
    title: "BABOR nutri restore",
    sellPrice: 1179,
    discountPrice: 350,
    category: "Ампулы для лица",
  },
  {
    image: "/images/product4.webp",
    productStatus: "/images/energy.png",
    title: "BABOR nutri restore",
    sellPrice: 1179,
    discountPrice: 350,
    category: "Ампулы для лица",
  },
  {
    image: "/images/product5.webp",
    productStatus: "/images/energy.png",
    title: "BABOR nutri restore",
    sellPrice: 1179,
    discountPrice: 350,
    category: "Ампулы для лица",
  },
  {
    image: "/images/product6.webp",
    productStatus: "/images/energy.png",
    title: "BABOR nutri restore",
    sellPrice: 1179,
    discountPrice: 350,
    category: "Ампулы для лица",
  },
  {
    image: "/images/product7.jpg",
    productStatus: "/images/energy.png",
    title: "BABOR nutri restore",
    sellPrice: 1179,
    discountPrice: 350,
    category: "Ампулы для лица",
  },
];
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
