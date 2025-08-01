import React from "react";
import WelcomePage from "./pages/WelcomePage.jsx";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
