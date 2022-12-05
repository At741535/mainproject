import React from "react";
import { Box,Modal } from "@mui/material";
import { BlackButton } from "../elements";
import { Connectors } from "../common";
import { ModalCloseBtn } from "./popup/ModalClose";
import { ModalTitle } from "./popup/ModalTitle";

const style = {
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 460,
  bgcolor: "background.paper",
  boxShadow: 24,

  borderRadius: "0px",
};

const WalletConnectWrapper = {
  p: "65px 60px",
  position: "relative",
};


const BtnWrapper = {
  textAlign: "center",
  "& button": {
    width: "100%",
    marginTop: "20px",
    fontWeight: "600 !important",
    minWidth: "250px",
  },
};
const Walletconnect = ({ closeWalletConnect,connectWalletWeb3React }) => {

  return (
    <Box sx={style}>
      <Box sx={WalletConnectWrapper}>
        <ModalCloseBtn onClick={closeWalletConnect} />
        <ModalTitle title="Connect Wallet" />
        <Box sx={BtnWrapper}>
          {Connectors.map((item) => {
            return (
              <BlackButton
                key={item.name}
                onClick={() => {
                  connectWalletWeb3React(item);
                }}
              >
                Connect {item.name}
              </BlackButton>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

const WalletConnect = (props) => {
  const { openConnectWallet,closeWalletConnect } = props;
  return (
    <>
      <Modal open={openConnectWallet} onClose={closeWalletConnect}>
        <Walletconnect {...props} />
      </Modal>
    </>
  );
};

export default WalletConnect;
