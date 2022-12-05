import {
  Box,
  styled,
  Input,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  CircularProgress,
} from "@mui/material";
import { OutlineButton } from "../../elements";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TokenAddress } from "../../common";
import { ExpandMore } from "@mui/icons-material";
import { FontMontserrat } from "../../components/GlobelColor";
import { Fragment } from "react";
import SideBarImage from "../../images/artist2.png";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Link } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import { textWhiteColor } from "../../components/GlobelColor";

const FilterPriceLabel = styled("h5")`
  font-size: 18px;
  font-weight: 600;
  ${textWhiteColor}
`;
// const OutlineButton = styled("div")`
//   border: 1px solid black;
//   width: "100%";
//   fontweight: "600 !important";

//   background: #fff;
//   padding: 20px;
//   border-radius: 50px;
//   margin: 20px 0;
// `;
const AccordionStatusPriceButton = {
  background: "transparent",
};
const PriceInput = {
  fontSize: "15px",
  border: "2px solid #E5E8EB",
  borderRadius: "5px",
  padding: "5px 18px 5px",

  backgroundImage:
    "linear-gradient( rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) ),linear-gradient(101deg, #1fa2ff, #12d8fa, #a6ffcb)",
  backgroundOrigin: "border-box",
  WebkitBackgroundClip: "content-box,border-box",
  backgroundClip: "content-box,border-box",
  boxShadow: "2px 1000px 1px #161a42 inset",
  border: "solid 3px transparent",
  "&:first-of-type": {
    mr: "10px",
  },
};

const ApplyBtn = {
  marginTop: "20px",
  width: "100%",
  fontWeight: "600 !important",
  borderRadius: "7px !important",
  "& :hover": {
    color: "white",
  },
};
const SidebarImgBox = {
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  overflow: "hidden",
  margin: "auto",
};
const SidebarImg = {
  width: "100%",
  height: "-webkit-fill-available",
  objectFit: "cover",
};
const contentBelowImage = {
  border: "1px solid #101010",
  borderRadius: "50px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: "40px",
  // marginBottom: "40px",
  paddingRight: "3px",
  outline: "none",
  backgroundColor: "#fff",
};
const TwiterBtnWrapper = {
  my: "20px",
};
const TwiterBtn = {
  width: "100%",
  fontWeight: "600 !important",
};
const copyCodeText = {
  borderRadius: "50px",
  backgroundColor: "#12d8fa",
  color: "#000",
  fontSize: "16px",
  fontWeight: "600",
  padding: {
    xs: "6px 23px 6px",
    md: "6px 14px 6px",
    lg: "6px 23px 6px",
  },
};
const copyCodeTextRight = {
  borderRadius: "50px",
  color: "#101010",
  fontSize: { xs: "16px", md: "13px", lg: "16px" },
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  paddingRight: "10px",
};

const ContentCopyIconText = {
  color: "#C0C0C0",
  width: "15px",
  height: "15px",
  marginLeft: "5px",
  cursor: "pointer",
};

const LeftSideBarContent = {
  fontWeight: "600",
  textAlign: "left",
  color: "#12d8fa",
  marginBottom: "0px",
  fontSize: "16px",
  textDecoration: "none",
};
const leftContentHeading = {
  fontWeight: "600",
  textAlign: "left",
  marginBottom: "28px",
  fontSize: "24px",
};

// const FilterStatusLabel = styled("h5")`
//   color: #000000;
//   font-weight: 900;
//   text-align: left;
//   margin-bottom: 10px;
//   margin-top: 35px;
// `;

