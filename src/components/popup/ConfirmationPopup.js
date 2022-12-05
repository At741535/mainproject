import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Modal,
  LinearProgress,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

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

const Confirmation = ({ open,setOpen,progressState,popupType }) => {
  return (
    <Box sx={style}>
      <Container sx={ContainerStyle}>
        {!progressState.progress && (
          <CancelOutlinedIcon onClick={() => setOpen(false)} />
        )}
        <Box className="prent_box" sx={flexGrow}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
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
                  "Transaction Successfull"}
                {progressState.failed && "Transaction failed"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export const ConfirmationPopup = (props) => {
  const { setOpen,open,progressState } = props;
  return (
    <>
      <Modal
        open={open}
        onClose={() => !progressState.progress && setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Confirmation {...props} />
      </Modal>
    </>
  );
};

