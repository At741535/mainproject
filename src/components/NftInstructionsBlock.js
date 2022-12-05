import React from "react";
import { Box, Typography } from "@mui/material";
import { BgDarkBlackColor, textWhiteColor } from "./GlobelColor";

const InstructionsBlockWrapper = {
  p: "20px 20px 16px",
  "& img": {
    width: "50px",
  },
  "& h4": { fontWeight: "600", fontSize: "18px", marginTop: "20px" },
  "& p": { fontWeight: "200", fontSize: "12px", marginTop: "10px" },
};

export function NftInstructionsBlock({ instructions }) {
  return (
    <>
      <Box sx={[InstructionsBlockWrapper, BgDarkBlackColor[0]]}>
        <Typography component={"img"} src={instructions.Icon} alt="" />
        <Typography sx={textWhiteColor} component={"h4"}>
          {instructions.Title}
        </Typography>
        <Typography sx={textWhiteColor} component={"p"}>
          {instructions.Description}
        </Typography>
      </Box>
    </>
  );
}
