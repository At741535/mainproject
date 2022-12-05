import { Container } from "@mui/material";
import styled from "styled-components";
import { FontAgne, FontProximaNova } from "./GlobelColor";

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 170px;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

ContentWrapper.Title = styled.h1`
  color: white;

  font-style: normal;
  font-weight: 400;
  font-size: 80px;
  line-height: 80px;
`;

ContentWrapper.Description = styled.p`
  max-width: 425px;
  color: white;

  font-size: 22px;
  font-weight: 400;
`;

export const PageSubHeader = ({ title, description }) => {
  return (
    <Container className="big_desktop_container">
      <ContentWrapper>
        <ContentWrapper.Title>{title}</ContentWrapper.Title>
        <ContentWrapper.Description>{description}</ContentWrapper.Description>
      </ContentWrapper>
    </Container>
  );
};
