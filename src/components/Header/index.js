import React from 'react';
import styled from 'styled-components';
import Logo from './logo';

const HeaderContainer = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 0px 0px;
`;

export default () => (
  <HeaderContainer>
    <Logo />
  </HeaderContainer>
);
