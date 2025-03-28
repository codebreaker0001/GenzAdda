import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/flexbtween";
import WidgetWrapper from "../../components/widgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://genzadda-1.onrender.com/assets/mirzapur.webp"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Mirzapur</Typography>
        <Typography color={medium}>AmazonPrime.com</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        Just at 125/- per month
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;