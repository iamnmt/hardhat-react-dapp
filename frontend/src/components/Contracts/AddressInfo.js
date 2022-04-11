import React from "react";
import styled from "styled-components";
import { Button, Tooltip } from "antd";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  height: 40px;
  .info {
    font-size: 14px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.65);
  }
`;

export default function AddressInfo({ selectedAddress }) {
  return (
    <WrapperStyled>
      <Tooltip title={selectedAddress}>
        <Button className="info" type="text">
          Your Address
        </Button>
      </Tooltip>
    </WrapperStyled>
  );
}
