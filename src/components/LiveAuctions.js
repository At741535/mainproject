import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { NftCard } from "../components/NftCards";
import { textWhiteColor } from "./GlobelColor";
import EastIcon from "@mui/icons-material/East";

const flexGrow = {
  flexGrow: 1,
  "& .MuiGrid-container": {
    alignItems: "center",
  },
};
const ContainerStyle = {
  position: "relative",
};
const TopCreatorSec = { pb: "90px" };

const MainHeading = {
  mb: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "& h2": {
    fontSize: "26px",
    fontWeight: "700",
    textAlign: { xs: "center", sm: "left" },
  },
  "& p": {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    "& svg": { fontSize: "18px", marginLeft: "10px" },
  },
};

export function LiveAuctions() {
  const arr = Array.from({ length: 4 }, (_, i) => i + 1);
  return (
    <>
      <Box component={"section"} sx={TopCreatorSec}>
        <Container className="big_desktop_container" sx={ContainerStyle}>
          <Box className="prent_box" sx={flexGrow}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Box sx={MainHeading}>
                  <Typography sx={[textWhiteColor[0]]} component={"h2"}>
                    Live Auctions
                  </Typography>
                  <Typography sx={[textWhiteColor[0]]} component={"p"}>
                    See All <EastIcon />
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {arr.map((ind) => {
                return (
                  <Grid item xs={12} sm={6} md={3}>
                    <NftCard />
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
