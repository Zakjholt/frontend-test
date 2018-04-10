import React from 'react';
import styled from 'styled-components';
import AppContext from '../../state/context';
import Call from './Call';

const ListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 80%;
  padding: 15px 0;
  overflow: auto;
`;

const determineBorder = (callData, callIds, index) => {
  const currentId = callIds[index];
  const previousId = callIds[index - 1];
  const currentCall = callData[currentId];
  const previousCall = callData[previousId];
  if (!previousCall) {
    return false;
  }

  // Possible bug if there are sequential calls over a month apart
  return previousCall.created_at.getDate() !== currentCall.created_at.getDate();
};
export default () => (
  <ListContainer>
    <AppContext.Consumer>
      {({ callIds, callData, buildCallSelect }) => {
        return callIds
          .sort((a, b) => callData[a].created_at > callData[b].created_at)
          .map((id, index) => (
            <Call
              key={id}
              call={callData[id]}
              displayDate={determineBorder(callData, callIds, index)}
              selectCall={buildCallSelect(id)}
            />
          ));
      }}
    </AppContext.Consumer>
  </ListContainer>
);
