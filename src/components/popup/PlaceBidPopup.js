import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  styled,
  Box,
  Typography,
  Container,
  Grid,
  Modal,
  TextField,
  LinearProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { DateUtility } from "../../common";
import { SwapSdkService } from "../../service/swapsdk";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import fromExponential from "from-exponential";
import { BlackButton } from "../../elements";
import Web3 from "web3";
import { ERC20Service } from "../../service";
import { CommonUtility, ContractUtility } from "../../common";
import { ModalCloseBtn } from "./ModalClose";
import { ModalTitle } from "./ModalTitle";
import { FontProximaNova, FontProximaNovaLight } from "../GlobelColor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: "670px" },
  bgcolor: "background.paper",
  p: { xs: "63px 56px 40px 56px", sm: "63px 56px 40px 56px" },
  borderRadius: "0px",
};

const PriceBoxWrapper = styled("div")`
  margin-top: 30px;
  h3 {
    color: #000000;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 25px;
    margin-top: 10px;
  }
  h4 {
    color: #000000;
    text-align: left;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0px;
  

    span {
     
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      color: #000000;
      .currency {
        text-transform: uppercase;
      }
    }
  }
  .input_style {
    width: 100%;
    input {
      border: none;
      border-radius: 12px;
      color: #101010;
      padding: 12px 18px 12px 18px;
      font-weight: 600;
      background-color: #e5e8eb;
      text-align: center;
    }
    fieldset {
      border: none;
    }
  }
`;

const ContainerStyle = {
  paddingLeft: { sm: "0px" },
  paddingRight: { sm: "0px" },
  position: "relative",

  "& > svg": {
    position: "absolute",
    top: { xs: "-16px", sm: "8px" },
    right: { xs: "0", sm: "-14px" },
    fontSize: "30px",
    color: "#CE1515",
    cursor: "pointer",
  },
};
const flexGrow = {
  flexGrow: 1,
  "& .MuiGrid-container": {
    alignItems: "center",
  },
};
const InputStyle = {
  marginTop: "8px",
  display: "flex",
  alignItems: "start",
  justifyContent: "space-between",

  "& .placebit_icon_with_text": {
    display: "flex",
    alignItems: "center",

    "& img": {
      width: "30px",
      marginRight: "10px",
    },
    "& span": {
      fontSize: "28px",
      fontWeight: "700",
    },
  },
  "& .placebit_input": {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
  },
  "& span": {
    textTransform: "uppercase",
    padding: "0px 20px",
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: "18px",
    letterSpacing: "0.1em",
    color: "rgba(0, 0, 0, 0.6)",
  },
  "& .input_style": {
    "& input": {
      border: "1px solid #000000 !important",
      backgroundColor: "transparent",
      borderRadius: "0px",
    },
    "& > p": {
      color: "#ff0000",
      fontSize: "9px",
      mr: "0",
      ml: "0 !important",
    },
  },
  "& .brownBTN": {
    margin: "0 !important",
  },
};

