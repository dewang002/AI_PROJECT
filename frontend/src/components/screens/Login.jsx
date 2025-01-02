import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import UserContext from "../../context/user.context";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const {setUser} = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/user/login", () => {
        email, password;
      })
      .then((res) => {
        localStorage.setItem("token" , res.data.token)
        setUser(res.data.user)
        nevigate("/");
      })
      .catch((e) => {
        console.log("error at login submition");
      });
      
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-zinc-400">
      <div className="h-64 w-1/4 px-8 py-8 rounded-md bg-zinc-200 flex flex-col justify-center items-center">
        <h3 className="text-xl font-semibold">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="h-full w-full flex flex-col justify-center items-center lg:gap-10">
            <div className="h-8 w-full">
              <h4>E-mail</h4>
              <input
                onClick={(e) => {
                  setEmail(e.target.value);
                }}
                className="h-full w-full rounded-md"
                type="text"
              />
            </div>
            <div className="h-8 w-full">
              <h4>Password</h4>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="h-full w-full rounded-md"
                type="text"
              />
            </div>
            <button
              onClick={() => handleClick}
              className="w-full h-8 text-white bg-blue-600 rounded-md"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
        </form>

        <h3>
          Don't have an account ?{" "}
          <Link to="/register">
            <span className="text-blue-600">Click here</span>
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Login;
