import React from "react";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RiderInfo from "./pages/RideInfo.jsx"; 

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/RiderInfo" element={<RiderInfo />} />
      </Routes>
  );
}

export default App;
