import React, { useEffect, useMemo, useState } from "react";
import {
  styled,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import { OutlineButton, BlackButton } from "../../elements";
import { weiToCurrency, DateUtility, ContractUtility } from "../../common";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  FontAgne,
  FontProximaNova,
  MediaRender,
  SalesCountDown,
  AppUsername,
  SellPopup,
  PlaceBidPopup,
  FixedPriceBuyPopUp,
} from "../../components";
import {
  textWhiteColor,
  BtnBorderDarkGradient,
} from "../../components/GlobelColor";
import mt from "date-fns/esm/locale/mt/index.js";

const LoaderWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    ${textWhiteColor}
  }
  margin-bottom: 10px;
`;

const flexGrow = {
  flexGrow: 1,
};
const SellBtnWrapper = styled("div")`
  text-align: right;
  margin-bottom: 20px;
  button {
    font-weight: 600 !important;
    border-radius: 0 !important;
    padding-right: 50px !important;
    padding-left: 50px !important;
  }
`;
const CancelBtnWrapper = styled("div")`
  text-align: right;
  margin-bottom: 20px;
  button {
    font-weight: 600 !important;
    border-radius: 0 !important;
    padding-right: 50px !important;
    padding-left: 50px !important;
  }
`;
const NftDetailSection = styled("section")`
  padding-top: 50px;
  padding-bottom: 50px;

  @media screen and (max-width: 600px) {
    padding-bottom: 20px;
  }
`;
const NftSingleImg = styled("div")`
  text-align: left;
  padding-right: 50px;

  @media screen and (max-width: 768px) {
    padding-right: 0px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${BtnBorderDarkGradient}
    border-radius: 15px;
  }
`;
const NftDetails = styled("div")`
  padding-left: 90px;
  @media screen and (max-width: 480px) {
    padding: 20px;
  }

  .ownertag {
    margin-bottom: 25px;
    margin-right: 50px;
    p {
      ${textWhiteColor}
      font-size: 16px;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      font-weight: 600;
      span {
        ${textWhiteColor}
        font-size: 16px;
        font-weight: 400;
        a {
          ${textWhiteColor}
        }
      }
    }
  }
  .description {
    border-bottom: 1px solid #1010101a;
    padding-bottom: 25px;
  }

  .offer_block {
    p {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      &::before {
        content: "";
        background-color: #101010;
        width: 100%;
        height: 1px;
        margin-right: 10px;
      }

      &::after {
        content: "";
        background-color: #101010;
        width: 100%;
        height: 1px;
        margin-left: 10px;
      }
    }
  }
`;

const NftSingleDetailTitle = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h2 {
    ${textWhiteColor}
    font-size: 60px;
    font-weight: 500;
    line-height: 80px;
    margin-bottom: 15px;
    text-transform: capitalize;
  }

  p {
    ${textWhiteColor}
    font-size: 20px;
    margin-bottom: 15px;
  }
`;
const NftDetailBoxWrapper = styled("div")`
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  border-radius: 0px;
`;
const SalesEndsBox = styled("div")`
  padding: 25px 0px;
  padding-top: 18px;
  padding-bottom: 20px;
`;
const MinimumBidBox = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 25px 0px;
  background-color: transparent;
  .brownBtnWrapper {
    margin-top: 25px;
  }
  p {
    font-size: 17px;
    ${textWhiteColor}
    font-weight: 400;
    margin-bottom: 10px;
  }

  h3 {
    display: flex;
    align-items: center;
    font-size: 34px;
    font-weight: 700;
    ${textWhiteColor}
    line-height: 1px;
    text-transform: uppercase;
    span {
      ${textWhiteColor}
      align-self: flex-end;
      line-height: 1;
      font-weight: 400;
    }
  }
  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  div {
    width: 100%;
    flex: 1;
    button {
      width: 100%;
    }
  }
`;

const OwnerInfo = styled("div")`
  display: flex;
