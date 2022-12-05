import React, { useState, useMemo } from "react";
import { DocumentTitle, NoDataFound, PageSubHeader } from "../components";
import {
  styled,
  Grid,
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import { InventoryList } from "../page-components/inventory";
import { FilterSideBar } from "../components/SideBars/";
import { useSelector } from "react-redux";
import { InventoryNft, GetListedNFTs } from "../hooks";
import { CommonUtility, ContractUtility } from "../common";

import { ProfileBanner } from "../components/Banners/ProfileBanner";
import { ProfileNftCard } from "../components/NftCards/index";

const CartListSection = styled("section")`
  padding-bottom: 50px;
`;

const cardStyleProps = {
  borderStyle: {
    overflow: "hidden",
    boxShadow: "none",
    background: "#000000",
    height: "100%",
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

const NFTCardContainer = {
  paddingLeft: "0px !important",
  paddingRight: "0px !important",
};

const flexGrow = {
  flexGrow: 1,
};

const FilterBarWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: "10px",
  flexDirection: { xs: "column-reverse", sm: "row" },
  "& p": {
    color: "#ffffff",
  },

  "& .filters": {
    display: "flex",
    alignItems: "center",
    mb: { xs: "20px", sm: "0" },
    "& > .MuiFormControl-root": {
      minWidth: "150px",
      mr: "10px",
    },
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

export const Profile = () => {
  const { connectedAccountAddress } = useSelector((state) => state?.blockchain);
  const [filters, setFilters] = useState({});
  const defaultFilter = useMemo(() => {
    return {
      userListing: true,
    };
  }, []);
  const { data: userListing } = GetListedNFTs(
    connectedAccountAddress,
    defaultFilter
  );

  const { userAllNFT, loading } = InventoryNft(
    connectedAccountAddress,
    ContractUtility.getCurrentNetwork()
  );

  const combinedNFTs = useMemo(() => {
    const combinedNFTs = [];
    userAllNFT.forEach((item) => {
      const marketplaceNft = userListing.find(
        (x) =>
          item.asset_contract?.address?.toString() ===
            x?.listedNFT[0]?.token_address?.toString() &&
          item?.token_id?.toString() === x?.listedNFT[0]?.token_id?.toString()
      );
      let nft = { ...item };
      if (marketplaceNft) {
        //console.log("matched------")
        const temp = ContractUtility.getPaymentToken(
          marketplaceNft?.signedOrder?.erc20Token,
          marketplaceNft?.listedNFT[0]?.protocol
        );
        let paymentDetails;
        if (temp) {
          const amount =
            (marketplaceNft?.signedOrder?.erc20TokenAmount || 0) /
            10 ** temp.decimals;
          paymentDetails = {
            ...temp,
            amount: amount > 1 ? CommonUtility.roundNumber(amount, 2) : amount,
          };
        }
        nft = {
          ...item,
          signedOrder: marketplaceNft.signedOrder,
          listType: marketplaceNft?.listType,
          paymentDetails,
        };
      }
      combinedNFTs.push(nft);
    });
    return combinedNFTs;
  }, [userAllNFT, userListing]);

  console.log(combinedNFTs);

  const doPriceFilter = ({ paymentToken: token, min = 0, max }, records) => {
    min = min && Number(min);
    max = max && Number(max);
    let filtered = [];
    if (records.length !== 0) {
      filtered = records?.filter((item) => {
        if (!max) {
          return (
            item?.paymentDetails &&
            item?.paymentDetails.address === token &&
            item.paymentDetails.amount >= min
          );
        }
        if (!min) {
          return (
            item?.paymentDetails &&
            item?.paymentDetails.address === token &&
            item.paymentDetails.amount <= max
          );
        }
        if (min && max) {
          return (
            item?.paymentDetails &&
            item?.paymentDetails.address === token &&
            item.paymentDetails.amount >= min &&
            item.paymentDetails.amount <= max
          );
        }
        return null;
      });
    }
    return filtered;
  };

  const doToggleFilter = ({ toggles }, records) => {
    let filtered = [];
    if (toggles.includes("ON_AUCTION")) {
      filtered = records.filter((item) => item.listType === "auction");
    }
    if (toggles.includes("BUY_NOW")) {
      filtered = records.filter((item) => item.listType === "fixed");
    }
    if (toggles.includes("NEW")) {
      filtered = records.filter((item) => item.listType === "auction");
    }
    return filtered;
  };

  const profileNfts = useMemo(() => {
    let response = combinedNFTs;
    if (filters.paymentToken && (filters?.min || filters?.max)) {
      response = doPriceFilter(filters, response);
    }
    if (filters.toggles && filters.toggles.length) {
      response = doToggleFilter(filters, response);
    }
    return response;
  }, [filters, combinedNFTs]);

  const handleFilterChange = (values) => {
    const toggles = values.toggles ? values.toggles.split(",") : [];
    return setFilters({ ...values, toggles });
  };

  return (
    <>
      {/* <DocumentTitle title="Profile - NFT Auctions" /> */}

      {/* <PageSubHeader title="Profile." /> */}
      <ProfileBanner />
      <CartListSection>
        <Container className="big_desktop_container">
          <Box className="prent_box" sx={flexGrow}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <FilterSideBar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Container sx={NFTCardContainer}>
                  <Box className="prent_box" sx={flexGrow}>
                    {/* <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box sx={FilterBarWrapper}>
                          <Typography component={"p"}>
                            {profileNfts[0] &&
                              connectedAccountAddress &&
                              userAllNFT.length + " items"}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid> */}

                    <Grid container spacing={2}>
                      {["1", "2", "3", "4", "5", "6"].map(() => {
                        return (
                          <Grid item xs={12} sm={6} md={4}>
                            <ProfileNftCard />
                          </Grid>
                        );
                      })}
                    </Grid>

                    {connectedAccountAddress ? (
                      <>
                        {!loading ? (
                          <Grid container spacing={2}>
                            {profileNfts[0] &&
                              profileNfts.map((el, ind) => {
                                return (
                                  <Grid item xs={12} sm={6} md={4} key={ind}>
                                    <InventoryList
                                      nftData={el}
                                      cardStyleProps={cardStyleProps}
                                    />
                                  </Grid>
                                );
                              })}
                            {!profileNfts.length && (
                              <Grid item xs={12}>
                                <Box>
                                  <NoDataFound
                                    title={
                                      "You don't own any NFTs in this wallet."
                                    }
                                  />
                                </Box>
                              </Grid>
                            )}
                          </Grid>
                        ) : (
                          <LoaderWrapper>
                            <CircularProgress />
                          </LoaderWrapper>
                        )}
                      </>
                    ) : (
                      <Grid item xs={12}>
                        <NoDataFound title={"Connect to wallet"} />
                      </Grid>
                    )}
                  </Box>
                </Container>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </CartListSection>
    </>
  );
};
