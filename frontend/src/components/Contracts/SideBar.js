import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";

import ContractList from "./ContractList";
import AddressInfo from "./AddressInfo";

const WrapperStyled = styled.div`
    background: #001529;
    height: 100vh;
    .ant-menu-item-group-title {
        font-weight: bold;
    }
    .homebtn{
        padding 8px, 16px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.65);
    }
`;

export default function SideBar({ selectedAddress, contentList, handleChangePage}) {
  return (
    <WrapperStyled>
      <AddressInfo selectedAddress={selectedAddress}/>
      <Button type="text" className="homebtn"><Link to="/">Home</Link></Button>
      <ContractList 
      contentList={contentList} 
      handleChangePage={handleChangePage}/>
    </WrapperStyled>
  );
}
