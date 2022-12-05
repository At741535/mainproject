import { styled, Button } from "@mui/material";
import React from "react";
import { BtnBorderDarkGradient } from "../components";

const CustomButton = styled("div")`
  button {
    text-align: center;
    color: #000000;
    border-radius: 12px;
    text-transform: capitalize;
    font-weight: 400;
    padding: 12px 20px;
    font-size: 14px;
    ${BtnBorderDarkGradient}
    svg,
    img {
      margin-right: 10px;
      margin-left: 10px;
    }

    &:hover {
      box-shadow: 2px 1000px 1px #161a42 inset !important;
      color: #ffffff;
      box-shadow: none;
      svg.stroke {
        stroke: #ce1515;
      }
      svg.fill {
        fill: #ce1515;
      }
    }
  }
`;

const CustomWhiteButton = styled("div")`
  button {
    background-color: #ffffff;
    border-radius: 0px;
    font-style: normal;
    font-weight: 900;
    font-size: 16px;
    line-height: 32px;
    letter-spacing: 0.1em !important;
    color: #000000;
    text-transform: uppercase;
    padding: 5px 30px;
    box-shadow: none;
    border: 1px solid #ffffff;
    svg,
    img {
      margin-right: 10px;
      margin-left: 10px;
    }

    &:hover {
      border: 1px solid #ffffff;
      background-color: transparent;
      color: #ffffff;
      box-shadow: none;
      svg.stroke {
        stroke: #ce1515;
      }
      svg.fill {
        fill: #ce1515;
      }
    }
    &:disabled {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

const CustomRedWhiteButton = styled("div")`
  button {
    background-color: #ffffff;
    border-radius: 12px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
    letter-spacing: 0.1em !important;
    color: #ff0000;
    text-transform: uppercase;
    padding: 5px 30px;
    box-shadow: none;
    border: 1px solid #ffffff;
    svg,
    img {
      margin-right: 10px;
      margin-left: 10px;
    }

    &:hover {
      border: 1px solid #ffffff;
      background-color: transparent;
      color: #ffffff;
      box-shadow: none;
      svg.stroke {
        stroke: #ce1515;
      }
      svg.fill {
        fill: #ce1515;
      }
    }
  }
`;

export const BlackButton = (props) => {
  const { children, onClick, SX, disabled, type } = props;
  return (
    <CustomButton className="brownBtnWrapper">
      <Button
        className="brownBTN"
        sx={SX}
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </Button>
    </CustomButton>
  );
};

export const WhiteButton = (props) => {
  const { children, onClick, SX, disabled, type } = props;
  return (
    <CustomWhiteButton>
      <Button
        className="brownBTN"
        sx={SX}
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </Button>
    </CustomWhiteButton>
  );
};

export const RedWhiteButton = (props) => {
  const { children, onClick, SX, disabled, type } = props;
  return (
    <CustomRedWhiteButton>
      <Button
        className="brownBTN"
        sx={SX}
        variant="contained"
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </Button>
    </CustomRedWhiteButton>
  );
};
