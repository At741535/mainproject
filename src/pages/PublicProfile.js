import React,{ useMemo } from "react";
import { useParams } from "react-router-dom";
import { Grid,Box,Container,Typography,styled,CircularProgress } from "@mui/material";
import { InventoryList } from "../page-components/inventory";
import { InventoryNft } from "../hooks";
import { ContractUtility } from "../common";
import { DocumentTitle } from "../components";

const cardStyleProps = {
    borderStyle: {
        padding: "14px",
        overflow: "hidden",
        boxShadow: "none",
        background: "#ffffff",
        height: "100%",
        borderRadius: "12px",
    },
    titleStyle: {
        margin: 0,
        fontSize: "13px",
        fontWeight: 900,
    },
    statusStyle: {
        fontSize: { xs: "16px",lg: "18px" },
        fontWeight: 900,
    },
    labelStyle: {
        color: "#101010",
        fontWeight: 600,
        fontSize: "13px",
    },
};

const ContainerStyle = {
    mb: "20px",
};
const flexGrow = {
    flexGrow: 1,
};
const NftNotFound = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: {
        xs: "30vh",
        md: "60vh",
        lg: "90vh",
    },
};

const inventoryTitle = {
    "& h2": {
        color: "#000",
        fontWeight: "900",
        fontSize: "38px",
        pt: "30px",
        pb: "30px"
    },
}

const LoaderWrapper = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;

  svg {
    color: #000000;
  }
`;

export const PublicProfile = () => {
    const { address } = useParams();
    const { userAllNFT,loading } = InventoryNft(address,ContractUtility.getCurrentNetwork());

    return (
        <Container sx={ContainerStyle} className="big_desktop_container">
            <DocumentTitle title="User Profile - NFT Auctions" />

            <Box sx={flexGrow}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box sx={inventoryTitle} >
                            <Typography component={"h2"}>Profile</Typography>
                        </Box>
                    </Grid>
                </Grid>

                {!loading ? <Grid container spacing={2}>
                    {userAllNFT.map((el,ind) => {
                        return (
                            <Grid item xs={12} sm={6} md={3} key={ind}>
                                <InventoryList
                                    nftData={el}
                                    cardStyleProps={cardStyleProps}
                                />
                            </Grid>
                        );
                    })}
                    {userAllNFT.length === 0 && (
                        <Grid item xs={12}>
                            <Box sx={NftNotFound}>
                                <Typography variant={"h4"}>No NFTs Found!</Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid> : <LoaderWrapper>
                    <CircularProgress />
                </LoaderWrapper>}
            </Box>
        </Container>
    );
};


