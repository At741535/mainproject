import React from "react";
import { Box,Typography } from "@mui/material";
import Account from "./Account";
import { ModalCloseBtn } from "./popup/ModalClose";

const WalletConnectModal = ({ networkHandler }) => {
  const style = {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "0px",

    "& #modal-modal-title": {
      fontWeight: 800,
      fontSize: "22px",
      lineHeight: "28px",
      m: "25px",
      textAlign: "center",
      fontFamily: "PowerGrotesk !important"
    },
  };
  
  const AccountWrapper = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  };

  const clickHandler = () => {
    networkHandler();
  };
  const ConnectWalletWrapper = {
    p: "65px 4px",
    position: "relative",
  };

  return (
    <Box sx={style}>
      <Box sx={ConnectWalletWrapper}>
        <ModalCloseBtn onClick={clickHandler} />
        <Typography id="modal-modal-title" component="h2">
          Please Connect Your <br /> Wallet.
        </Typography>
        <Box sx={AccountWrapper} onClick={clickHandler}>
          <Account />
        </Box>
      </Box>
    </Box>
  );
};

export default WalletConnectModal;
