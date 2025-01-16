import React,{lazy} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Login = lazy(()=>import("../components/screens/Login"));
const Register = lazy(()=>import("../components/screens/Register")) ;
const Home = lazy(()=>import("../components/screens/Home"));
const Project = lazy(()=>import("../components/screens/Project") ) ;
const UserAuth = lazy(()=>import("../auth/UserAuth")) ;

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Suspense fallback={"...loading"}> <UserAuth><Home /></UserAuth> </Suspense> } />
        <Route path="/login" element={<Suspense fallback={"...loading"}><Login /></Suspense> } />
        <Route path="/register" element={<Suspense fallback={"...loading"}><Register /></Suspense> } />
        <Route path="/project" element={<Suspense fallback={"...loading"}><UserAuth><Project /></UserAuth></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
