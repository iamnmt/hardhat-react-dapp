import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";

import ConnectWallet from "./ConnectWallet";
import UserInfo from "../UserInfo";

const WrapperStyled = styled.div`
  padding: 50px 0px;
  .box {
    display: flex;
    flex-direction: column;

    width: 450px;
    border: 1px solid #dadce0;
    border-radius: 8px;
    margin: 0 auto;
    padding: 40px 36px;
  }
  .navigation {
    display: flex;
    justify-content: space-around;
  }
`;

export default class Connect extends Component {
  render() {
    const { selectedAddress, resetWallet } = this.props;
    return (
      <WrapperStyled>
        <div className="box">
          {selectedAddress && <UserInfo address={selectedAddress} />}
          {!selectedAddress && (
            <ConnectWallet connectWallet={this.connectWallet} />
          )}
          <div className="navigation">
            {selectedAddress && (
              <Button type="primary">
                <Link to="/">Home</Link>
              </Button>
            )}
            {selectedAddress && (
              <Button type="danger" onClick={resetWallet}>
                Disconnect
              </Button>
            )}
          </div>
        </div>
      </WrapperStyled>
    );
  }

  connectWallet = async () => {
    const { checkUserCompatibility, initializeWallet } = this.props;
    if (!checkUserCompatibility()) {
      return;
    }

    const [selectedAddress] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    initializeWallet(selectedAddress);
  };
}
