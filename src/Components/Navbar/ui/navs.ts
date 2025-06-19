import { t } from "i18next";

  export const navs = [
    { label: t("navbar.catalog"), to: "/", type: "category" },
    { label: t("navbar.brands"), to: "/brands" },
    { label: t("navbar.novinki"), to: "/news/1" },
    { label: t("navbar.aksiya"), to: "/sales/100" },
    { label: t("navbar.markets"), to: "/markets" },
    {
      label: t("navbar.giftCard"),
      to: "/giftCard/gift",
      image: "/images/navImage2.png",
    },
    {
      label: t('navbar.aksiya50'),
      to: "/sales/50",
      color: "#FF329A",
      image: "/images/navImage.png",
    },
  ];