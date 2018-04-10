import React, { Component } from 'react';
import styled from 'styled-components';
import App from './App';

const PageContainer = styled.div`
  background-image: url('http://www.gstatic.com/prettyearth/assets/full/1014.jpg');
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Layout extends Component {
  render() {
    return (
      <PageContainer className="page-container">
        <App />
      </PageContainer>
    );
  }
}

export default Layout;
