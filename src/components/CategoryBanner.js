import React from "react";
import { Grid, Box, Container, styled } from "@mui/material";
// import banner_back from "../images/banner_bg2.png";

const BannerSection = styled("section")`
  padding-top: 10px;

  .back_img {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 25px;
    padding-top: 85px;
    padding-bottom: 100px;
    .inner_section {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      // padding-top: 50px;
      // padding-bottom: 70px;
      @media screen and (max-width: 1025px) {
        width: 100%;
      }
      @media screen and (max-width: 768px) {
        padding-top: 55px;
        padding-bottom: 60px;
      }
      @media screen and (max-width: 600px) {
        padding-top: 0;
        padding-bottom: 60px;
        width: 90%;
      }
    }
  }
`;
const MainHeading = styled("h2")`
  font-style: normal;
  font-weight: 700;
  font-size: 51px;
  line-height: 60px;
  letter-spacing: -0.02em;
  color: #1e1e1e;
  margin: 0;
  margin-bottom: 0;
  text-align: center;
`;
const colMblPadding = {
  "@media screen and (max-width: 450px)": {
    paddingLeft: "0px !important",
  },
};

const CategoryBanner = ({ children }) => {
  return (
    <>
      <BannerSection>
        <Container className="big_desktop_container">
          <Box className="back_img">
            <Grid className="inner_section" container spacing={2}>
              <Grid item xs={12} sx={colMblPadding}>
                <Box>
                  <MainHeading>{children}</MainHeading>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </BannerSection>
    </>
  );
};

export default CategoryBanner;
