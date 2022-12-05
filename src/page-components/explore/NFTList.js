import React,{ useMemo } from "react";
import {
  styled,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { CardCountDown,ImageWithFallback } from "../../components";
import { weiToCurrency,ContractUtility } from "../../common";

const CardMediaWrapper = styled("div")`
  .card_img_style {
    overflow: hidden;
    border-radius: 0px;
    // @media (min-width: 0px) {
    //   height: 425px;
    // }
    // @media (min-width: 1200px) {
    //   height: 280px;
    // }
    // @media screen and (min-width: 1920px) {
    //   height: 400px;
    // }
    img {
      height: 300px;
      display: block;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      width: 100%;
      object-fit: cover;
    }
  }
`;
const iconStyle = {
  width: "30px",
};
const NftCardLink = {
  height: "100%",
  display: "block",
};
const ContentWrapper = {
  backgroundColor: "black",
  "& .card_data_wrapper": {
    display: "flex",
    justifyContent: "space-between",
  },

  "& h3": {
    fontSize: "18px",
    fontWeight: "700",
    color: "#ffffff",
    mb: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& p": {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    color: "#ffffff",
    fontWeight: "400",
    fontSize: "14px",
    "&:last-child": {
      alignItems: "end",
    },
    "& span": {
      color: "#ffffff",
      fontWeight: "700",
      fontSize: "15px",
      textTransform: "uppercase"
    },
  },
};

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export const ListedNftCards = ({ cardStyleProps,nftData }) => {
  const { creatorAddress,listedNFT,signedOrder,offer_price,listType } = nftData || {};
  const [nft] = (nftData && listedNFT) || [];
  const { image,name,token_id,token_address,protocol } = nft || {};

  const Nftprice = useMemo(() => {
    if (signedOrder) {
      return weiToCurrency(null,offer_price);
    }
  },[signedOrder]);

  const tokenInfo = useMemo(() => ContractUtility.getPaymentToken(signedOrder?.erc20Token,protocol),[signedOrder,protocol])

  return (
    <>
      <NavLink
        to={`/detail/${protocol}/${token_address}/${token_id}`}
        style={NftCardLink}
      >
        <Card sx={cardStyleProps.borderStyle} onClick={scrollTop}>
          <CardMediaWrapper>
            <Box className="card_img_style">
              {/* <CardMedia
                component="img"
                image={image ? image : nft1}
                alt="NFT"
              /> */}
              <ImageWithFallback
                src={image}
                alt="NFT"
              />
            </Box>
          </CardMediaWrapper>
          <CardContent sx={ContentWrapper}>
            <Box>
              <Typography component={"h3"}>
                {name ? name : "NFT Name"}

                <Typography
                  sx={iconStyle}
                  component={"img"}
                  src={tokenInfo?.icon}
                />
              </Typography>
              <Box className="card_data_wrapper">
                <Typography component={"p"}>
                  {listType === "auction" ? "Current Bid" : "Sale Price"}
                  {" "}
                  <Typography component={"span"}>
                    {(Nftprice || 0).noExponents()} {""}
                    {""}
                    {signedOrder && tokenInfo?.symbol}
                  </Typography>
                </Typography>
                <Typography component={"p"}>
                  Time Remaining
                  <Typography component={"span"}>
                    <CardCountDown expiryTime={+signedOrder.expiry} />
                    {/* Ends In {expireIn} Days */}
                  </Typography>
                </Typography>
              </Box>

              {/* Hide it for now - Start */}
              {false && creatorAddress && <Box className="card_data_wrapper">
                <Typography component={"p"}>
                  Current Address
                  <Typography component={"span"}>
                    {creatorAddress}
                  </Typography>
                </Typography>
              </Box>}
              {/* Hide it for now - End */}

            </Box>
          </CardContent>
        </Card>
      </NavLink>
    </>
  );
};
