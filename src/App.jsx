import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import TabSwitcher from "./components/TabSwitcher";
import "./App.css";

const tabs = [
  { label: "Home", component: <div>Home Content</div>, bg: "lightGrey", path: "/" },
  { label: "Profile", component: <div>Profile Content</div>, bg: "lightGreen", path: "/profile" },
  { label: "Settings", component: <div>Settings Content</div>, bg: "blue", path: "/settings" },
];

function App() {
  return (
    <Router>
      <div className="app" style={{ width: "100vw", height: "100vh" }}>
        <TabSwitcher tabs={tabs} />
      </div>
    </Router>
  );
}

export default App;
