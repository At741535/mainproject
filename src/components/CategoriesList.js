import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import { textWhiteColor } from "./GlobelColor";
import { NftCard } from "../components/NftCards/index";
import { OutlineButton } from "../elements";

const ContainerStyle = {
  position: "relative",

  "& > svg": {
    position: "absolute",
    top: { xs: "-16px", sm: "8px" },
    right: { xs: "0", sm: "-14px" },
    fontSize: "30px",
    color: "#781217",
    cursor: "pointer",
  },
};
const flexGrow = {
  flexGrow: 1,
  "& .MuiGrid-container": {
    alignItems: "center",
  },
};
const TabLabel = {
  color: "#8E8E8E",
  fontWeight: "600",
  fontSize: "16px",
  textTransform: "capitalize",
  minHeight: "42px",
  minWidth: "auto",
  pb: "5px",
  "&.Mui-selected": {
    color: "#1E1E1E",
  },
};
const TabPanelWarraper = {
  p: "0",

  "& .PriceBoxWrapperStyle": {
    mt: "15px",
  },
};

const TableListStyle = {
  minHeight: "42px",
  "& .MuiTabs-flexContainer": {
    display: "inline-flex",
    "& button": {
      textAlign: "center",
      color: "#ffffff",
      borderRadius: "12px",
      margin: "0px",
      textTransform: "capitalize",
      fontWeight: "400",
      padding: "12px 20px",
      fontSize: "14px",
      backgroundImage:
        "linear-gradient(\n      rgba(255, 255, 255, 0),\n      rgba(255, 255, 255, 0)\n    ),\n    linear-gradient(101deg, #1fa2ff, #12d8fa, #a6ffcb)",
      backgroundOrigin: "border-box",
      backgroundClip: "content-box, border-box",
      boxShadow: "2px 1000px 1px #161a42 inset",
      border: "solid 3px transparent",
      ml: "15px",
      "&.Mui-selected": {
        boxShadow: "2px 1000px 1px #0cf5fe inset",
        color: "#000 !important",
      },
      "&:hover": {
        boxShadow: "2px 1000px 1px #0cf5fe inset",
        color: "#000 !important",
      },
    },
  },
  "& span.MuiTabs-indicator": {
    display: "none",
  },
};

const TabLabelRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: "20px",

  "@media screen and (max-width:600px)": {
    flexDirection: "column",
  },
};

const MainHeading = {
  "& h2": {
    fontSize: "26px",
    fontWeight: "700",
  },
};
const TabLebleList = {};
const MblSeeMore = {
  display: "none",
  mt: "30px",
  "@media screen and (max-width:600px)": { display: "block" },
  "& p": {
    display: "flex",
    alignItems: "center",
    color: "#1E1E1E",
    fontSize: "16px",
    fontWeight: "600",
    justifyContent: "center",
  },
};
const TrendingCollectionCardWrapper = {
  mt: "40px",
};
const TrendingCollectionSec = {
  pb: { xs: "50px", sm: "40px" },
};
const BtnWrapper = { textAlign: "center", mt: "60px", "& svg": { ml: "10px" } };
export function CategoriesList() {
  const [value, setValue] = useState("1");
  const handleTab = (event, newValue) => {
    setValue(newValue);
  };
  const TrendingArr = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <>
      <Box component={"section"} sx={TrendingCollectionSec}>
        <Container className="big_desktop_container" sx={ContainerStyle}>
          <Box className="prent_box" sx={flexGrow}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TabContext className="SDSDSDSDSDS" value={value}>
                  <Box sx={TabLabelRow}>
                    <Box sx={MainHeading}>
                      <Typography component={"h2"} sx={[textWhiteColor[0]]}>
                        Hot NFTs
                      </Typography>
                    </Box>
                    <Box sx={TabLebleList}>
                      <TabList sx={TableListStyle} onChange={handleTab}>
                        <Tab sx={TabLabel} label="Music" value={"1"} />
                        <Tab sx={TabLabel} label="Art" value={"2"} />
                        <Tab
                          sx={TabLabel}
                          label="NFT celebration"
                          value={"3"}
                        />
                        <Tab sx={TabLabel} label="Virtual" value={"4"} />
                        <Tab sx={TabLabel} label="Videos" value={"5"} />
                        <Tab sx={TabLabel} label="More" value={"6"} />
                      </TabList>
                    </Box>
                  </Box>
                  <TabPanel sx={TabPanelWarraper} value={"1"}>
                    <Box sx={TrendingCollectionCardWrapper}>
                      <Box className="prent_box" sx={flexGrow}>
                        <Grid container spacing={2}>
                          {TrendingArr.map((i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={3}>
                                <NftCard />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel sx={TabPanelWarraper} value={"2"}>
                    <Box sx={TrendingCollectionCardWrapper}>
                      <Box className="prent_box" sx={flexGrow}>
                        <Grid container spacing={2}>
                          {TrendingArr.map((i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={3}>
                                <NftCard />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel sx={TabPanelWarraper} value={"3"}>
                    <Box sx={TrendingCollectionCardWrapper}>
                      <Box className="prent_box" sx={flexGrow}>
                        <Grid container spacing={2}>
                          {TrendingArr.map((i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={3}>
                                <NftCard />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel sx={TabPanelWarraper} value={"4"}>
                    <Box sx={TrendingCollectionCardWrapper}>
                      <Box className="prent_box" sx={flexGrow}>
                        <Grid container spacing={2}>
                          {TrendingArr.map((i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={3}>
                                <NftCard />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel sx={TabPanelWarraper} value={"5"}>
                    <Box sx={TrendingCollectionCardWrapper}>
                      <Box className="prent_box" sx={flexGrow}>
                        <Grid container spacing={2}>
                          {TrendingArr.map((i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={3}>
                                <NftCard />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel sx={TabPanelWarraper} value={"6"}>
                    <Box sx={TrendingCollectionCardWrapper}>
                      <Box className="prent_box" sx={flexGrow}>
                        <Grid container spacing={2}>
                          {TrendingArr.map((i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={3}>
                                <NftCard />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    </Box>
                  </TabPanel>
                </TabContext>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Box sx={BtnWrapper}>
                  <OutlineButton>
                    View More <EastIcon />
                  </OutlineButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
