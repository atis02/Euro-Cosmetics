import { Box, Tab, Tabs, Typography } from "@mui/material";
import { FC, useState } from "react";
import { TabPanel } from "./TabPanel";
import { Product } from "./interfaces";
import { useTranslation } from "react-i18next";

const TabComponent: FC<Product> = ({ product }) => {
  const [value, setValue] = useState(0);
  const { i18n } = useTranslation();
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const style = {
    p: 0.5,
    minHeight: 38,
    minWidth: 140,
    textTransform: "revert",
    "&.Mui-selected": {
      color: "#000",
    },
  };
  const getTitle = (nameTm: string | undefined, nameRu: string | undefined) => {
    const currentLanguage = i18n.language;
    switch (currentLanguage) {
      case "ru":
        return nameRu ?? "";
      case "tkm":
        return nameTm ?? "";
      default:
        return nameRu ?? "";
    }
  };
  const tabs = [
    {
      description: getTitle(product.descriptionTm, product.descriptionRu),
      title: "Описание",
      props: { ...a11yProps(0) },
    },
    {
      description: getTitle(product.usageTm, product.usageRu),
      title: "Применение",
      props: { ...a11yProps(1) },
    },
    {
      description: getTitle(product.ingredientsTm, product.ingredientsRu),
      title: "Состав",
      props: { ...a11yProps(2) },
    },
    {
      description: getTitle(product.additionalInfoTm, product.additionalInfoRu),
      title: "Дополнительная информация",
      props: { ...a11yProps(3) },
    },
  ];
  console.log(product);

  return (
    <Box sx={{ width: "60%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#000",
            },
          }}
          sx={{
            minHeight: 38,
          }}
        >
          {tabs.map((tab, index) => (
            <Tab label={tab.title} key={index} {...a11yProps(0)} sx={style} />
          ))}
        </Tabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Typography fontFamily='Graphic' whiteSpace="pre-wrap">{tab.description}</Typography>
        </TabPanel>
      ))}
    </Box>
  );
};

export default TabComponent;
