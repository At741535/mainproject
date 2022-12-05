import React from "react";
import { Box, Typography } from "@mui/material";
import { BoxWhiteShadow, textWhiteColor } from "./GlobelColor";

const ArtistWrapper = {
  textAlign: "center",
  "& img": {
    width: "calc(100% - 20px)",
    borderRadius: "50%",
    border: "10px solid transparent",
  },
  "& h4": { fontWeight: "400", fontSize: "18px", marginTop: "25px" },
};

export function Artists({ artist }) {
  console.log("artist", artist);
  return (
    <>
      <Box sx={ArtistWrapper}>
        <Typography
          sx={[BoxWhiteShadow[0]]}
          component={"img"}
          src={artist.Image}
          alt=""
        />
        <Typography sx={textWhiteColor} component={"h4"}>
          {artist.Name}
        </Typography>
      </Box>
    </>
  );
}
