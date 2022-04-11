import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Dapp } from "./components/Dapp";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Dapp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
