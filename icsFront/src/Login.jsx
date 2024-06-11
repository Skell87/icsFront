import React, { useContext, useState } from "react";
import { AuthContext } from "./Context";
import { getToken } from "./api";
import { useNavigate } from "react-router-dom";

function Login() {
  const { auth } = useContext(AuthContext);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = () => {
    getToken({ username, password }).then((response) => {
      console.log(response.data);
      auth.setAccessToken(response.data.access);
    });
    navigate("/HomePage");
  };

  return (
    <div id="loginPage">
      <h1>Login</h1>
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
        <button className="button" onClick={() => submit()}>
          Log in.
        </button>
      </div>
    </div>
  );
}

export default Login;
