import React from "react";
import { Button } from "antd";
import styled from "styled-components";

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default function DeployContract({ handleDeployment }) {
  return (
    <WrapperStyled>
      <h1>Click the button below to deploy a contract</h1>
      <Button type="primary" onClick={handleDeployment}>
        Deploy Contract
      </Button>
    </WrapperStyled>
  );
}
