import React from "react";
import { Grid, Box, Container, styled, Typography } from "@mui/material";
import { BlackButton, OutlineButton } from "../../elements/";
import bgIMG from "../../images/banner_bg.svg";
import { textWhiteColor } from "../GlobelColor";
import BannerInnerIMG from "../../images/banner_inner_img.svg";

const BannerSection = styled("section")`
  padding-top: 0px;
  padding-bottom: 100px;
  @media screen and (max-width: 770px) {
    padding-bottom: 35px;
  }
  @media screen and (max-width: 420px) {
    padding-bottom: 10px;
  }
  .back_img {
    background-image: url("${bgIMG}");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 25px;

    .inner_section {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const MainHeading = styled("h2")`
  font-style: normal;
  font-weight: 600;
  font-size: 56px;
  line-height: 60px;
  letter-spacing: -0.02em;
  ${textWhiteColor}
  margin: 0;
  margin-bottom: 16px;
`;
const MainPara = styled("p")`
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 35px;
  ${textWhiteColor}
  margin-bottom: 15px;
`;
const BannerCardWrapper = styled("div")`
  display: flex;
  justify-content: start;
  align-items: flex-end;
  @media screen and (max-width: 1025px) {
    padding-right: 130px;
  }
  @media screen and (max-width: 768px) {
    margin-top: 20px;
    padding-right: 0;
  }
  img {
    width: 475px;
    @media screen and (max-width: 768px) {
      bottom: -48px;
      right: -150px;
      width: 540px;
    }
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  .gold_cup {
    position: absolute;
    left: 25px;
    bottom: 25px;
    width: 22%;
  }
  .astro_showing {
    position: absolute;
    right: 35px;
    top: 100px;
    width: 20%;
  }
  .smiling_face_with_horns {
    position: absolute;
    right: -130px;
    bottom: 45px;
    width: 22%;

    @media screen and (max-width: 1024px) {
      right: -105px;
    }
    @media screen and (max-width: 600px) {
      right: -25px;
    }
  }
`;
const BnnerBTN = {
  display: "flex",
  alignItems: "center",
  justifyContent: "right",
  "& button": {
    // marginTop: "20px",
    // fontWeight: "600 !important",
  },
  "& .brownBTN": {
    ml: { xs: "5px", sm: "65px" },
    padding: "12px 40px",
  },
};

const contantWrapper = {
  textAlign: "left",
  pt: "40px",
  pb: "65px",

  "@media screen and (max-width: 770px)": {
    pl: "50px",
    pr: "50px",
  },
  "@media screen and (max-width: 450px)": {
    pl: "0px",
    pr: "0px",
    pt: "20px",
    pb: "30px",
  },
};
const colMblPadding = {
  "@media screen and (max-width: 450px)": {
    paddingLeft: "0px !important",
  },
};
export const ProfileBanner = () => {
  return (
    <>
      <BannerSection>
        <Container className="big_desktop_container">
          <Box className="back_img">
            <Grid className="inner_section" container spacing={2}>
              <Grid item md={6} sx={colMblPadding}>
                <Box sx={contantWrapper}>
                  <MainHeading>Profile</MainHeading>
                  {/* <MainPara>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias fuga hic laudantium sint tempora, nesciunt eaque
                    labore blanditiis alias odit deleniti suscipit! Quae ipsam,
                    ex unde ullam et eaque delectus.
                  </MainPara>
                  <Box sx={BnnerBTN}>
                    <OutlineButton>Start Minting </OutlineButton>
                    <BlackButton>Explore</BlackButton>
                  </Box> */}
                </Box>
              </Grid>
              <Grid item md={6} sx={colMblPadding}>
                <BannerCardWrapper>
                  <Typography component={"img"} src={BannerInnerIMG} alt="" />
                </BannerCardWrapper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </BannerSection>
    </>
  );
};
