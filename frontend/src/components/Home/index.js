import React, { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, Layout } from "antd";

import styled from "styled-components";

const { Header, Content } = Layout;

const MenuStyled = styled(Menu)`
  display: flex;
  justify-content: flex-end;

  .ant-menu-title-content {
    font-weight: bold;
  }
`;

const ContentStyled = styled(Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
`;

export default class Home extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <MenuStyled theme="dark" mode="horizontal">
            <Menu.Item key="contracts-page">
              <Link to="/contracts">Contracts</Link>
            </Menu.Item>
            <Menu.Item key="connect-page">
              <Link to="/connect">Connect</Link>
            </Menu.Item>
            <Outlet />
          </MenuStyled>
        </Header>
        <ContentStyled>
          <h1>
            A front-end application for interacting with Solidity smart
            contracts
          </h1>
          <p>This project is still in progress...</p>
          <p>There is a detailed description of the project in the Github repository.</p>
        </ContentStyled>
      </Layout>
    );
  }
}
