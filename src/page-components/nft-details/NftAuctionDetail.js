import React, { useState } from "react";
import {
  styled,
  Grid,
  Box,
  Container,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from "@mui/material";
import { TraitDetail } from "./TraitDetail";
import { truncate, DateUtility } from "../../common";
import { BlackButton, OutlineButton, RedWhiteButton } from "../../elements";
import { SwapSdkService } from "../../service/swapsdk";
import {
  TokenAddress,
  AppUsername,
  TransactionWithChild,
  ConfirmationPopup,
  FontPGRegular,
  FontProximaNovaBold,
  FontProximaNovaLight,
} from "../../components";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { textWhiteColor, BgBlackColor } from "../../components/GlobelColor";
import { ExpandMore } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import FlagIcon from "@mui/icons-material/Flag";
import { Discord, Etherscan } from "../../images/social-icon";

const NftAuctionSection = styled("section")`
  padding-top: 15px;
  padding-bottom: 70px;
  .share_btn {
    display: flex;
    align-items: center;
    padding-top: 80px;

    @media screen and (max-width: 768px) {
      padding-top: 30px;
    }
  }
`;
const AvatarWrapper = styled("div")`
  border-bottom: 1px solid #8f9ca9;
  // border-radius: 20px;
  padding: 10px 0px 10px;
  &:last-child {
    margin-bottom: 0px;
    border-bottom: none;
  }
`;
const PropertiesWrapper = {
  mb: "25px",
  // paddingRight: { xs: "0px", md: "50px" },
};

const DetailsInnerWrapper = styled("div")`
  margin-bottom: 25px;
  ${BgBlackColor}
  padding: 30px;
  overflow: hidden;
  border-radius: 15px;
  h5 {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    padding: "20px";
    ${textWhiteColor}// margin-bottom: 30px;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  }
`;

const OffersInnerTableData = {
  display: "flex",
  alignItems: "center",

  "& p": {
    width: "calc(100% / 4)",
    fontSize: "14px",
    fontWeight: "400",
    "&.TransactionsInnerData": { padding: "5px" },
  },
};
const OffersInnerTableDataButton = {
  display: "flex",
  flexDirection: "column",

  "& button": {
    padding: "1px 13px !important",
    lineHeight: "23px !important",
    fontSize: "12px !important",
    fontWeight: "600 !important",
    width: "100% !important",
  },
  "& button:first-of-type": { marginBottom: "2px !important" },
};
const OffersLebalTable = {
  p: "10px 0px 10px 0px",
  borderTop: "1px solid #8f9ca9",
  display: "flex",
  "& p": {
    width: "calc(100% / 4)",
    fontSize: "16px",
    fontWeight: "600",
  },
};
const flexGrow = {
  flexGrow: 1,
};
const OffersBoxWrapper = {
  marginTop: { xs: "30px", md: "0px" },
  // border: "2px solid #E5E8EB",
  // borderRadius: "10px",
  overflow: "hidden",
  padding: "30px",
  borderRadius: "15px",
};

const OffersLabelBox = styled("div")`
  // margin-bottom: 25px;
  h4 {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    ${textWhiteColor}
  }
`;

const LoaderWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;

  svg {
    ${textWhiteColor}
  }
`;

const TransactionColumn = styled("p")`
  display: flex;
  align-items: center;
  padding: 5px;
  ${textWhiteColor}
`;
const PropertyList = styled("div")`
  display: flex;
  margin-bottom: 20px;
  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    ${textWhiteColor}
    width: 200px;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    ${textWhiteColor}

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 50%;
  }
