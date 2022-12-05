import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const CrossBtnWrapper = {
    position: "absolute",
    top: "15px",
    right: "15px",
    "& svg": {
      fontWeight: "100",
      color: "#000000",
      fontSize: "30px",
      cursor: "pointer",
    },
};

export const ModalCloseBtn = ({ onClick }) => {
    return (
        <Box sx={CrossBtnWrapper}>
            <CloseIcon onClick={onClick} />
        </Box>
    )
}
