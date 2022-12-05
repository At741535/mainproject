import React from "react";
import { styled } from "@mui/material";
import {
  FontPGRegular,
  FontProximaNovaBold,
  FontProximaNovaLight,
} from "../../components";

const PropertyList = styled("div")`
  display: flex;
  margin-bottom: 20px;
  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    color: #000000;
    width: 200px;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #000000;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 50%;
  }
`;

const DetailsInnerWrapper = styled("div")`
  overflow: "hidden";
  h5 {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
    padding: "20px";
    color: "#000000";
    margin-bottom: 30px;
    margin-top: 20px;
  }
`;

export const TraitDetail = ({ traits }) => {
  return (
    <>
      <DetailsInnerWrapper>
        <h5>Properties</h5>
      </DetailsInnerWrapper>

      {traits.map((el, ind) => {
        return (
          <PropertyList key={ind}>
            <h3>{el.trait_type}:</h3>
            <p title={el.value}>{el.value}</p>
          </PropertyList>
        );
      })}
    </>
  );
};
