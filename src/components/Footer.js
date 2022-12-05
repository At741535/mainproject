import React from "react";
import { styled, Grid, Box, Container, List, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Whitelogo from "../images/logo-white.svg";
import coinMan from "../images/coin_man.png";
import { textWhiteColor, textGreyColor } from "./GlobelColor";

const Footers = styled("footer")`
  padding-top: 50px;
  padding-bottom: 50px;
`;
const FooterLogo = styled("div")`
  height: 100%;
  text-align: center;
  img {
    width: 160px;
    margin-bottom: 10px;
  }
  p {
    ${textGreyColor}
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 30px;
  }
`;
const Items = styled("div")`
  h3 {
    ${textWhiteColor}
    font-size: 20px;
    font-weight: 700;
    text-align: center;
  }
  h4 {
    ${textWhiteColor}
    font-weight: 300;
    display: inline-block;
    margin-right: 20px;

    &:last-child {
      margin-right: 0px;
    }
  }
  p {
    ${textGreyColor}
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }
`;
const CopyRight = styled("div")`
  // background-color: #000000;
`;
const CopyRightInnerBox = styled("div")`
  flex-grow: 1;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid #8f9ca9;
`;
const CopyRightText = {
  textAlign: "center",
};

const FlexGrow = {
  flexGrow: 1,
};
const RightIMG = { "& img": { width: "100%" } };

const Footer = () => {
  return (
    <>
      <Footers>
        <Container className="big_desktop_container">
          <Box sx={FlexGrow}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} lg={4}>
                <FooterLogo>
                  <Typography component={"img"} src={Whitelogo} alt="" />
                  <Typography component={"p"}>
                    The world’s first and largest digital marketplace for crypto
                    collectibles and non-fungible tokens (NFTs). Buy, sell, and
                    discover exclusive digital items.
                  </Typography>
                </FooterLogo>
              </Grid>
              <Grid item xs={6} sm>
                <Items>
                  <List component={"h3"}>Resources</List>
                  <List component={"p"}>Help Center</List>
                  <List component={"p"}>Partners</List>
                  <List component={"p"}>Gas-Free Marketplace</List>
                  <List component={"p"}>Blog</List>
                </Items>
              </Grid>
              <Grid item xs={6} sm>
                <Items>
                  <List component={"h3"}>Company</List>
                  <List component={"p"}>Our Team</List>
                  <List component={"p"}>About Us</List>
                  <List component={"p"}>Contact Us</List>
                  <List component={"p"}>Career</List>
                </Items>
              </Grid>
              <Grid item xs={6} sm>
                <Items>
                  <List component={"h3"}>Contact</List>
                  <List component={"p"}>Our Team</List>
                  <List component={"p"}>About Us</List>
                  <List component={"p"}>Contact Us</List>
                  <List component={"p"}>Career</List>
                </Items>
              </Grid>
              <Grid item xs={6} sm>
                <Box sx={RightIMG}>
                  <Typography component={"img"} src={coinMan} alt="" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Footers>
      <CopyRight>
        <Container className="big_desktop_container">
          <CopyRightInnerBox>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Items sx={CopyRightText}>
                  <List component={"p"}>All Rights Reserved - 2022</List>
                </Items>
              </Grid>
            </Grid>
          </CopyRightInnerBox>
        </Container>
      </CopyRight>
    </>
  );
};

export default Footer;
