import React from "react";
import styled from "styled-components";
import { Row, Col, Tooltip } from "antd";

const RowStyled = styled(Row)`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgb(0, 0, 0, 0.65);
  margin: 6px 0;
  padding: 6px 0;
`;

export default function Funder({ rank, address, amount }) {
  return (
    <RowStyled>
      <Col span={4}>#{rank}</Col>
      <Col span={16}>
        <Tooltip title={address}>
        {address.slice(0, 22) + " . . ."}
        </Tooltip>
        </Col>
      <Col span={4}>{amount}</Col>
    </RowStyled>
  );
}
