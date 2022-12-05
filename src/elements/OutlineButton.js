import { styled, Button } from "@mui/material";
import React from "react";
import { BtnBorderGradient } from "../components";

const CustomButton = styled(Button)`
  text-align: center;
  color: #ffffff;
  border-radius: 12px;
  margin: 0px;
  text-transform: capitalize;
  font-weight: 400;
  padding: 12px 20px;
  font-size: 14px;
  ${BtnBorderGradient}
  a {
    color: #ffffff !important;
    &:hover {
      background-color: #fff !important;
      color: #000 !important;
    }
  }
  &:hover {
    box-shadow: 2px 1000px 1px #0cf5fe inset;
    color: #000 !important;
  }
`;

export const OutlineButton = (props) => {
  const { children, onClick, SX, disabled = false, type = "" } = props;
  return (
    <CustomButton
      sx={SX}
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </CustomButton>
  );
};
