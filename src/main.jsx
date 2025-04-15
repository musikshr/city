import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/app/App";
import { BrowserRouter, Routes, Route } from "react-router";
import { HashRouter } from 'react-router-dom';

const redirectPath = localStorage.getItem('redirect');
if (redirectPath) {
  localStorage.removeItem('redirect');

  // Ждём загрузки всех скриптов
  window.addEventListener('load', () => {
    window.history.replaceState(null, '', redirectPath);

    // Форсируем обновление роутера
    const event = new Event('forceRouteUpdate');
    window.dispatchEvent(event);
  });
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* // <BrowserRouter > */}
    <HashRouter>
      <App />
    </HashRouter>
    {/* // </BrowserRouter> */}
  </React.StrictMode>
);
