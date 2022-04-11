import React from "react";
import { Menu } from "antd";

export default function ContractList({ contentList, handleChangePage }) {
  const onClick = ({ key }) => handleChangePage(key)
  return (
    <Menu theme="dark" mode="vertical">
      <Menu.ItemGroup title="Contracts">
        {contentList.map(({ key, name }) => {
          return (
            <Menu.Item key={key} onClick={onClick}>
              {name}
            </Menu.Item>
          );
        })}
      </Menu.ItemGroup>
    </Menu>
  );
}
