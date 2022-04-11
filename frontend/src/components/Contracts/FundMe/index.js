import { ethers } from "ethers";
import { Row, Col } from "antd";
import React, { Component } from "react";
import styled from "styled-components";

import DeployContract from "../DeployContract";
import Input from "./Input";
import Withdraw from "./Withdraw";
import TopFunders from "./TopFunders";

const UIWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FundingInfoWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 12px 10px;
  border-left: 3px solid rgb(0, 0, 0, 0.65);
  h1 {
    align-self: center;
  }
`;

export default class FundMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: undefined,
      total: undefined,
      funders: [],
    };
  }

  render() {
    const { selectedAddress, setErrorMessage } = this.props;
    const { owner, total, funders } = this.state;
    if (!this.isContractDeployed()) {
      return <DeployContract handleDeployment={this.handleDeployment} />;
    } else {
      return (
        <Row>
          <Col span={16}>
            <UIWrapperStyled>
              <Input
                setErrorMessage={setErrorMessage}
                owner={this.state.owner}
                handleFunding={this.handleFunding}
              />
              {owner === selectedAddress && (
                <Withdraw handleWithdraw={this.handleWithdraw} />
              )}
            </UIWrapperStyled>
          </Col>
          <Col span={8}>
            <FundingInfoWrapperStyled>
              <h1>Total: {total} ETH</h1>
              <TopFunders funders={funders} />
            </FundingInfoWrapperStyled>
          </Col>
        </Row>
      );
    }
  }

  componentWillUnmount() {
    this._stopPollingData();
  }

  isContractDeployed = () => {
    return this.state.owner !== undefined;
  };

  handleDeployment = async () => {
    const { handleDeployment, selectedAddress } = this.props;
    // this.setState({ owner: selectedAddress });

    if (await handleDeployment()) {
      this.setState({ owner: selectedAddress });
      this._startPollingData();
    }
  };

  handleFunding = async (amount) => {
    const { currentContract } = this.props;
    const options = { value: ethers.utils.parseEther(String(amount)) };
    try {
      const tx = await currentContract.fund(options);
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleWithdraw = async () => {
    const { currentContract } = this.props;
    try {
      const tx = await currentContract.withdraw();
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  _updateTotal = async () => {
    const { currentContract } = this.props;
    const total = ethers.utils
      .formatEther(await currentContract.total())
      .toString();
    if (total !== this.state.total) {
      this.setState({ total });
    }
  };

  _isFundersChanged = (funders) => {
    if (funders.length === this.state.funders.length) {
      for (let i = 0; i < funders.length; i++) {
        const { address, amount } = this.state.funders[i];
        if (address !== funders[i].address || amount !== funders[i].amount) {
          return true;
        }
      }
      return false;
    }
    return true;
  };

  _updateFunders = async () => {
    const { currentContract } = this.props;
    const fundersAndAmount = await currentContract.getAllFunding();
    let seenAddress = {};
    const funders = fundersAndAmount[0]
      .filter((address, index) => {
        if (seenAddress[address] === undefined) {
          seenAddress[address] = index;
          return true;
        }
        return false;
      })
      .map((address, index) => ({
        address: address,
        amount: ethers.utils
          .formatEther(fundersAndAmount[1][seenAddress[address]])
          .toString(),
      }))
      .sort((a, b) => b.amount - a.amount);
    let needUpdate = this._isFundersChanged(funders);

    if (needUpdate) {
      this.setState({ funders });
    }
  };

  _startPollingData = () => {
    this._pollDataIntervals = [
      setInterval(this._updateTotal, 5000),
      setInterval(this._updateFunders, 5000),
    ];
    this._updateTotal();
    this._updateFunders();
  };

  _stopPollingData = () => {
    if (!this._pollDataIntervals) {
      return;
    }
    for (const inv of this._pollDataIntervals) {
      clearInterval(inv);
    }
    this._pollDataIntervals = undefined;
  };
}
