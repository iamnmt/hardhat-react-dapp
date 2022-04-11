import { ethers } from "ethers";

import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import Connect from "./Connect";
import Contracts from "./Contracts";
import ErrorBox from "./ErrorBox";

const AVAILABLE_NETWORKS_ID = ["31337"];
const AVAILABLE_NETWORKS = ["Localhost:8545"];

export class Dapp extends Component {
  constructor(props) {
    super(props);
    this.provider = undefined;
    this.initialState = {
      selectedAddress: undefined,
      errorMessage: undefined,
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    const prevState = JSON.parse(localStorage.getItem("prev_state"));
    if (prevState) {
      this.setState(prevState);
    }

    // Only add MetaMask listeners if user's browser is compatible and user has already connected

    if (window.ethereum && prevState && prevState.selectedAddress) {
      window.ethereum.on("accountsChanged", ([newAddress]) => {
        if (newAddress === undefined) {
          return;
        }
        this.initializeWallet(newAddress);
      });

      window.ethereum.on("chainChanged", ([networkId]) => {
        this.resetState();
      });
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem("prev_state", JSON.stringify(this.state));
  }

  render() {
    return (
      <>
        {this.state.errorMessage && (
          <ErrorBox
            message={this.state.errorMessage}
            dismiss={this.dismissError}
          />
        )}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/connect"
            element={
              <Connect
                selectedAddress={this.state.selectedAddress}
                checkUserCompatibility={this.checkUserCompatibility}
                initializeWallet={this.initializeWallet}
                resetWallet={this.resetState}
              />
            }
          />
          <Route
            path="/contracts"
            element={
              <Contracts
                provider={this.provider}
                selectedAddress={this.state.selectedAddress}
                checkUserCompatibility={this.checkUserCompatibility}
                setErrorMessage={this.setErrorMessage}
              />
            }
          />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </>
    );
  }

  // check these following requirements:
  // 1. user has metamask installed
  // 2. user is on AVAILABLE_NETWORKS
  checkUserCompatibility = () => {
    if (window.ethereum === undefined) {
      this.setErrorMessage(
        "No Ethereum wallet was detected. Please install MetaMask."
      );
      return false;
    }
    if (AVAILABLE_NETWORKS_ID.indexOf(window.ethereum.networkVersion) === -1) {
      this.setErrorMessage(
        `Wrong network. Please connect to a network from this list: ${AVAILABLE_NETWORKS}`
      );
      return false;
    }
    return true;
  };

  dismissError = () => {
    this.setState({ errorMessage: undefined });
  };

  initializeWallet = async (selectedAddress) => {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    this.setState({ selectedAddress });
  };

  resetState = () => {
    this.setState(this.initialState);
  };

  setErrorMessage = (message) => {
    this.setState({ errorMessage: message });
  };
}
