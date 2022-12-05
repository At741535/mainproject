import React,{ useEffect,useState } from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Modal,
    LinearProgress,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { OutlineButton } from "../../elements";
import { SwapSdkService } from "../../service/swapsdk"
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%",md: "600px" },
    bgcolor: "background.paper",
    p: { xs: "40px 5px",sm: "35px 50px 35px" },
    borderRadius: "10px",
};

const ContainerStyle = {
    paddingLeft: { sm: "0px" },
    paddingRight: { sm: "0px" },
    position: "relative",

    "& svg": {
        position: "absolute",
        top: { xs: "-16px",sm: "8px" },
        right: { xs: "0",sm: "-14px" },
        fontSize: "30px",
        cursor: "pointer",
    },
};
const flexGrow = {
    flexGrow: 1,
    "& .MuiGrid-container": {
        alignItems: "center",
    },
};
const confirmationProgress = {
    fontSize: "18px",
    fontWeight: "900",
    marginTop: "10px",
    display: "block",
};
const ProgressBar = {
    backgroundColor: "#cecece",
    mt: "5px",

    "& span.MuiLinearProgress-bar": {
        backgroundColor: "#CE1515",
    },
};
const confirmationProgressStatus = {
    fontSize: "25px",
    fontWeight: "900",
};

const Confirmation = ({ close,progressState,setProgressState,nft,marketplaceData,handleAcceptOffer,blockchain }) => {

    const onBuyNft = async () => {
        const obj = {
            // id: marketplaceData._id,
            tokenAddress: marketplaceData?.signedOrder.erc20Token,
            amount: marketplaceData?.signedOrder.erc20TokenAmount,
            account: blockchain?.connectedAccountAddress,
            signedOrder: marketplaceData.signedOrder,
            paymentToken: marketplaceData.signedOrder.erc20Token,
            nftId: nft._id,
            marketplaceId: marketplaceData?._id || null,
            from: marketplaceData.signedOrder.maker,
            listType: "fixed"
        };
        await SwapSdkService.fillOrder(
            obj,
            blockchain,
            handleAcceptOffer,
            setProgressState
        );
    };


    return (
        <Box sx={style}>
            <Container sx={ContainerStyle}>
                {!progressState.progress && (
                    <CancelOutlinedIcon onClick={close} />
                )}
                <Box className="prent_box" sx={flexGrow}>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <Typography sx={confirmationProgressStatus} component={"h3"}>
                                Confirm Your Purchase
                            </Typography>
                            {progressState.progress && (
                                <Typography sx={confirmationProgress} component={"span"}>
                                    {"Please wait for confirmation..."}
                                    <Box>
                                        <LinearProgress sx={ProgressBar} />
                                    </Box>
                                </Typography>
                            )}
                            <Typography sx={confirmationProgressStatus} component={"h3"}>
                                {progressState.success &&
                                    "Transaction Successfull you own this Nft"}
                                {progressState.failed && "Transaction failed"}
                            </Typography>
                            {!(progressState.failed || progressState.progress || progressState.success) &&
                                <Box sx={{ textAlign: "center",mt: "10px" }} >
                                    <OutlineButton
                                        onClick={() => {
                                            onBuyNft()
                                        }}
                                    >
                                        Confirm
                                    </OutlineButton>
                                </Box>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export const FixedPriceBuyPopUp = (props) => {
    const { close,open } = props;
    const popupState = {
        progress: false,
        success: false,
        failed: false,
    };
    const [progressState,setProgressState] = useState(popupState);
    useEffect(() => {
        if (open) {
            setProgressState({ ...popupState })
        }
    },[open])
    return (
        <>
            <Modal
                open={open}
                onClose={() => !progressState.progress && close()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Confirmation {...props} progressState={progressState} setProgressState={setProgressState} />
            </Modal>
        </>
    );
};