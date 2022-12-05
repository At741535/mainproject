import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { Artists } from "./index";
import Artist1 from "../images/artist1.png";
import Artist2 from "../images/artist2.png";
import Artist3 from "../images/artist3.png";
import Artist4 from "../images/artist4.png";
import Artist5 from "../images/artist5.png";

const ArtistSec = { pb: "70px" };
const flexGrow = {
  flexGrow: 1,
  "& .MuiGrid-container": {
    alignItems: "center",
  },
};
const ContainerStyle = {
  position: "relative",
};
export function ArtistList() {
  const ArrObj = [
    { Image: Artist1, Name: "Arijit Singh" },
    { Image: Artist2, Name: "Jubin Notiyal" },
    { Image: Artist3, Name: "Neha kakkar" },
    { Image: Artist4, Name: "Kumar sanu" },
    { Image: Artist5, Name: "Himesh Reshammiya" },
  ];
  return (
    <>
      <Box component={"section"} sx={ArtistSec}>
        <Container className="big_desktop_container" sx={ContainerStyle}>
          <Box className="prent_box" sx={flexGrow}>
            <Grid container spacing={2}>
              {ArrObj.map((artist, ind) => {
                return (
                  <Grid key={ind} item xs={12} sm={6} md={2.4}>
                    <Artists artist={artist} />
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
