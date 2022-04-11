import React, { Component } from "react";
import styled from "styled-components";
import { Button, InputNumber, Typography, Space } from "antd";

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 30vh;
  .input {
    width: 200px;
  }
`;

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: undefined,
    };
  }
  render() {
    const { owner } = this.props;
    return (
      <WrapperStyled>
        <Typography.Text>You are donating to {owner}</Typography.Text>
        <Space>
          <Typography.Text>Amount: </Typography.Text>
          <InputNumber className="input" onChange={this.handleChangeAmount} />
          <Typography.Text>ETH </Typography.Text>
        </Space>
        <Button type="primary" onClick={this.handleFunding}>
          Fund
        </Button>
      </WrapperStyled>
    );
  }
  handleChangeAmount = (amount) => {
    this.setState({ amount });
  };
  handleDFunding = async () => {
    const {handleFunding, setErrorMessage} = this.props
    const { amount } = this.state;
    if (typeof amount == 'number') {
      setErrorMessage('')
      await handleFunding(amount)
    } else {
      setErrorMessage('Please enter a valid amount')
    }
  };
}
