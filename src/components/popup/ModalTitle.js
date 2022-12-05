import styled from "styled-components";
import { FontPGRegular } from "../GlobelColor";

const TitleComp = styled.h1`
 
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 133.03%;
  color: #000000;
`;

export const ModalTitle = ({ title }) => {
  return <TitleComp>{title}</TitleComp>;
};
