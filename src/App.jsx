import { useState } from 'react'
import TabSwitcher from './components/TabSwitcher'
import './App.css'
const tabs = [
  { label: "Home", component: <div>Home Content</div> ,bg:"lightGrey"},
  { label: "Profile", component: <div>Profile Content</div>, bg:"lightGreen" },
  { label: "Settings", component: <div>Settings Content</div>, bg:"blue" },
];
function App() {
  const handleTabChange = (index) => {
    console.log("Active tab index:", index);
  };

  return (
    <div className="app" style={{width:"100vw",height:"100vh"}}>
      <TabSwitcher tabs={tabs} onTabChange={handleTabChange}  />
    </div>
  )
}

export default App
