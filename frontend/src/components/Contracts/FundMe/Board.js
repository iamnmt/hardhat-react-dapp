import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";

import Funder from "./Funder";

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;

  background: #fff;
  width: 90%;
  border: 1px solid #dadce0;
  border-radius: 8px;
  padding: 12px 10px;

  .col-name {
    font-weight: bold;
  }
`;

const PAGINATION_LIMIT = 10;

export default function Board({ funders }) {
  return (
    <WrapperStyled>
      <Row className="col-name">
      <Col span={4}>Rank</Col>
      <Col span={16}>Address</Col>
      <Col span={4}>Amount</Col>
      </Row>
      {funders.slice(0, PAGINATION_LIMIT).map(({ address, amount }, index) => (
        <Funder key={index} rank={index + 1} address={address} amount={amount} />
      ))}
    </WrapperStyled>
  );
}
