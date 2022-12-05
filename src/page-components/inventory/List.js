import React from "react";
import {
    styled,
    Card,
    CardContent,
    Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageWithFallback } from "../../components";

const CardMediaWrapper = styled("div")`
  .card_img_style {
    overflow: hidden;
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
const NftCardLink = {
    height: "100%",
    display: "block",
};
const ContentWrapper = {
    paddingTop: "15px",
    paddingBottom: "16px !important",
    background: "#000000",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h3": {
        fontSize: "22px",
        fontWeight: "900",
        color: "#ffffff",
        mb: "10px",
        fontFamily: "ProximaNova !important",
        margin: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "40%",
        textAlign: "right",
    },
    "& p": {
        color: "#ffffff",
        fontWeight: "600",
        fontSize: "16px",
        fontFamily: "ProximaNova !important"
    },
};

export const InventoryList = ({ cardStyleProps,nftData }) => {
    const { protocol } = useSelector((state) => state?.blockchain);

    return (
        <>
            <NavLink
                to={`/detail/${nftData.protocol || protocol}/${nftData?.asset_contract?.address}/${nftData.token_id}`}
                style={NftCardLink}
            >
                <Card sx={cardStyleProps.borderStyle}>
                    
                    <CardMediaWrapper>
                        <Box
                            className="card_img_style"
                        >
                            <ImageWithFallback
                                src={nftData?.image_preview_url}
                                alt="NFT"
                            />
                        </Box>
                    </CardMediaWrapper>

                    <CardContent sx={ContentWrapper}>
                        {/* <Typography component={"h3"}>{nftData.name}</Typography> */}
                        <p>Protocol: {nftData.protocol}</p>
                        <h3># {nftData.token_id}</h3>
                    </CardContent>
                </Card>
            </NavLink>
        </>
    );
};