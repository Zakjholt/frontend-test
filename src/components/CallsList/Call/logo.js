import React from 'react';
import inboundIcon from '../../../assets/images/in.svg';
import outboundIcon from '../../../assets/images/out.svg';

export default ({ direction }) =>
  direction === 'inbound' ? (
    <img src={inboundIcon} />
  ) : (
    <img src={outboundIcon} />
  );
