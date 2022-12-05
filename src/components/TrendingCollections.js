import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EastIcon from "@mui/icons-material/East";
import TrendingCollectionCard from "./TrendingCollectionCard";
import { BgBlueColor, BoxShadow } from "./GlobelColor";
import { OutlineButton } from "../elements";
const ContainerStyle = {
  // paddingLeft: { sm: "0px" },
  // paddingRight: { sm: "0px" },
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
  color: "#FFFFFF",
  fontWeight: "400",
  fontSize: "14px",
  textTransform: "capitalize",
  minHeight: "42px",
  "&.Mui-selected": {
    color: "#03042B",
    backgroundColor: "#0CF5FE",
    borderRadius: "50px",
  },
};
const TabPanelWarraper = {
  p: "0",

  "& .PriceBoxWrapperStyle": {
    mt: "15px",
  },
};

const TableListStyle = {
  backgroundColor: "#8600b5",
  borderRadius: "50px",
  minHeight: "42px",
  "& span.MuiTabs-indicator": {
    display: "none",
  },
};

const TabLabelRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "column",
  "& .TabLabels": { p: "25px 55px 30px", borderRadius: "25px" },
};

const MainHeading = {
  "& h2": {
    textAlign: "center",
    color: "#ffffff",
    fontSize: "26px",
    fontWeight: "700",
    mb: "20px",
    "@media screen and (max-width:420px)": { mb: "28px" },
  },
};
const TabLebleList = {};
const DeskSeeMore = {
  "@media screen and (max-width:770px)": { display: "none" },
  "& p": {
    display: "flex",
    alignItems: "center",
    color: "#1E1E1E",
    fontSize: "16px",
    fontWeight: "600",
  },
};
const SeeAll = { textAlign: "center", mt: "60px", "& svg": { ml: "10px" } };
const TrendingCollectionCardWrapper = {
  mt: "40px",
  "& .MuiGrid-container": {
    flexWrap: "nowrap",
    overflow: "auto",
    mb: "25px",
    "&::-webkit-scrollbar": {
      height: "6px",
    },
    "&::-webkit-scrollbar-thumb": { cursor: "pointer" },
  },
};
const TrendingCollectionSec = {
  pt: "50px",
  pb: { xs: "60px", md: "80px" },
};
export function TrendingCollections() {
  const [value, setValue] = useState("1");
  const handleTab = (event, newValue) => {
    setValue(newValue);
  };
  // const arr = Array.from({ length: 15 }, (_, i) => i + 1);
  const TrendingArr = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
  ];

  return (
    <>
      <Box component={"section"} sx={TrendingCollectionSec}>
        <Container className="big_desktop_container" sx={ContainerStyle}>
          <Box className="prent_box" sx={flexGrow}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TabContext value={value}>
                  <Box sx={TabLabelRow}>
                    <Box
                      className="TabLabels"
                      sx={[BgBlueColor[0], BoxShadow[0]]}
                    >
                      <Box sx={MainHeading}>
                        <Typography component={"h2"}>
                          Top Collections
                        </Typography>
                      </Box>
                      <Box sx={TabLebleList}>
                        <TabList sx={TableListStyle} onChange={handleTab}>
                          <Tab sx={TabLabel} label="1 Day" value={"1"} />
                          <Tab sx={TabLabel} label="7 Days" value={"2"} />
                          <Tab sx={TabLabel} label="30 Day" value={"3"} />
                        </TabList>
                      </Box>
                    </Box>
                  </Box>
                  <TabPanel sx={TabPanelWarraper} value={"1"}>
                    <Box sx={TrendingCollectionCardWrapper}>
                      <Box className="prent_box" sx={flexGrow}>
                        <Grid container spacing={2}>
                          {TrendingArr.map((item, i) => {
                            return (
                              <Grid key={i} item xs={2}>
                                <TrendingCollectionCard item={item} />
                              </Grid>
                            );
                          })}
                        </Grid>
                        <Grid container spacing={2}>
                          {TrendingArr.map((item, i) => {
                            return (
                              <Grid key={i} item xs={2}>
                                <TrendingCollectionCard item={item} />
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
                          {TrendingArr.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={4} lg={2}>
                                <TrendingCollectionCard item={item} />
                              </Grid>
                            );
                          })}
                        </Grid>
                        <Grid container spacing={2}>
                          {TrendingArr.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={4} lg={2}>
                                <TrendingCollectionCard item={item} />
                              </Grid>
                            );
                          })}
                        </Grid>
                        <Grid container spacing={2}>
                          {TrendingArr.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={4} lg={2}>
                                <TrendingCollectionCard item={item} />
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
                          {TrendingArr.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={4} lg={2}>
                                <TrendingCollectionCard item={item} />
                              </Grid>
                            );
                          })}
                        </Grid>
                        <Grid container spacing={2}>
                          {TrendingArr.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={4} lg={2}>
                                <TrendingCollectionCard item={item} />
                              </Grid>
                            );
                          })}
                        </Grid>
                        <Grid container spacing={2}>
                          {TrendingArr.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={4} lg={2}>
                                <TrendingCollectionCard item={item} />
                              </Grid>
                            );
                          })}
                        </Grid>
                        <Grid container spacing={2}>
                          {TrendingArr.map((item, i) => {
                            return (
                              <Grid key={i} item xs={12} sm={6} md={4} lg={2}>
                                <TrendingCollectionCard item={item} />
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>
                    </Box>
                  </TabPanel>
                  <Box sx={SeeAll}>
                    <OutlineButton>
                      see all collections <EastIcon />
                    </OutlineButton>
                  </Box>
                </TabContext>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
