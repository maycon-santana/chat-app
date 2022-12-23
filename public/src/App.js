import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/chat/Chat";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Chat />}/>
      </Routes>
    </BrowserRouter>
  );
}