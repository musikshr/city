import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { BrowserRouter, Routes, Route } from "react-router";
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
setTimeout(() => {
  const redirectPath = sessionStorage.getItem('redirect');
  if (redirectPath) {
    sessionStorage.removeItem('redirect');
    history.replaceState(null, '', redirectPath);
  }
}, 50);

root.render(
  // <React.StrictMode>
    <BrowserRouter basename="/city" >
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);
