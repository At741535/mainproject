import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { NftInstructionsBlock } from "./index";
import { textWhiteColor } from "./GlobelColor";
import Icon1 from "../images/icon1.png";
import Icon2 from "../images/icon2.png";
import Icon3 from "../images/icon3.png";
import Icon4 from "../images/icon4.png";

const InstructionsSec = { pb: "70px" };
const flexGrow = {
  flexGrow: 1,
  "& .MuiGrid-container": {
    alignItems: "center",
  },
};
const ContainerStyle = {
  position: "relative",
};
const MainHeading = {
  mb: "40px",
  "& h2": {
    fontSize: "26px",
    fontWeight: "700",
    textAlign: { xs: "center", sm: "left" },
  },
};
export function NftInstructions() {
  const ArrObj = [
    {
      Icon: Icon1,
      Title: "Set Up Your Wallet",
      Description:
        "Wallet that is functional for NFT purchasing. You may have a Coinbase account at this point, but very few are actually set up to buy an NFT.",
    },
    {
      Icon: Icon2,
      Title: "Create Your Collection",
      Description:
        "Wallet that is functional for NFT purchasing. You may have a Coinbase account at this point, but very few are actually set up to buy an NFT.",
    },
    {
      Icon: Icon3,
      Title: "Neha kakkar",
      Description:
        "Wallet that is functional for NFT purchasing. You may have a Coinbase account at this point, but very few are actually set up to buy an NFT.",
    },
    {
      Icon: Icon4,
      Title: "Kumar sanu",
      Description:
        "Wallet that is functional for NFT purchasing. You may have a Coinbase account at this point, but very few are actually set up to buy an NFT.",
    },
  ];
  return (
    <>
      <Box component={"section"} sx={InstructionsSec}>
        <Container className="big_desktop_container" sx={ContainerStyle}>
          <Box className="prent_box" sx={flexGrow}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Box sx={MainHeading}>
                  <Typography sx={[textWhiteColor[0]]} component={"h2"}>
                    Create And Sell Your NFTs
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {ArrObj.map((instructions, ind) => {
                return (
                  <Grid key={ind} item xs={12} sm={6} md={3}>
                    <NftInstructionsBlock instructions={instructions} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
