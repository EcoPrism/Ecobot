import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";

import heroImage from './assets/Hero image.png';
import ecoprism_logo from './assets/ecoprism_logo.png';
import "./index.css";

import Layout from "./pages/layout/Layout";
import NoPage from "./pages/NoPage";
import Chat from "./pages/chat/Chat";
import { AppStateProvider } from "./state/AppProvider";
import LinkedInLoginButton from "./LinkedInLoginButton";

initializeIcons();

// Landing page component

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("loggedIn");
    if (isUserLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (data: any) => {
    // Handle successful login here (e.g., set user data, update state)
    console.log("Login success:", data);
    localStorage.setItem("loggedIn", "true"); // Store login state in localStorage
    setLoggedIn(true);
  };

  const handleLoginFailure = (error: any) => {
    // Handle login failure here (e.g., show error message)
    console.error("Login failed:", error);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); // Remove login state from localStorage
    setLoggedIn(false);
  };

  const LandingPage = () => (
    <div className="container" style={{ backgroundColor: "#F1F1F1AD" }}>
      {/* Your landing page JSX */}
      <img className="EcoLogo" src={ecoprism_logo} alt="Ecoprism" style={{ position: "absolute" }} />
      <div className="image-container">
        <img className="Hero" src={heroImage} alt="Hero" style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="content-container" style={{ display: "flex", flexDirection: "column", paddingLeft: "200px", backgroundColor: "#FFFFFF" }}>
        <div className="main-content">
          <div>Step into EcoPrism's</div>
          <div>CSRD AI Navigator</div>
        </div>
        <div className="center-content">
          <div>Embark on your journey through CSRD</div>
          <div>and ESRS requirements</div>
        </div>
        <div className="bottom-content">
          <div>Login to Navigate</div>
          <LinkedInLoginButton onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure}/>
        </div>
      </div>
    </div>
  );
  
  return (
    <AppStateProvider>
      <HashRouter>
        <Routes>
          {loggedIn ? (
            <Route path="/" element={<Layout />} />
          ) : (
            <>
              <Route index element={<LandingPage />} />
              <Route
                path="/login"
                element={<LinkedInLoginButton onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}
              />
            </>
          )}
          <Route path="/logout" element={<Navigate to="/" />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </HashRouter>
    </AppStateProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

export default App;
