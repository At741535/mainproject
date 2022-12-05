import { Typography } from "@mui/material";
import Countdown from "react-countdown";
import styled from "styled-components";
import { DateFormat, DateUtility } from "../common";
import {
  FontPGRegular,
  FontProximaNova,
  FontProximaNovaBold,
} from "./GlobelColor";

const TimeText = styled.h4`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-right: 24px;
`;

const saleRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <TimeText>Sales Over</TimeText>;
  }

  return (
    <>
      <TimeText>
        <Typography component={"span"} className="timer_value">
          {days}
        </Typography>
        <Typography component={"span"} className="timer_label">
          Days
        </Typography>
      </TimeText>
      <TimeText>
        <Typography component={"span"} className="timer_value">
          {hours}{" "}
        </Typography>
        <Typography component={"span"} className="timer_label">
          Hours
        </Typography>
      </TimeText>
      <TimeText>
        <Typography component={"span"} className="timer_value">
          {minutes}{" "}
        </Typography>
        <Typography component={"span"} className="timer_label">
          Min
        </Typography>
      </TimeText>
      <TimeText>
        <Typography component={"span"} className="timer_value">
          {seconds}{" "}
        </Typography>
        <Typography component={"span"} className="timer_label">
          Sec
        </Typography>
      </TimeText>
    </>
  );
};

const Timer = styled.div`
  display: flex;
  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

Timer.Date = styled.div`
  margin-right: 53px;
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    color: #ffffff;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

Timer.Remaining = styled.div`
  display: flex;
  .timer_value {
    align-items: center;

    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    color: #ffffff;
  }
  .timer_label {
    align-items: center;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
  }
`;

export function SalesCountDown({ expiryTime, setIsSaleOver }) {
  return (
    <Timer>
      <Timer.Date>
        <h1>Sale ends in:</h1>
        <p>{DateUtility.dateToString(expiryTime, DateFormat.dateTime)}</p>
      </Timer.Date>
      <Timer.Remaining>
        <Countdown
          date={expiryTime}
          renderer={saleRenderer}
          onComplete={() => {
            setIsSaleOver(true);
          }}
        />
      </Timer.Remaining>
    </Timer>
  );
}

const listedRenderer = ({ days, hours, minutes, seconds }) => {
  return (
    <p>
      {days} : {hours} : {minutes} : {seconds}
    </p>
  );
};

const TimerListCard = styled.div`
  display: flex;

  p {
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
  }
`;

export function CardCountDown({ expiryTime }) {
  return (
    <TimerListCard>
      <Countdown date={expiryTime} renderer={listedRenderer} />
    </TimerListCard>
  );
}
