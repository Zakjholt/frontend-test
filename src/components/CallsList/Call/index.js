import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from './logo';
import Time from './Time';

const monthNames = [
  'Jan',
  'Feb',
  'March',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
];

const CallContainer = styled.div`
  width: 80%;
  margin-top: 15px;
  height: 50px;
  padding: 15px;
  border-radius: 5px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  background: #fafafa;
  font-family: 'Roboto';
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CallIcon = styled.div`
  flex: 0 1 10%;
  img {
    height: 10px;
  }
`;

const CallDetails = styled.div`
  flex: 0 1 80%;
`;

const FromNumber = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const ToText = styled.div`
  font-weight: 300;
  font-size: 12px;
  color: #aaa;
  margin-top: 5px;
`;

const CallTime = styled.div`
  flex: 0 1 10%;
`;

const DateDisplay = styled.div`
  position: absolute;
  top: -15px;
  width: 100%;
  left: calc(50% - 30px);
  font-size: 10px;
  color: #aaa;
  font-weight: bold;
`;

export default class Call extends Component {
  buildDate = dateObj => {
    const month = monthNames[dateObj.getMonth()];
    const date = dateObj.getDate();
    const year = dateObj.getUTCFullYear();

    return `${month} ${date}, ${year}`;
  };
  render() {
    const {
      call: { created_at, direction, from, to, is_archived },
      displayDate,
      selectCall
    } = this.props;
    return (
      !is_archived && (
        <CallContainer onClick={selectCall}>
          {displayDate && (
            <DateDisplay>{this.buildDate(created_at)}</DateDisplay>
          )}
          <CallIcon>
            <Logo direction={direction} />
          </CallIcon>
          <CallDetails>
            <FromNumber>{to || 'Unknown'}</FromNumber>
            <ToText>tried to call on {from}</ToText>
          </CallDetails>
          <CallTime>{<Time dateObj={created_at} />}</CallTime>
        </CallContainer>
      )
    );
  }
}
