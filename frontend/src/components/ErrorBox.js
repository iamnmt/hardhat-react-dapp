import React from "react";
import styled from "styled-components";

const WrapperStyled = styled.div`
  .alert {
    padding: 10px;
    background-color: #f44336;
    color: white;
  }

  .alert-dismissbtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
  }

  .alert-dimissbtn:hover {
    color: black;
  }
`;

export default function ErrorBox({ message, dismiss }) {
  return (
    <WrapperStyled>
      <div className="alert">
        <span className="alert-dismissbtn" onClick={dismiss}>
          &times;
        </span>
        {message}
      </div>
    </WrapperStyled>
  );
}
