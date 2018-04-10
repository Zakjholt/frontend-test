import React, { Component } from 'react';
import styled from 'styled-components';
import { ListCalls, UpdateCall, ReadCall } from '../../api';
import AppContext from '../../state/context';
import Header from '../../components/Header';
import CallsList from '../../components/CallsList';
import CallDetails from '../../components/CallDetails';

const AppContainer = styled.div`
  width: 360px;
  height: 600px;
  background-color: #ffffff;
  font-size: 13px;
  font-weight: 400;
  color: #333333;
  line-height: 13px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 5px 0px;
`;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      callIds: [],
      callData: {},
      detailLook: null,
      populateCalls: this.hydrateCalls,
      updateCall: this.updateCall,
      buildCallSelect: this.buildCallSelect
    };
  }

  componentDidMount = async () => {
    const { data } = await ListCalls();

    this.hydrateCalls(data);
  };

  hydrateCalls = callsList => {
    const callIds = callsList.map(i => i.id);
    const callData = callsList.reduce(
      (hash, call) => ({
        ...hash,
        [call.id]: {
          ...call,
          created_at: new Date(call.created_at)
        }
      }),
      {}
    );

    this.setState({ callIds, callData });
  };

  buildCallUpdate = callId => callBody => {
    const { callData } = this.state;

    // optimistically update
    const updatedItemData = { ...callData[callId], ...callBody };

    this.setState(
      { callData: { ...callData, [callId]: updatedItemData }, detailLook: '' },
      () => this.updateCallApi(callId, callBody)
    );
  };

  buildCallSelect = callId => () => {
    this.setState({ detailLook: callId }, () =>
      this.fetchLatestCallData(callId)
    );
  };

  fetchLatestCallData = async callId => {
    if (!callId) {
      return;
    }

    try {
      const { data } = await ReadCall(callId);

      this.setState({
        callData: {
          ...this.state.callData,
          [callId]: { ...data, created_at: new Date(data.created_at) }
        }
      });
    } catch (err) {
      console.error(err);
      // do things with it here
    }
  };

  updateCallApi = async (callId, callBody) => {
    try {
      await UpdateCall(callId, callBody);
    } catch (err) {
      console.error(err);
      // do things with it here
    }
  };

  render() {
    const { detailLook, callData } = this.state;
    return (
      <AppContext.Provider value={this.state}>
        <AppContainer className="app-container">
          <Header />
          {!detailLook ? (
            <CallsList />
          ) : (
            <div>
              <CallDetails
                call={callData[detailLook]}
                goBack={this.buildCallSelect()}
                updateCall={this.buildCallUpdate(detailLook)}
              />
            </div>
          )}
        </AppContainer>
      </AppContext.Provider>
    );
  }
}
