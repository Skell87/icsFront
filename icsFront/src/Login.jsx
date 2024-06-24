import React, { useContext, useState } from "react";
import { AuthContext } from "./Context";
import { getToken } from "./api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { auth } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const submit = () => {
    getToken({ username, password })
      .then((response) => {
        console.log(response.data);
        auth.setAccessToken(response.data.access);
        navigate("/HomePage");
        setErrorMessage(undefined);
      })
      .catch((error) => {
        console.log("error loging in: ", error);
        setErrorMessage("There was an error logging in.");
      });
  };

  return (
    <div id="loginPage">
      <img
        className="logo"
        src="./logo.png"
        alt="a logo of a mule with a box"
      ></img>
      <h1 id="loginTitle">Pack Mule</h1>
      <p id="loginDesc">We'll hold that for you...</p>
      <h2 id="loginText">Login.</h2>
      <div>
        <div>Username:</div>
        <input onChange={(e) => setUserName(e.target.value)} value={username} />
      </div>
      <div>
        <div>Password:</div>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div>
        <button className="login-button" onClick={() => submit()}>
          Log in.
        </button>
        <div>
          <Link to="/AddUser">Dont have an account? Sign up here!</Link>
        </div>
      </div>
      {errorMessage && <h3>{errorMessage}</h3>}
    </div>
  );
}

export default Login;