`;

const ConnectWalletBtn = {
  width: "100%",
  mt: "20px",
};
export const NftSingleDetail = ({
  blockchain,
  nftDetails,
  handleCreateOrder,
  onOfferCreate,
  marketplaceData,
  paymentToken,
  onCancelListing,
  isOwner,
  currentBid,
  offersLoading,
  canTakeAction,
  handleAcceptOffer,
  protocol,
  ownerAddress,
  connectWallet,
}) => {
  const {
    image_preview_url: image,
    animation_url,
    creator,
    name,
    description,
  } = nftDetails || {};
  const { listType } = marketplaceData || {};
  const [open, setOpen] = useState({
    sell: false,
    fixedBuy: false,
    placeBid: false,
    transferNFT: false,
    sellWithAuction: false,
  });

  const [isSaleOver, setIsSaleOver] = useState(false);
  const Nftprice = useMemo(() => {
    if (marketplaceData && marketplaceData.signedOrder) {
      return weiToCurrency(marketplaceData.signedOrder, null, protocol);
    }
  }, [marketplaceData]);

  useEffect(() => {
    if (
      DateUtility.convertDateToUnix(new Date()) * 1000 >=
      marketplaceData?.signedOrder.expiry
    ) {
      setIsSaleOver(true);
    }
  }, [marketplaceData?.signedOrder]);

  const tokenInfo = useMemo(
    () =>
      ContractUtility.getPaymentToken(
        marketplaceData?.signedOrder.erc20Token,
        protocol
      ),
    [marketplaceData, protocol]
  );

  const PriceDetailSection = () => {
    return (
      <Typography component={"h3"}>
        <Typography component={"img"} alt="" src={tokenInfo?.icon} />{" "}
        {Nftprice.noExponents()} {""}
        {" " + marketplaceData &&
          marketplaceData?.signedOrder &&
          tokenInfo?.symbol}
        <Typography component={"span"}>
          &nbsp;&nbsp;{currentBid?.dollarPrice}
        </Typography>
      </Typography>
    );
  };

  return (
    <>
      <NftDetailSection>
        <Container className="big_desktop_container">
          <Box className="prent_box" sx={flexGrow}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <NftSingleImg>
                  <MediaRender
                    animationURL={animation_url}
                    imageUrl={image}
                    fullMode
                  />
                </NftSingleImg>
              </Grid>
              <Grid item xs={12} md={7}>
                <NftDetails>
                  {nftDetails && isOwner && canTakeAction && (
                    <>
                      {!marketplaceData && !marketplaceData?.signedOrder && (
                        <SellBtnWrapper>
                          <OutlineButton
                            onClick={() => {
                              setOpen({ ...open, sell: true });
                            }}
                          >
                            Sell
                          </OutlineButton>
                        </SellBtnWrapper>
                      )}
                      {marketplaceData && marketplaceData?.signedOrder && (
                        <CancelBtnWrapper>
                          <OutlineButton
                            onClick={() => {
                              onCancelListing(marketplaceData._id);
                            }}
                          >
                            Cancel Listing
                          </OutlineButton>
                        </CancelBtnWrapper>
                      )}
                    </>
                  )}

                  <NftSingleDetailTitle>
                    <Typography component={"h2"}>{`${
                      name ? name : ""
                    }`}</Typography>
                  </NftSingleDetailTitle>

                  {/* <NftSingleDetailTitle>
                    <Typography component={"p"}>{description}</Typography>
                  </NftSingleDetailTitle> */}

                  <OwnerInfo>
                    <Box className="ownertag">
                      <Typography component={"p"}>
                        Owner: &nbsp;
                        <Typography component={"span"}>
                          <AppUsername
                            protocol={protocol}
                            address={ownerAddress}
                            showVerified
                          />
                        </Typography>
                      </Typography>
                    </Box>

                    <Box className="ownertag">
                      <Typography component={"p"}>
                        Creator: &nbsp;
                        <Typography component={"span"}>
                          <AppUsername
                            protocol={protocol}
                            address={creator?.address}
                            showVerified
                          />
                        </Typography>
                      </Typography>
                    </Box>
                  </OwnerInfo>

                  {marketplaceData && marketplaceData.signedOrder && (
                    <>
                      <NftDetailBoxWrapper>
                        <SalesEndsBox>
                          {marketplaceData?.signedOrder && (
                            <SalesCountDown
                              expiryTime={+marketplaceData.signedOrder.expiry}
                              setIsSaleOver={setIsSaleOver}
                            />
                          )}
                          {/*<Typography component={"p"}>
                          <WatchLaterOutlinedIcon />
                          Sales ends{" "}
                          {new Date(
                            +marketplaceData.signedOrder?.expiry
                          ).toUTCString()}
                        </Typography>*/}
                        </SalesEndsBox>
                      </NftDetailBoxWrapper>
                      {blockchain?.connectedAccountAddress ? (
                        <>
                          {canTakeAction && (
                            <MinimumBidBox>
                              {nftDetails && !offersLoading ? (
                                <>
                                  {listType === "auction" ? (
                                    <>
                                      <div>
                                        <Typography component={"p"}>
                                          Minimum Bid -- reserve price{" "}
                                          {currentBid ? "" : "not"} met.
                                        </Typography>
                                        <PriceDetailSection />
                                      </div>

                                      <BlackButton
                                        disabled={
                                          isSaleOver ||
                                          (offersLoading
                                            ? offersLoading
                                            : isOwner ||
                                              !blockchain.connectedAccountAddress)
                                        }
                                        onClick={() => {
                                          setOpen({ ...open, placeBid: true });
                                        }}
                                      >
                                        Bid
                                      </BlackButton>
                                    </>
                                  ) : (
                                    <>
                                      <PriceDetailSection />
                                      <BlackButton
                                        disabled={
                                          isSaleOver ||
                                          isOwner ||
                                          !blockchain.connectedAccountAddress
                                        }
                                        onClick={() => {
                                          setOpen({ ...open, fixedBuy: true });
                                        }}
                                      >
                                        <ShoppingBagIcon />
                                        Buy
                                      </BlackButton>
                                    </>
                                  )}
                                </>
                              ) : (
                                <LoaderWrapper>
                                  <CircularProgress />
                                </LoaderWrapper>
                              )}
                            </MinimumBidBox>
                          )}
                        </>
                      ) : (
                        <BlackButton
                          SX={ConnectWalletBtn}
                          onClick={connectWallet}
                        >
                          Connect Wallet
                        </BlackButton>
                      )}
                    </>
                  )}
                </NftDetails>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </NftDetailSection>

      {/* Popup Components */}
      <PlaceBidPopup
        Nftprice={Nftprice}
        currentBid={currentBid}
        nftDetails={nftDetails}
        open={open}
        setOpen={setOpen}
        onOfferCreate={(data) => {
          onOfferCreate(data);
          setOpen({ ...open, placeBid: false });
        }}
        tokenId={marketplaceData?.tokenId || nftDetails?.token_id}
        tokenAddress={
          marketplaceData?.signedOrder?.erc721Token ||
          nftDetails?.asset_contract.address
        }
        nft={nftDetails}
        params={{}}
        expiry={marketplaceData?.signedOrder?.expiry}
        minimumAmount={
          (marketplaceData?.signedOrder?.erc20TokenAmount || 0) /
          10 ** marketplaceData?.paymentToken?.decimals
        }
        protocol={protocol}
        paymentToken={paymentToken?.address}
        marketplace_id={marketplaceData?._id}
        saleOverCountDown={isSaleOver}
      />
      {ownerAddress === blockchain.connectedAccountAddress && (
        <SellPopup
          open={open}
          setOpen={setOpen}
          renderedNft={nftDetails}
          handleCreateOrder={handleCreateOrder}
          marketplaceData={marketplaceData}
        />
      )}
      <FixedPriceBuyPopUp
        open={open.fixedBuy}
        close={() => {
          setOpen({ ...open, fixedBuy: false });
        }}
        nft={nftDetails}
        marketplaceData={marketplaceData}
        handleAcceptOffer={handleAcceptOffer}
        blockchain={blockchain}
      />
    </>
  );
};
