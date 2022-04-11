import { ContractFactory } from "ethers";

import React, { Component } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";

import SideBar from "./SideBar";

import DefaultTab from "./DefaultTab";
import FundMe from "./FundMe";
import SimpleStorage from "./SimpleStorage";

import FundMeArtifact from "../../contracts/FundMe.json";

const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

const ContractContentStyled = styled.div`
  background-color: #f0f2f5;
  height: 100vh;
`;

export default class Contracts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      currentContract: undefined,
    };
    this.contentList = [
      {
        key: 0,
        name: "default",
        component: DefaultTab,
      },
      {
        key: 1,
        name: "Fund Me",
        component: FundMe,
        artifact: FundMeArtifact,
      },
      {
        key: 2,
        name: "Simple Storage",
        component: SimpleStorage,
        artifact: {},
      },
    ];
  }
  render() {
    const CurrentTab = this.contentList[this.state.currentTab].component;
    const Artifact = this.contentList[this.state.currentTab].artifact;
    const { selectedAddress, setErrorMessage } = this.props;
    const {currentContract} = this.state
    return (
      <>
        <Row>
          <Col span={4}>
            <SideBar
              selectedAddress={selectedAddress}
              contentList={this.contentList
                .slice(1)
                .map(({ key, name, component }) => ({ key, name }))}
              handleChangePage={this.handleChangePage}
            />
          </Col>
          <Col span={20}>
            <ContractContentStyled>
              <CurrentTab
                selectedAddress={selectedAddress}
                currentContract={currentContract}
                handleDeployment={() => this.handleDeployment(Artifact)}
                setErrorMessage={setErrorMessage}
              />
            </ContractContentStyled>
          </Col>
        </Row>
      </>
    );
  }
  checkUserConnected = () => {
    const { checkUserCompatibility, selectedAddress, setErrorMessage } =
      this.props;
    if (!checkUserCompatibility()) {
      return false;
    }
    if (!selectedAddress) {
      setErrorMessage("You have to connect to a wallet first!");
      return false;
    }
    return true;
  };
  handleChangePage = (key) => {
    this.setState({
      currentTab: key,
    });
  };
  
  handleDeployment = async (Artifact) => {
    const { provider, setErrorMessage } = this.props;
    
    if (!this.checkUserConnected()) {
      return false;
    }
    const factory = new ContractFactory(
      Artifact.abi,
      Artifact.bytecode,
      provider.getSigner(0)
    );
    try {
      const currentContract = await factory.deploy();
      this.setState({currentContract})
    } catch (error) {
      if (error.code !== ERROR_CODE_TX_REJECTED_BY_USER) {
        console.log(error);
        setErrorMessage(error.message);
      }
      return false;
    }
    return true;
  };
}
