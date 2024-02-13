import React from "react";
import GlobalStyles from "styles/GlobalStyles";
import { css } from "styled-components/macro"; //eslint-disable-line

import ComponentRenderer from "ComponentRenderer.js";
import MainLandingPage from "MainLandingPage.js";
import ThankYouPage from "ThankYouPage.js";
import "./input.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "context/AuthProvider";
import LoginPage from "pages/Login";

export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/components/:type/:subtype/:name"
              element={<ComponentRenderer />}
            />
            <Route
              path="/components/:type/:name"
              element={<ComponentRenderer />}
            />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/" element={<MainLandingPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