const CompleteList = {
  mt: "28px",
};
const confirmationProgress = {
  fontSize: "18px",
  fontWeight: "700",
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

const PlaceBidPoPup = ({
  onOfferCreate,
  paymentToken,
  expiry,
  // tokenAddress,
  tokenId,
  setOpen,
  open,
  Nftprice,
  currentBid,
  marketplace_id,
  protocol,
  saleOverCountDown,
  nft,
}) => {
  const {
    asset_contract: { address: tokenAddress, schema_name },
  } = nft;
  const blockchain = useSelector((state) => state?.blockchain);
  const [balance, setBalance] = useState();
  const [tcChecked, setTCChecked] = useState(false);

  const popupState = {
    progress: false,
    success: false,
    failed: false,
  };
  const [progressState, setProgressState] = useState(popupState);

  useEffect(() => {
    (async () => {
      if (blockchain.connectedAccountAddress) {
        const paymentTokenObj = ContractUtility.getPaymentToken(
          paymentToken,
          protocol
        );
        let balance = await ERC20Service.getTokenBalance(
          Web3,
          paymentTokenObj.address,
          blockchain.connectedAccountAddress
        );
        setBalance(balance);
      }
    })();
  }, []);

  const handleCreateOrder = async (item) => {
    const expiryTime = Math.floor(
      expiry / 1000 + DateUtility.convertDaysToSeconds(3)
    );
    const orderDataObj = {
      tokenAddress,
      tokenId,
      paymentToken,
      price: fromExponential(item.price),
      protocol,
      expiryTime,
      marketplace_id,
      schema_name,
    };
    await SwapSdkService.createOffer(
      orderDataObj,
      blockchain,
      onOfferCreate,
      setProgressState
    );
  };

  const nextBid = useMemo(
    () => (((currentBid?.currentBid || 0) * 105) / 100).toFixed(4),
    [currentBid?.currentBid]
  );

  const initialValues = {
    price: currentBid ? nextBid : Nftprice,
  };

  const validationSchema = Yup.object().shape({
    price: Yup.number()
      .required("The Amount is required!")
      .test(
        "Is positive?",
        `The Amount must be greater than ${currentBid ? nextBid : Nftprice}`,
        (value) => value >= (currentBid ? nextBid : Nftprice)
      )
      .test(
        "Have enough Balance?",
        `*Balance: ${CommonUtility.roundNumber(
          balance
        )}, You don't have enough balance`,
        (value) => value <= balance
      ),
  });

  const tokenInfo = useMemo(
    () => ContractUtility.getPaymentToken(paymentToken, protocol),
    [paymentToken, protocol]
  );

  return (
    <Box sx={style}>
      <ModalCloseBtn onClick={() => setOpen({ ...open, placeBid: false })} />
      <ModalTitle title={"Place A Bid"} />
      <Container sx={ContainerStyle}>
        <Box className="prent_box" sx={flexGrow}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Formik
                initialValues={initialValues}
                onSubmit={handleCreateOrder}
                validationSchema={validationSchema}
              >
                {() => (
                  <Form>
                    <PriceBoxWrapper>
                      <Box>
                        <Typography component={"h4"}>
                          Offer Amount{" "}
                          <span>
                            (Minimum bidding amount is{" "}
                            {currentBid ? nextBid : Nftprice}{" "}
                            <span className="currency">
                              {tokenInfo?.symbol})
                            </span>
                          </span>
                        </Typography>
                      </Box>

                      <Box sx={InputStyle}>
                        <Box className="placebit_input">
                          <Field
                            as={TextField}
                            className="input_style"
                            type="number"
                            placeholder="0.01"
                            name="price"
                            helperText={<ErrorMessage name="price" />}
                          />
                          <Typography component={"span"}>
                            {tokenInfo?.symbol}
                          </Typography>
                        </Box>
                        {!progressState.progress && (
                          <BlackButton
                            type="submit"
                            SX={CompleteList}
                            disabled={!tcChecked || saleOverCountDown}
                          >
                            Place a bid
                          </BlackButton>
                        )}
                      </Box>

                      <Box>
                        <FormControlLabel
                          control={<Checkbox color="secondary" />}
                          checked={tcChecked}
                          onClick={() => setTCChecked(!tcChecked)}
                          label={
                            <span>
                              I agree to the{" "}
                              <a
                                href="https://m1563.com/terms-of-service"
                                target="_blank"
                                rel="noreferrer"
                              >
                                Terms of Service & Privacy Policy
                              </a>
                            </span>
                          }
                        />
                      </Box>

                      {progressState.progress && (
                        <Typography
                          sx={confirmationProgress}
                          component={"span"}
                        >
                          {"Please wait for confirmation..."}
                          <Box>
                            <LinearProgress sx={ProgressBar} />
                          </Box>
                        </Typography>
                      )}
                    </PriceBoxWrapper>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export const PlaceBidPopup = (props) => {
  const { setOpen, open } = props;
  return (
    <>
      <Modal
        open={open.placeBid}
        onClose={() => setOpen({ ...open, placeBid: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PlaceBidPoPup {...props} />
      </Modal>
    </>
  );
};
