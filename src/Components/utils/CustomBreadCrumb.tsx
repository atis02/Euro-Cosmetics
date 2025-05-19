import { Breadcrumb } from "antd";
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from "antd/es/breadcrumb/Breadcrumb";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { mainColor } from "./CustomStyles";

interface Name {
  title: string;
}
interface Props {
  category: Name;
  subCategory?: Name;
  segment?: Name;
  color?: string;
}
export const CustomBreadcrumb: FC<Props> = ({
  category,
  subCategory,
  segment,
  color = "#000",
}) => {
  console.log(category);

  const StyledLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
    const [hover, setHover] = useState(false);

    return (
      <Link
        to={to}
        style={{
          color: hover ? mainColor : color,
          textDecoration: "none",
          fontFamily: "Graphic",
          transition: "color 0.3s",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {children}
      </Link>
    );
  };
  return (
    <Breadcrumb
      separator={<span style={{ color: color }}>/</span>}
      items={(
        [
          {
            title: <StyledLink to="/">главная</StyledLink>,
          },
          category
            ? {
                title: (
                  <StyledLink to={`/${category.title}`}>
                    {category.title}
                  </StyledLink>
                ),
              }
            : null,
          subCategory
            ? {
                title: (
                  <StyledLink to={`/${category.title}/${subCategory.title}`}>
                    {subCategory.title}
                  </StyledLink>
                ),
              }
            : null,
          segment
            ? {
                title: (
                  <StyledLink
                    to={`/${category.title}/${subCategory?.title}/${segment.title}`}
                  >
                    {segment.title}
                  </StyledLink>
                ),
              }
            : null,
        ] as Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[]
      ).filter(Boolean)}
    />
  );
};
