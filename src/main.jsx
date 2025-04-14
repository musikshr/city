import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { BrowserRouter, Routes, Route } from "react-router";
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
// const redirect = sessionStorage.getItem('redirect');
// if (redirect) {
//   sessionStorage.removeItem('redirect');
//   window.location.href = redirect;
// }

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/city" >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
