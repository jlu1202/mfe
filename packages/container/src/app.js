import React from "react";
import { BrowserRouter } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";

// import { mount } from 'marketing/MarketingApp';

// console.log(mount);

export default () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <MarketingApp />
      </div>
    </BrowserRouter>
  );
};
