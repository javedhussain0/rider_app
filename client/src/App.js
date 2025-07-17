import React from "react";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import RiderInfo from "./pages/RideInfo.jsx"; 
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import HelpPage from "./pages/HelpPage.jsx";



function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/riderInfo" element={<RiderInfo />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
  );
}

export default App;