`;
const OffersInnerDataTableWrapper = {
  maxHeight: "357px",
  minHeight: "100px",
  overflowY: "auto",
  borderTop: "1px solid #8f9ca9",
};

export const NftAuctionDetail = ({
  nftDetails,
  isOwner,
  blockchain,
  marketplaceData,
  onCancelOffer,
  onAcceptOffer,
  offers,
  loading,
  transactions,
  protocol,
}) => {
  const {
    traits,
    token_id,
    description,
    asset_contract: { address, schema_name } = {},
  } = nftDetails || {};

  const popupState = {
    progress: false,
    success: false,
    failed: false,
  };
  const [progressState, setProgressState] = useState(popupState);
  const [open, setOpen] = useState(false);

  const linkObj = [
    {
      title: "Contract Address",
      subtitle: address,
    },
    {
      title: "Token ID",
      subtitle: token_id,
    },
    {
      title: "Token Standard",
      subtitle: schema_name,
    },
    {
      title: "Blockchain",
      subtitle: protocol,
    },
  ];

  const ExternalList = styled("div")`
    display: flex;
    margin-bottom: 20px;
    :last-child {
      margin-bottom: 0px;
    }
    h3 {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      ${textWhiteColor}
      width: 200px;
    }
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      ${textWhiteColor}
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 50%;
      span {
        ${textWhiteColor}
      }
    }
  `;
  const AccordionWrapper = {
    boxShadow: "none",
    mb: "0px !important",
    borderRadius: "0px",
    background: "transparent",
    // background: "#ff0000",
    borderTopLeftRadius: "0px !important",
    borderTopRightRadius: "0px !important",
    borderBottomLeftRadius: "0px !important",
    borderBottomRightRadius: "0px !important",
    "&.Mui-expanded": { pb: "10px !important" },
    "&::before": { content: "none" },
  };

  const CryptoPunksSocialWrapper = {
    mt: "15px",
    display: "flex",
    alignItems: "center",
    "& > svg": {
      fill: "#0cf5fe",
      width: "45px",
      height: "45px",
      border: "1px solid #ffffff",
      borderRadius: "50px",
      p: "10px",
      mr: "10px",
    },
    "& button": { ml: "15px", "& svg": { ml: "0" } },
  };

  const DecPara = { fontSize: "16px", fontWeight: "300" };
  const ExternalLinks = linkObj.map((item, ind) => {
    return (
      <ExternalList key={ind}>
        <h3>{item.title}:</h3>

        <p title={item.subtitle}>
          {ind === 0 ? (
            <TokenAddress address={item.subtitle} protocol={protocol} />
          ) : (
            <>{item.subtitle}</>
          )}
        </p>
      </ExternalList>
    );
  });

  const MetadataSection = () => {
    return (
      <Grid item xs={12} md={6}>
        {traits && traits[0] && (
          <Box sx={PropertiesWrapper}>
            <DetailsInnerWrapper>
              <Accordion defaultExpanded sx={AccordionWrapper}>
                <AccordionSummary
                  expandIcon={<ExpandMore sx={[textWhiteColor[0]]} />}
                >
                  <h5>Properties</h5>
                </AccordionSummary>
                <AccordionDetails>
                  {traits.map((el, ind) => {
                    return (
                      <PropertyList key={ind}>
                        <h3>{el.trait_type}:</h3>
                        <p title={el.value}>{el.value}</p>
                      </PropertyList>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            </DetailsInnerWrapper>
          </Box>
        )}

        <DetailsInnerWrapper>
          <Accordion sx={AccordionWrapper}>
            <AccordionSummary
              expandIcon={<ExpandMore sx={[textWhiteColor[0]]} />}
            >
              <h5>Details</h5>
            </AccordionSummary>
            {!nftDetails ? (
              <LoaderWrapper>
                <CircularProgress />
              </LoaderWrapper>
            ) : (
              <>
                <AccordionDetails>{ExternalLinks}</AccordionDetails>
              </>
            )}
          </Accordion>
        </DetailsInnerWrapper>
        <DetailsInnerWrapper>
          <Accordion sx={AccordionWrapper}>
            <AccordionSummary
              expandIcon={<ExpandMore sx={[textWhiteColor[0]]} />}
            >
              <h5>Description</h5>
            </AccordionSummary>
            {!nftDetails ? (
              <LoaderWrapper>
                <CircularProgress />
              </LoaderWrapper>
            ) : (
              <>
                <AccordionDetails>
                  <Typography component={"p"} sx={[DecPara, textWhiteColor[0]]}>
                    {description}
                  </Typography>
                </AccordionDetails>
              </>
            )}
          </Accordion>
        </DetailsInnerWrapper>
      </Grid>
    );
  };

  const onAcceptHandler = async (item) => {
    setOpen(true);
    const obj = {
      id: item._id,
      tokenAddress: item?.signedOrder.erc20Token,
      amount: item?.signedOrder.erc20TokenAmount,
      account: blockchain?.connectedAccountAddress,
      signedOrder: item.signedOrder,
      paymentToken: item.paymentToken,
      nftId: nftDetails._id,
      amountInDecimal: item.amountInDecimal,
      dollarPrice: item.dollarPrice,
      marketplaceId: marketplaceData?._id || null,
      listType: "auction",
      schema_name: schema_name,
    };
    await SwapSdkService.fillOffer(
      obj,
      blockchain,
      onAcceptOffer,
      setProgressState
    );
  };

  const CryptoPunksDec = [
    "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.",
  ];

  const auctionList = offers.map((item, ind) => {
    return (
      <AvatarWrapper key={ind}>
        <Box sx={OffersInnerTableData}>
          {[
            item.price,
            item.dollarPrice,
            item.expireIn,
            item.isYours ? "YOU" : truncate(item.from, 5)?.toUpperCase(),
          ].map((el, ind) => {
            return (
              <Typography key={ind} sx={[textWhiteColor[0]]} component={"p"}>
                {el}
              </Typography>
            );
          })}

          <Box sx={OffersInnerTableDataButton}>
            {isOwner && (
              <BlackButton
                onClick={() => {
                  onAcceptHandler(item);
                }}
              >
                Accept
              </BlackButton>
            )}
            {blockchain.connectedAccountAddress &&
              (isOwner || item.isYours) && (
                <BlackButton onClick={() => onCancelOffer(item._id)}>
                  {isOwner ? "Decline" : "Cancel"}
                </BlackButton>
              )}
          </Box>
        </Box>
      </AvatarWrapper>
    );
  });

  const AuctionTable = () => {
    return (
      <Box sx={OffersLebalTable}>
        {["Price", "USD Price", "Expiration", "From"].map((el, ind) => {
          return (
            <Typography sx={[textWhiteColor[0]]} key={ind} component={"p"}>
              {el}
            </Typography>
          );
        })}
      </Box>
    );
  };

  const transactionList = (transactions || []).map((item) => {
    return (
      <AvatarWrapper key={item.transactionDate}>
        <Box sx={OffersInnerTableData}>
          <Typography
            className="TransactionsInnerData"
            sx={[textWhiteColor[0]]}
            component={"p"}
          >
            {item.event}
          </Typography>
          <Typography
            className="TransactionsInnerData"
            sx={[textWhiteColor[0]]}
            component={"p"}
          >
            {item.event === "Minted"
              ? ""
              : item.amountInDecimal
              ? item.amountInDecimal + " " + item.paymentToken.text
              : "0"}
          </Typography>
          <Typography
            className="TransactionsInnerData"
            sx={[textWhiteColor[0]]}
            component={"p"}
          >
            <AppUsername
              sx={[textWhiteColor[0]]}
              address={
                item.from === blockchain.connectedAccountAddress
                  ? "YOU"
                  : item.from
              }
              protocol={protocol}
            />
          </Typography>
          <Typography
            className="TransactionsInnerData"
            sx={[textWhiteColor[0]]}
            component={"p"}
          >
            <AppUsername
              address={
                item.event === "Sold" &&
                item.to === blockchain.connectedAccountAddress
                  ? "YOU"
                  : item.to
              }
              protocol={protocol}
            />
          </Typography>

          <TransactionColumn>
            {DateUtility.getDistanceInWord(item.transactionDate) + " ago"}
            <TransactionWithChild protocol={protocol} tx={item.transactionHash}>
              <OpenInNewIcon />
            </TransactionWithChild>
          </TransactionColumn>
        </Box>
      </AvatarWrapper>
    );
  });

  const TransactionTable = () => {
    return (
      <Box sx={OffersLebalTable}>
        {["Event", "Price", "From", "To", "Date"].map((el, ind) => {
          return (
            <Typography sx={[textWhiteColor[0]]} key={ind} component={"p"}>
              {el}
            </Typography>
          );
        })}
      </Box>
    );
  };

  return (
    <>
      <NftAuctionSection>
        <Container className="big_desktop_container">
          <Box className="prent_box" sx={flexGrow}>
            <Grid container spacing={2}>
              {<MetadataSection />}
              <Grid item xs={12} md={6}>
                {marketplaceData && marketplaceData.listType === "auction" && (
                  <Box sx={[OffersBoxWrapper, BgBlackColor[0]]}>
                    <Accordion sx={AccordionWrapper}>
                      <AccordionSummary
                        expandIcon={<ExpandMore sx={[textWhiteColor[0]]} />}
                      >
                        <OffersLabelBox>
                          <Typography component={"h4"}>Offers</Typography>
                        </OffersLabelBox>
                      </AccordionSummary>
                      <AccordionDetails>
                        <AuctionTable />
                        {loading ? (
                          <LoaderWrapper>
                            <CircularProgress />
                          </LoaderWrapper>
                        ) : (
                          <>
                            {auctionList.length > 0 ? (
                              <Box sx={OffersInnerDataTableWrapper}>
                                {auctionList}
                              </Box>
                            ) : (
                              <Box>
                                <Typography
                                  sx={
                                    ({ paddingLeft: "10px" },
                                    [textWhiteColor[0]])
                                  }
                                  component={"p"}
                                >
                                  No offers yet.
                                </Typography>
                              </Box>
                            )}
                          </>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                )}
                <br />
                <Box sx={[OffersBoxWrapper, BgBlackColor[0]]}>
                  <Accordion sx={AccordionWrapper}>
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={[textWhiteColor[0]]} />}
                    >
                      <OffersLabelBox>
                        <Typography component={"h4"}>Transactions</Typography>
                      </OffersLabelBox>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TransactionTable />
                      {loading ? (
                        <LoaderWrapper>
                          <CircularProgress />
                        </LoaderWrapper>
                      ) : (
                        <>
                          <Box sx={OffersInnerDataTableWrapper}>
                            {transactionList}
                          </Box>
                        </>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Box>
                <br />
                <DetailsInnerWrapper>
                  <Accordion sx={AccordionWrapper}>
                    <AccordionSummary
                      expandIcon={<ExpandMore sx={[textWhiteColor[0]]} />}
                    >
                      <h5>About CryptoPunks</h5>
                    </AccordionSummary>
                    {!nftDetails ? (
                      <LoaderWrapper>
                        <CircularProgress />
                      </LoaderWrapper>
                    ) : (
                      <>
                        <AccordionDetails>
                          <Typography
                            component={"p"}
                            sx={[DecPara, textWhiteColor[0]]}
                          >
                            {CryptoPunksDec}
                          </Typography>
                          <Box sx={CryptoPunksSocialWrapper}>
                            <LanguageIcon />

                            <Discord />
                            <TwitterIcon />
                            <Etherscan />
                            <RedWhiteButton>
                              <FlagIcon />
                              Report
                            </RedWhiteButton>
                          </Box>
                        </AccordionDetails>
                      </>
                    )}
                  </Accordion>
                </DetailsInnerWrapper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </NftAuctionSection>
      <ConfirmationPopup
        open={open}
        setOpen={setOpen}
        progressState={progressState}
        popupType="acceptOrder"
      />
    </>
  );
};
