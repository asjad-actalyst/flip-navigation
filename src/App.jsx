import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import TabSwitcher from "./components/TabSwitcher";
import "./App.css";

const tabs = [
  {
    label: "Home",
    component: <div>Home Content</div>,
    bg: "lightGrey",
    path: "/",
    groups: [
      { label: "News", component: <div>News</div>, path: "/",bg:"#F0F8FF" },
      { label: "Chat", component: <div>Chat</div>, path: "/chat",bg:"#6495ED" },
      { label: "Insights", component: <div>Insights</div>, path: "/insights",bg:"#00CED1" },
    ],
  },
  {
    label: "Profile",
    component: <div>Profile Content</div>,
    bg: "lightGreen",
    path: "/profile",
    groups: [
      { label: "User", component: <div>User</div>, path: "/profile",bg:"#FFFAF0" },
      { label: "Admin", component: <div>Admin</div>, path: "/profile/admin",bg:"#F0FFF0" },
    ],
  },
  {
    label: "Settings",
    component: <div>Settings Content</div>,
    bg: "blue",
    path: "/settings",
  },
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