const formInput = {
  width: "100%",
  "& fieldset": {
    display: "none",
  },
  "& #outlined-select-currency": {
    borderRadius: "5px",
    background: "transparent",
    backgroundImage:
      "linear-gradient( rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) ),linear-gradient(101deg, #1fa2ff, #12d8fa, #a6ffcb)",
    backgroundOrigin: "border-box",
    WebkitBackgroundClip: "content-box,border-box",
    backgroundClip: "content-box,border-box",
    boxShadow: "2px 1000px 1px #161a42 inset",
    border: "solid 3px transparent",
    padding: "9px 32px 9px 10px",
  },
};
const AccordionWrapper = {
  boxShadow: "none",
  border: "1px solid #ffffff",
  mb: "0px !important",
  borderRadius: "12px !important",
  background: "transparent",
  backgroundImage:
    "linear-gradient( rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) ),linear-gradient(101deg, #1fa2ff, #12d8fa, #a6ffcb)",
  backgroundOrigin: "border-box",
  WebkitBackgroundClip: "content-box,border-box",
  backgroundClip: "content-box,border-box",
  boxShadow: "2px 1000px 1px #161a42 inset",
  border: "solid 3px transparent",
  marginTop: "20px",

  "&.Mui-expanded": { pb: "10px !important" },
  "&::before": { content: "none" },
};
const AccordionHeader = {
  minHeight: "30px !important ",
  borderRadius: "0px !important",
  "& .Mui-expanded": {
    my: "12px !important",
  },
  "& svg": {
    color: "white !important",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "white !important",
  },
};
const AccordionBodyContent = {
  pb: "0",
  "& > .MuiFormControl-root": { width: "100%" },
  "& label": {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    mr: "0",
    ml: "0",
    "& span.MuiCheckbox-root": { pr: "0", "& svg": { color: "#E5E8EB" } },
    "& span.MuiRadio-root": { pr: "0", "& svg": { color: "#E5E8EB" } },
    "& span.MuiCheckbox-root.Mui-checked": {
      pr: "0",
      "& svg": { color: "#12d8fa" },
    },
    "& span.MuiRadio-root.Mui-checked": {
      pr: "0",
      "& svg": { color: "#1E1E1E" },
    },
    "& .MuiFormControlLabel-label": {
      color: "#ffffff",
      fontWeight: "400",
    },
  },
};
const currencies = [
  // {
  //   value: "0",
  //   label: "All",
  // },
  {
    value: TokenAddress.USDC.address,
    label: TokenAddress.USDC.symbol,
  },
  {
    value: TokenAddress.WETH.address,
    label: TokenAddress.WETH.symbol,
  },
];

