import React, { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
  styled,
  MenuItem,
  FormControl,
  Select,
  LinearProgress,
  Checkbox,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { SwapSdkService, MarketplaceService } from "../../service";
import { OutlineButton } from "../../elements";
import { GetMarketplaceTokensHook } from "../../hooks";
import { CommonUtility, DateUtility, CommonConstant } from "../../common";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import fromExponential from "from-exponential";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ModalCloseBtn } from "./ModalClose";
import { ModalTitle } from "./ModalTitle";
import { FontProximaNova } from "../GlobelColor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: "600px" },
  bgcolor: "background.paper",
  p: {
    xs: "0px 0px",
    sm: "0px 0px 0px",
  },
  borderRadius: "0px",
};

const PriceBoxWrapper = styled("div")`
  .input_style {
    width: 100%;
    // input {
    //   border: none;
    //   border-radius: 12px;
    //   color: #101010;
    //   padding: 12px 18px 12px 0px;
    //   font-weight: 400;
    // }
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

const TokenWrapper = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: "20px",
  "& > .MuiInputBase-formControl": { width: { xs: "100%", sm: "50%" } },
  "& #demo-simple-select": {
    p: "14px 32px 14px 14px",
  },
  "& fieldset": {
    border: "1px solid #000000 !important",
    backgroundColor: "transparent",
    borderRadius: "0px",
    zIndex: "-1",
  },
  "& label": {
    color: "#101010 !important",
    fontWeight: "400 !important",
    transform: "translate(12px, -9px) scale(0.75)",
  },
};

const StartingPriceInputWrapper = {
  display: "flex",
  alignItems: "center",
  width: "50%",
  "& input": {
    border: "1px solid #000000 !important",
    backgroundColor: "transparent",
    borderRadius: "0px",
    padding: "14px 14px",
  },
  "& .input_style": {
    "& > p": {
      position: "absolute",
      bottom: "-18px",
      left: "3px",
      marginLeft: "0",
      color: "#ff0000",
      fontSize: "10px",
    },
  },

  "& .img_wrapper": {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "400",

    "& img": {
      width: "30px",
      height: "30px",
    },
  },
};

const DurationWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mt: "25px",

  "& .DurationLabel": {
    display: "flex",
    alignItems: "center",
    fontSize: "25px",
    fontWeight: "700",
    mb: "5px",
  },
  "& .DurationInputWrapper": {
    border: "1px solid #000000 !important",
    backgroundColor: "white",
    borderRadius: "0px",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    width: "50%",
    "& input": {
      backgroundColor: "white",
      borderRadius: "0px",
    },

    "& .input_style": {
      "& > p": {
        position: "absolute",
        bottom: "-18px",
        left: "3px",
        marginLeft: "0",
        color: "#ff0000",
        fontSize: "10px",
      },
    },

    "& > span": {
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
      fontWeight: "400",
    },
  },
};

const ReservePriceWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mt: "25px",

  "& .ReservePriceLabel": {
    display: "flex",
    alignItems: "center",
    fontSize: "25px",
    fontWeight: "700",
    mb: "5px",
  },
  "& .ReservePriceInputWrapper": {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "50%",
    "& input": {
      backgroundColor: "#EAEAEA",
      borderRadius: "10px",
      p: "14px 14px",
    },
    "& > span": {
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
      fontWeight: "400",

      "& > label": {
        mr: "0",
        ml: "0",
      },
    },
  },
};

const CompleteListingBtnWrapper = {
  textAlign: "center",

  "& button": {
    mt: "15px",
  },
};

const IOSSwitch = styled((props) => (
  <Field
    as={Switch}
    name="isreversePrice"
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  marginRight: "0 !important",
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#CE1515",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 16,
    height: 16,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

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

const StartingPriceWrapper = {
  display: "flex",
  justifyContent: "space-between",
  mt: "25px",
};

const errMsgeObj = {
  color: "red",
  fontSize: "10px",
};

const DatePickerStyle = {
  "& .DatePickerInputStyle": {
    backgroundColor: "#ffffff",
    borderRadius: "0px",
  },
  "& fieldset": {
    display: "none !important",
  },
};

const Wrapper = styled("div")`
  padding: 56px;
`;

const FormLabel = styled("span")`
  display: flex;
  align-items: center;
  
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  color: #000000;
  img {
    height: 23px;
  }
