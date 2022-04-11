import React from "react";
import styled from "styled-components";

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  .description {
    font-size: 20px;
    font-weight: bold;
  }
  .content {
    font-size: 16px;
  }
`;

export default function UserInfo({ address }) {
  return (
    <WrapperStyled>
      <p className="description">User Address</p>
      <p className="content">{address}</p>
    </WrapperStyled>
  );
}