const FilterMenu = ({
  onFilterChange,
  filters: {
    min: minPrice,
    max: maxPrice,
    paymentToken: currency,
    toggles = [],
  },
}) => {
  /* const handleFilter = async (value) => {
     await onFilterChange(value);
   };
 */
  const onListChanges = (key, value) => {
    const types = [...toggles];
    const index = types.indexOf(value);
    index >= 0 ? types.splice(index, 1) : types.push(value);
    onFilterChange({ [key]: types.join(",") });
  };

  const initialValues = {
    min: minPrice ? minPrice : "",
    max: maxPrice ? maxPrice : "",
    paymentToken: currency ? currency : TokenAddress.USDC.address,
  };

  const validationSchema = Yup.object().shape({
    min: Yup.number(),
    max: Yup.number(),
  });

  return (
    <Fragment>
      <Box>
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ color: "#000" }} />
        </Box> */}
        {/* <Box
          sx={{
            padding: "0px 5px 30px",
            display: "flex",
            flexDirection: "column",
            
          }}
        ></Box> */}
        <Box sx={SidebarImgBox}>
          <Typography component={"img"} src={SideBarImage} sx={SidebarImg} />
        </Box>
        <Typography component={"div"} sx={contentBelowImage}>
          <Typography component={"span"} sx={copyCodeText}>
            #19241
          </Typography>
          <Typography component={"span"} sx={copyCodeTextRight}>
            {/* {showCopiedAdd ? "Address Copied" : `${truncWalletAddress}`} */}
            o0ijiopjijpoj
            <ContentCopyIcon sx={ContentCopyIconText} />
          </Typography>
        </Typography>

        <Box sx={TwiterBtnWrapper}>
          {/* {userData?.twitter_userName ? ( */}
          {/* <a href="#" target="_blank">
            <OutlineButton SX={{ width: "100%", fontWeight: "600 !important" }}>
              <TwitterIcon /> */}
          {/* {userData?.twitter_userName != null &&
                      userData.twitter_userName} */}
          {/* </OutlineButton>
          </a> */}

          <OutlineButton SX={TwiterBtn}>
            <TwitterIcon />
            {"@Twitterhandle"}
          </OutlineButton>
        </Box>
        <Box>
          <Typography sx={LeftSideBarContent} component={"p"}>
            @motiondesignschool
          </Typography>
          <Typography
            sx={[leftContentHeading, textWhiteColor[0]]}
            component={"h5"}
          >
            Motion Design
            <br />
            School
          </Typography>
          {/* <Typography
            sx={{
              
              fontWeight: "600",
              textAlign: "left",
              color: "#ffffff",
              marginBottom: "16px",
              fontSize: "24px",
              wordBreak: "break-all",
            }}
            component={"h5"}
          >
          
          </Typography> */}
        </Box>
        <Accordion sx={AccordionWrapper} defaultExpanded={true}>
          <AccordionSummary sx={AccordionHeader} expandIcon={<ExpandMore />}>
            <FilterPriceLabel>Status</FilterPriceLabel>
          </AccordionSummary>
          <AccordionDetails sx={AccordionBodyContent}>
            <FormGroup>
              <FormControlLabel
                label="On Auction"
                checked={toggles.includes("ON_AUCTION")}
                onChange={(e) => onListChanges("toggles", "ON_AUCTION")}
                control={<Checkbox color="secondary" />}
              />
              <FormControlLabel
                label="New"
                checked={toggles.includes("NEW")}
                onChange={(e) => onListChanges("toggles", "NEW")}
                control={<Checkbox color="secondary" />}
              />
              {/*<FormControlLabel
                label="Has offers"
                control={<Checkbox color="secondary" />}
              />*/}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={AccordionWrapper} defaultExpanded={!!currency}>
          <AccordionSummary sx={AccordionHeader} expandIcon={<ExpandMore />}>
            <FilterPriceLabel>Price</FilterPriceLabel>
          </AccordionSummary>
          <AccordionDetails sx={AccordionBodyContent}>
            <Formik
              initialValues={initialValues}
              onSubmit={onFilterChange}
              validationSchema={validationSchema}
            >
              {() => (
                <Form>
                  <Box className="currency_inner_input">
                    <FormControl variant="outlined" sx={formInput}>
                      <Field
                        as={TextField}
                        id="outlined-select-currency"
                        select
                        name={"paymentToken"}
                        helperText={<ErrorMessage name="currency" />}
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </Box>

                  <Box className="price_inner_input">
                    <Field
                      as={Input}
                      sx={[PriceInput, textWhiteColor[0]]}
                      placeholder={"Min"}
                      disableUnderline
                      name="min"
                      type="number"
                      helperText={<ErrorMessage name="min" />}
                    />
                    <Field
                      as={Input}
                      sx={[PriceInput, textWhiteColor[0]]}
                      type="number"
                      placeholder={"Max"}
                      name="max"
                      disableUnderline
                      helperText={<ErrorMessage name="max" />}
                    />
                  </Box>
                  <OutlineButton type="submit" SX={ApplyBtn}>
                    Apply
                  </OutlineButton>
                </Form>
              )}
            </Formik>
          </AccordionDetails>
        </Accordion>
        {/* {blockchain.role == "student" && blockchain.email && blockchain.userId == params.id && !blockchain.connectedAccountAddress ?  */}
        <Link to="edit">
          <OutlineButton
            SX={{
              width: "100%",
              fontWeight: "600 !important",
              marginTop: "20px !important",
            }}

            // onClick={clickHandler}
          >
            Edit Profile
          </OutlineButton>
        </Link>
        {/* <Link to="edit">
          <OutlineButton
            SX={{ width: "100%", fontWeight: "600 !important" }}
            // onClick={clickHandler}
          >
            Edit Profile
          </OutlineButton>
        </Link> */}
        {/* {(params.id === blockchain?.connectedAccountAddress && (
                <Link to="edit">
                  <OutlineButton
                    SX={{ width: "100%", fontWeight: "600 !important" }}
                    // onClick={clickHandler}
                  >
                    Edit Profile
                  </OutlineButton>
                </Link>
              ))} */}
      </Box>
    </Fragment>
  );
};

export function FilterSideBar(props) {
  const FilterSideBarSection = styled("section")`
    text-align: center;
    padding: 30px;
    border-radius: 12px;
    background: transparent;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0)
      ),
      linear-gradient(101deg, #1fa2ff, #12d8fa, #a6ffcb);
    background-origin: border-box;
    webkit-background-clip: content-box, border-box;
    background-clip: content-box, border-box;
    box-shadow: 2px 2000px 1px #161a42 inset;
    border: solid 3px transparent;
  `;
  const FilterSideBarInnerBox = styled("div")`
    // padding-right: 30px;
    @media screen and (max-width: 480px) {
      padding-right: 0px;
    }
    display: flex;
    flex-direction: column;
    .currency_inner_input {
      .MuiInputBase-formControl {
        color: white;
      }
      svg {
        color: white;
      }
    }
    .price_inner_input {
      display: flex;
      align-items: center;
      margin-top: 7px;
      margin-bottom: 10px;
    }
  `;
  return (
    <>
      <FilterSideBarSection>
        <FilterSideBarInnerBox>
          <FilterMenu {...props} />
        </FilterSideBarInnerBox>
      </FilterSideBarSection>
    </>
  );
}
