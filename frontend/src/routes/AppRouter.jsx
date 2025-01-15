import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/screens/Login";
import Register from "../components/screens/Register";
const  Home = React.lazy(()=>import("../components/screens/Home"));
import Project from "../components/screens/Project";
import UserAuth from "../auth/UserAuth";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Suspense fallback={"...loading"}> <UserAuth><Home /></UserAuth> </Suspense> } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project" element={ <UserAuth><Project /></UserAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