`;

const SellPoPup = ({
  setOpen,
  open,
  renderedNft: nft,
  handleCreateOrder: createNewOrder,
  marketplaceData,
}) => {
  const blockchain = useSelector((state) => state?.blockchain);
  const params = useParams();
  const isAuction = true;
  const [searchParams] = useSearchParams();
  const reserveBuyer = searchParams.get("reserve-buyer");
  const offerId = searchParams.get("offer-id");
  const { web3 } = blockchain;
  const {
    asset_contract: { address: tokenAddress, schema_name },
    token_id: tokenId,
    protocol,
  } = nft;
  const { data: tokenList } = GetMarketplaceTokensHook(params?.protocol);
  const paymentTokenList = useMemo(
    () =>
      (tokenList || []).map((item) => ({
        value: item.address,
        text: item.text,
        logo: item.icon,
      })),
    [tokenList]
  );

  const [tokenContract, setTokenContract] = useState("");
  const popupState = {
    progress: false,
    success: false,
    failed: false,
  };
  const [progressState, setProgressState] = useState(popupState);
  const [tcChecked, setTCChecked] = useState(false);

  const initialValues = {
    amount: "",
    duration: new Date().setDate(new Date().getDate() + 30),
    reversePrice: "",
    isreversePrice: false,
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("The price is required!")
      .test(
        "Is positive?",
        "The price must be greater than 0!",
        (value) => value > 0
      ),
    duration: Yup.mixed()
      .required("The Duration is required!")
      .test(
        "isValid duration",
        "Can not Select any date before today",
        (value) => {
          return (
            DateUtility.convertDateToUnix(value) * 1000 >
            DateUtility.convertDateToUnix(new Date()) * 1000
          );
        }
      )
      .test("isValidMint", "Duration gap should be minimum 15 min", (value) => {
        let newDate = DateUtility.convertDateToUnix(value) * 1000;
        let currentDate = new Date();
        let diff = Math.abs(new Date(newDate) - new Date(currentDate));
        let minutesDiff = Math.floor(diff / 1000 / 60);
        return minutesDiff >= 15;
      }),

    reversePrice: Yup.number().when("isreversePrice", {
      is: true,
      then: Yup.number()
        .required("The reverse price is required")
        .test(
          "Is validPrice",
          "Reserve price must be greater than starting price",
          (value, parentData) => {
            const { amount } = parentData.parent || {};
            return amount && value >= amount;
          }
        ),
    }),
  });

  const paymentTokenArr = useMemo(
    () => (paymentTokenList || []).find((item) => item.value === tokenContract),
    [tokenContract]
  );

  useEffect(() => {
    if (paymentTokenList && paymentTokenList[0] && paymentTokenList[0].value) {
      setTokenContract(paymentTokenList[0].value);
    }
  }, [paymentTokenList]);

  const decimals = useMemo(
    () => (tokenList || []).find((x) => x.address === tokenContract)?.decimals,
    [tokenList, tokenContract]
  );

  const handleCreateOrder = async (values, props) => {
    try {
      const paymentToken = (tokenList || []).find(
        (x) => x.address === tokenContract
      );

      const weiSymb = CommonUtility.toWei(decimals.toString());
      //setSwitchNetwork('')
      //setErrorMessage('')
      //setTransactionLoading(true)
      //const { tokenAddress, tokenId } = params
      const TAKER_ASSET = {
        tokenAddress: paymentToken.address,
        amount: web3.utils.toWei(
          fromExponential(values.amount).toLocaleString("fullwide", {
            useGrouping: false,
          }),
          weiSymb
        ),
        type: "ERC20",
      };
      const MAKER_ASSET = {
        tokenAddress,
        tokenId,
        type: schema_name,
        amount: "1",
      };
      /*const usdPrice = await TokenService.price({
          symbol: paymentToken.symbol,
          amount: 1,
      })*/
      const nftObj = {
        name: nft?.name,
        description: nft?.description,

        image: nft?.image_preview_url,
        attributes: nft?.traits,
        token_standard: schema_name,
        token_address: tokenAddress,
        token_id: tokenId,
        protocol: protocol,
        collectionName: nft?.asset_contract?.name || " ",
      };
      const transaction = {
        from: blockchain.connectedAccountAddress,
        to: nft?.asset_contract?.address,
        transactionHash: CommonConstant.nullTx,
        amount: (values.amount * 10 ** decimals).toFixed(0),
        blockNumber: 0,
        // paymentToken: formData.paymentToken,
        usdPrice: 1234,
      };

      const obj = {
        walletAddress: blockchain.connectedAccountAddress,
        creatorAddress: nft?.creator?.address || "",
        contractAddress: params?.tokenAddress,
        tokenId,
        offer_price: web3.utils.toWei(
          fromExponential(values.amount).toLocaleString("fullwide", {
            useGrouping: false,
          }),
          weiSymb
        ),
        sold: false,
        paymentToken: paymentToken.address,
        nft: nftObj,
        transaction,
        protocol: params?.protocol,
        reserved: reserveBuyer && true,
        TAKER_ASSET,
        MAKER_ASSET,
        offerId,
        reserveBuyer,
        // expiry: new Date().setDate(new Date().getDate() + values.duration),
        expiry: DateUtility.convertDateToUnix(values.duration) * 1000,
        isAuction,
        isReserved: marketplaceData?.reserved,
        marketplace: marketplaceData?._id,
        auctionType: isAuction && "highest",
        isActive: true,
        listType: "auction",
      };

      if (marketplaceData && !reserveBuyer) {
        const preListedObj = {
          marketplace: marketplaceData?._id,
          nft: marketplaceData?.nft,
          transactionHash: CommonConstant.nullTx,
          from: blockchain.connectedAccountAddress,
          to: marketplaceData?.contractAddress,
          amount: 0,
          blockNumber: 0,
          event: "Canceled",
        };
        await MarketplaceService.cancelListing(preListedObj);
      }
      await SwapSdkService.createOrder(
        obj,
        blockchain,
        createNewOrder,
        setProgressState
      );

      setOpen({ ...open, sell: false });

      //setCongratulationModal(true)
    } catch (error) {
      console.log("error", error);
      if (typeof error === "string") {
        //setErrorMessage(error)
      } else {
        //setErrorMessage(error?.message || ErrorConstant.default)
      }
    } finally {
      //setTransactionLoading(false)
      //refreshData()
    }
  };

  return (
    <Box sx={style}>
      <Container sx={ContainerStyle}>
        {/* <CancelOutlinedIcon onClick={() => setOpen({ ...open,sell: false })} /> */}
        <ModalCloseBtn onClick={() => setOpen({ ...open, sell: false })} />

        <Wrapper>
          <ModalTitle title="List An Item" />
          <Box className="prent_box" sx={flexGrow}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleCreateOrder}
                  validationSchema={validationSchema}
                >
                  {(props) => (
                    <Form>
                      <PriceBoxWrapper>
                        <Box className="PriceBoxWrapperStyle">
                          <FormControl sx={TokenWrapper} fullWidth>
                            <FormLabel>Token</FormLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={tokenContract}
                              onChange={({ target: { value } }) => {
                                value && setTokenContract(value);
                              }}
                            >
                              {paymentTokenList.map((token, ind) => {
                                return (
                                  <MenuItem value={token.value} key={ind}>
                                    {token.text}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>

                          <Box sx={StartingPriceWrapper}>
                            <FormLabel>
                              Starting Price
                              <Typography
                                component={"img"}
                                alt=""
                                src={paymentTokenArr?.logo}
                              />
                            </FormLabel>
                            <Box sx={StartingPriceInputWrapper}>
                              <Field
                                as={TextField}
                                className="input_style"
                                type="number"
                                placeholder="Enter Amount"
                                name="amount"
                                helperText={<ErrorMessage name="amount" />}
                              />
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={DurationWrapper}>
                          <FormLabel>Duration</FormLabel>
                          <Box className="DurationInputWrapper">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Stack sx={DatePickerStyle} spacing={3}>
                                <Field
                                  as={DateTimePicker}
                                  inputFormat="DD-MM-YYYY HH:mm a"
                                  value={props.values.duration}
                                  onChange={(value) =>
                                    props.setFieldValue("duration", value)
                                  }
                                  renderInput={(params) => (
                                    <TextField {...params} />
                                  )}
                                  name="duration"
                                  className="DatePickerInputStyle"
                                />
                              </Stack>
                            </LocalizationProvider>
                            <Box sx={errMsgeObj}>
                              {" "}
                              <ErrorMessage name="duration" />{" "}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={ReservePriceWrapper}>
                          <FormLabel>Reserve Price</FormLabel>

                          <Box className="ReservePriceInputWrapper">
                            {props.values.isreversePrice && (
                              <Field
                                as={TextField}
                                className="input_style"
                                type="number"
                                placeholder="Enter ammount"
                                name="reversePrice"
                                helperText={
                                  <Box sx={errMsgeObj}>
                                    <ErrorMessage name="reversePrice" />
                                  </Box>
                                }
                              />
                            )}
                            <Typography component={"span"}>
                              <FormControlLabel
                                control={
                                  <IOSSwitch
                                    isreversePrice="isreversePrice"
                                    sx={{ m: 1 }}
                                  />
                                }
                              />
                            </Typography>
                          </Box>
                        </Box>

                        <Typography
                          component={"p"}
                          sx={{
                            marginTop: "10px",
                            fontSize: "14px",
                            fontFamily: "ProximaNovaLight",
                          }}
                        >
                          <Typography component={"span"}> 2.5 % </Typography>{" "}
                          Marketplace Fee will be deducted from your receiving
                          Amount{" "}
                        </Typography>
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

                        {progressState.progress ? (
                          <Typography
                            sx={confirmationProgress}
                            component={"span"}
                          >
                            {"Please wait for confirmation..."}
                            <Box>
                              <LinearProgress sx={ProgressBar} />
                            </Box>
                          </Typography>
                        ) : (
                          <Box sx={CompleteListingBtnWrapper}>
                            <OutlineButton disabled={!tcChecked}>
                              complete listing
                            </OutlineButton>
                          </Box>
                        )}
                      </PriceBoxWrapper>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Box>
        </Wrapper>
      </Container>
    </Box>
  );
};

export const SellPopup = (props) => {
  const { setOpen, open } = props;
  return (
    <>
      <Modal
        open={open.sell}
        onClose={() => setOpen({ ...open, sell: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SellPoPup {...props} />
      </Modal>
    </>
  );
};
