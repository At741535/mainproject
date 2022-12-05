import React from "react";
import { Avatar, Box, CardHeader, Typography } from "@mui/material";
import AvatarImg from "../images/avatar_nft.png";
import blueTick from "../images/blue_tick.svg";
import { textWhiteColor, textCyanColor } from "./GlobelColor";
const TrendingWrapper = {
  display: "flex",
  alignItems: "center",
  "& > img": { alignSelf: "flex-start", pt: "16px", pb: "16px" },
};
const CardHeaderWrapper = {
  "& .avatar_title": { fontWeight: "700" },
  "& .MuiAvatar-circular": {
    borderRadius: "10px",
    width: "50px",
    height: "50px",
  },
};

const TrendingCollectionCard = ({ item }) => {
  return (
    <>
      <Box sx={TrendingWrapper}>
        <CardHeader
          sx={CardHeaderWrapper}
          avatar={
            <Avatar>
              <Typography component={"img"} src={AvatarImg} alt="" />
            </Avatar>
          }
          title={
            <Typography
              className="avatar_title"
              sx={[textWhiteColor[0]]}
              component={"p"}
            >
              @dicar
            </Typography>
          }
          subheader={
            <Typography
              className="avatar_subtitle"
              sx={[textCyanColor[0]]}
              component={"p"}
            >
              $232,102
            </Typography>
          }
        />
        <Typography component={"img"} src={blueTick} alt="" />
      </Box>
    </>
  );
};

export default TrendingCollectionCard;
