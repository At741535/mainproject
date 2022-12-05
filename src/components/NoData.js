import { styled } from "@mui/material";

const NoComponent = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh; 
  h4 {
    color: #ffffff;
  }
  @media (min-width: 900px) {
    min-height: 70vh;
  }
  @media (min-width: 1200px) {
    min-height: 70vh;
  }
  h4 {
    color: #ffffff;
    font-size: 26px;
    text-align: center;
  }
`;


export const NoDataFound = ({title}) => {
    return (
        <NoComponent>
            <h4>
                {title}
            </h4>
        </NoComponent>
    )
}