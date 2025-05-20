import React from "react";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RiderInfo from "./pages/RideInfo.jsx"; 
import Help from "./components/Help.jsx";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/riderInfo" element={<RiderInfo />} />
        <Route path="/help" element={<Help />} />
      </Routes>
  );
}

export default App;
