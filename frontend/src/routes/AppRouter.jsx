import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/screens/Login";
import Register from "../components/screens/Register";
import Home from "../components/screens/Home";
import Project from "../components/screens/Project";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
