import React, { useMemo } from "react";
import { DocumentTitle, NoDataFound, PageSubHeader } from "../components";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  styled,
  Grid,
  Box,
  Container,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";
import { ListedNftCards } from "../page-components/explore";
import { ExploreFilterSidebar } from "../components/SideBars/";
import { GetListedNFTs } from "../hooks";
import { ContractUtility } from "../common";
import { ExploreNftCards } from "../components/NftCards";

const CartListSection = styled("section")`
  padding-top: 50px;
  padding-bottom: 50px;
`;

const cardStyleProps = {
  borderStyle: {
    padding: "0px",
    overflow: "hidden",
    background: "#000000",
    height: "100%",
    boxShadow: "0px 0px 50px 35px rgba(0, 0, 0, 0.04)",
    borderRadius: "0px",
    border: "1px solid #FFFFFF",
  },
  titleStyle: {
    margin: 0,
    fontSize: "13px",
    fontWeight: 900,
  },
  statusStyle: {
    fontSize: { xs: "16px", lg: "18px" },
    fontWeight: 900,
  },
  labelStyle: {
    color: "#101010",
    fontWeight: 600,
    fontSize: "13px",
  },
};

const FilterSideBarStyle = {
  backgroundColor: "#ff0000",
};
const NFTCardContainer = {
  paddingLeft: "0px !important",
  paddingRight: "0px !important",
};
const NftCardStyle = {
  backgroundColor: "#ff0000",
};

const flexGrow = {
  flexGrow: 1,
};

const filtersTitle = {
  margin: "10px",
  "& div": {
    color: "#ffffff",
  },
  "& svg": {
    color: "rgba(255, 255, 255, 0.56) !important",
  },
};

const LoaderWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;

  svg {
    color: #000000;
  }
`;

export const Explore = () => {
  const { connectedAccountAddress } = useSelector((state) => state?.blockchain);
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const obj = {};
    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
      if (param === "toggles" && value) {
        obj[param] = value.split(",");
      } else {
        obj[param] = value;
      }
    }
    return obj;
  }, [searchParams]);

  const { data: listedNfts, loading } = GetListedNFTs(
    connectedAccountAddress,
    filters
  );

  const onFilterChange = (values) => {
    setSearchParams({ ...filters, ...values });
  };

  const tokenInfo = useMemo(
    () =>
      ContractUtility.getPaymentToken(
        filters?.currency,
        ContractUtility.getCurrentNetwork()
      ),
    [filters]
  );

  const filterArrayOfObj = [
    { lable: "min", value: filters?.min },
    { lable: "max", value: filters?.max },
    { lable: "currency", value: filters?.currency ? tokenInfo?.symbol : null },
  ];

  const handleClearFilter = (lable) => {
    const filterObj = {
      min: filters?.min,
      max: filters?.max,
      currency: filters?.currency,
    };
    delete filterObj[lable];
    for (const property in filterObj) {
      if (!filterObj[property]) {
        delete filterObj[property];
      }
    }
    setSearchParams(filterObj);
  };

  return (
    <>
      <DocumentTitle title="Explore - NFT Auctions" />
      <PageSubHeader
        title="Explore."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
      />
      {loading ? (
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>
      ) : (
        <CartListSection>
          <Container className="big_desktop_container">
            <Box className="prent_box" sx={flexGrow}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  {/* <FilterSideBar
                    onFilterChange={onFilterChange}
                    sx={FilterSideBarStyle}
                    filters={filters}
                  /> */}
                  <ExploreFilterSidebar
                    onFilterChange={onFilterChange}
                    sx={FilterSideBarStyle}
                    filters={filters}
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <Container sx={NFTCardContainer}>
                    <Box className="prent_box" sx={flexGrow}>
                      <Grid container spacing={2}>
                        <Box sx={filtersTitle}>
                          <Stack direction="row" spacing={1}>
                            {filterArrayOfObj.map((el, ind) => {
                              return (
                                el.value && (
                                  <Chip
                                    key={ind}
                                    label={
                                      el.lable +
                                      ` ${ind !== "2" ? "price" : ""}  (${
                                        el.value
                                      })`
                                    }
                                    variant="outlined"
                                    onDelete={() => handleClearFilter(el.lable)}
                                  />
                                )
                              );
                            })}
                          </Stack>
                        </Box>
                      </Grid>
                      <Grid container spacing={2}>
                        {listedNfts && listedNfts[0] ? (
                          listedNfts &&
                          listedNfts.map((el, ind) => {
                            return (
                              <Grid item xs={12} sm={6} md={4} key={ind}>
                                {/* <ListedNftCards
                                  sx={NftCardStyle}
                                  cardStyleProps={cardStyleProps}
                                  nftData={el}
                                /> */}
                                <ExploreNftCards
                                  sx={NftCardStyle}
                                  cardStyleProps={cardStyleProps}
                                  nftData={el}
                                />
                              </Grid>
                            );
                          })
                        ) : (
                          <Grid item xs={12}>
                            <NoDataFound title={"No NFTs listed!"} />
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </Container>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </CartListSection>
      )}
    </>
  );
};
