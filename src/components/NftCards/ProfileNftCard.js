import React from "react";
import NFT from "../../images/nft.png";
import {
  styled,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Avatar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { BgBlackColor, textWhiteColor, textGreyColor } from "../GlobelColor";
import { BlackButton } from "../../elements";

const CardMediaWrapper = styled("div")`
  .card_img_style {
    overflow: hidden;
    border-radius: 15px;
    position: relative;

    .brownBtnWrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.5s ease;
    }
    :hover img {
      filter: blur(5px);
    }
    :hover .brownBtnWrapper {
      opacity: 1;
    }
    @media (min-width: 1200px) {
      height: 280px;
    }
    @media screen and (min-width: 1920px) {
      height: 345px;
    }
    @media screen and (max-width: 1025px) {
      height: 350px;
    }
    img {
      height: 100%;
      object-fit: fill;
      transition: all 0.5s ease;
    }
  }
`;

const iconStyle = {
  width: "30px",
};
const NftCardLink = {
  height: "100%",
  display: "block",
};
const ContentWrapper = {
  padding: "0",
  "&:last-child": { pb: "0" },
  "& .card_data_wrapper": {
    display: "flex",
    justifyContent: "space-between",

    "& > p": {
      display: "flex",
      flexDirection: "column",
      textAlign: "right",
      fontSize: "12px",
      fontWeight: "400",
    },
  },
};
const AvatarImgWrapper = {
  width: "45px",
  height: "45px",
  borderRadius: "15px",
  "& img": {
    width: "100%",
    height: "100%",
  },
};
const CardAvatar = {
  p: "0",
  "& .MuiCardHeader-avatar": { mr: "10px" },
  "& .avatar_title": {
    fontSize: "12px",
    fontWeight: "400",
  },
  "& .avatar_subtitle": {
    fontSize: "14px",
    fontWeight: "500",
  },
};
const borderStyle = {
  padding: "18px",
  overflow: "hidden",
  height: "100%",
  boxShadow: "0px 0px 50px 15px rgb(0 0 0 / 8%)",
  borderRadius: "20px",
};
const titleWrapper = {
  display: "flex",
  alignItems: "center",
  mb: "20px",
  mt: "20px",
  "& h3": {
    fontSize: "16px",
    whiteSpace: "pre",
    fontWeight: "700",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginRight: "15px",
  },
  "& span": {
    fontSize: "12px",
    fontWeight: "300",
    backgroundColor: "#1E50FF",
    color: "#ffffff",
    p: "2px 10px 1px",
    borderRadius: "5px",
  },
};

export function ProfileNftCard() {
  return (
    <>
      <NavLink to={`/`} style={NftCardLink}>
        <Card sx={[borderStyle, BgBlackColor[0]]}>
          <CardMediaWrapper>
            <Box className="card_img_style">
              <CardMedia component="img" image={NFT} alt="" />
              <BlackButton>Place a bid</BlackButton>
            </Box>
          </CardMediaWrapper>
          <CardContent sx={ContentWrapper}>
            <Box>
              <Box sx={titleWrapper}>
                <Typography component={"h3"} sx={[textWhiteColor[0]]}>
                  Hamlet Contemplates SSSSSSSSSSSS
                </Typography>
                <Typography component={"span"}>BSC</Typography>
              </Box>
              {/* <Box className="card_data_wrapper">
                <CardHeader
                  sx={CardAvatar}
                  avatar={
                    <Avatar sx={AvatarImgWrapper}>
                      <Typography component={"img"} src={NFT} alt="" />
                    </Avatar>
                  }
                  title={
                    <Typography
                      sx={[textGreyColor[0]]}
                      className="avatar_title"
                      component={"p"}
                    >
                      Creator
                    </Typography>
                  }
                  subheader={
                    <Typography
                      sx={[textWhiteColor[0]]}
                      className="avatar_subtitle"
                      component={"p"}
                    >
                      SalvadorDali
                    </Typography>
                  }
                />
                <Typography component={"p"} sx={[textGreyColor[0]]}>
                  Current Bid{" "}
                  <Typography component={"span"} sx={[textWhiteColor[0]]}>
                    4.89 ETH
                  </Typography>
                </Typography>
              </Box> */}
            </Box>
          </CardContent>
        </Card>
      </NavLink>
    </>
  );
}
