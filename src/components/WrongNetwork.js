import React,{ useEffect,useState } from "react";
import { Box,Typography } from "@mui/material";
import { BlackButton } from "../elements";
import { CommonConstant,ContractUtility } from "../common";
import { ModalCloseBtn } from "./popup/ModalClose";

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
    fontWeight: "800",
    fontSize: "25px",
    lineHeight: "38px",
    m: "25px",
    textAlign: "center",
    mt: "5px",
  },
};
const InnerContent = {
  p: 4,
  pb: 5,
  position: "relative",
};

const BtnWrapper = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};
const WrongNetwork = ({ disconnectWallet }) => {
  const [networkName,setNetworkName] = useState('temp');

  const clickHandler = () => {
    disconnectWallet();
  };

  useEffect(() => {
    CommonConstant.isDevelopment ? setNetworkName("Polygon Mumbai") : setNetworkName("Ethereum");
  },[]);

  const handleChange = async () => {
    await ContractUtility.changeNetwork(ContractUtility.getCurrentNetwork());
  };

  return (
    <Box sx={style}>
      <Box sx={InnerContent}>
        <ModalCloseBtn onClick={clickHandler} />
        <Typography id="modal-modal-title" variant="h4" component="h2">
          Switch Your Network to {networkName}
        </Typography>
        <Box sx={BtnWrapper}>
          <BlackButton onClick={handleChange}>change Network</BlackButton>
        </Box>
      </Box>
    </Box>
  );
};

export default WrongNetwork;
