export const rowCenterStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
export const rowSpaceStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
};
export const mainColor = "#C6B09F";

export const navIconStyles = {
  width: 30,
  height: 30,
  weight: 400,
  fontWeight: 400,
  cursor: "pointer",
  "&:hover": { color: mainColor },
};
export const mainPageTextStyle = {
  lineHeight: 1,
  fontSize: { lg: 50, md: 40, sm: 40, xs: 30 },
  fontWeight: 500,
  fontFamily: "Graphic",
  mt: 2,
};
export const mainPageTextDescStyle = {
  width: "70%",
  fontSize: { lg: 16, md: 16, sm: 15, xs: 14 },
  fontWeight: 400,
  fontFamily: "Graphic",
  mt: 2,
  mb: { lg: 5, md: 5, sm: 5, xs: 5 },
};
export const hoverStyle = {
  transition: "color 0.3s ease",
  "&:hover": {
    color: mainColor,
  },
};
export const hoverButtonIcon = {
  p: 0,
  width: 25,
  color: "#464646",
  height: 25,
  ...hoverStyle,
};
