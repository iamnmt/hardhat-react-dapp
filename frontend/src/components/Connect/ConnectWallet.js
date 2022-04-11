import React, { Component } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  p {
    margin: 10px;
    font-size: 20px;
  }
  .navigation {
    display: flex;
    justify-content: space-around;
  }
`;

export default class ConnectWallet extends Component {
  render() {
    const { connectWallet } = this.props;
    return (
      <WrapperStyled>
        <p>Click the button below to connect to your wallet.</p>
        <div className="navigation">
          <Button type="primary">
            <Link to="/">Home</Link>
          </Button>
          <Button type="primary" onClick={connectWallet}>
            Connect
          </Button>
        </div>
      </WrapperStyled>
    );
  }
}
