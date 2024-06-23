/*
I need to make an axios post to add users.
user information includes..
  username
  password
  first_name
  last_name
  email
  is_staff (boolean)
*/

import React, { useState, useContext } from "react";
import { registerUser } from "./api";
import axios from "axios";
import { AuthContext } from "./Context";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isStaff, setIsStaff] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmitCreateUser = (e) => {
    e.preventDefault();
    console.log("handle submit");

    registerUser({
      auth,
      username,
      password,
      firstName,
      lastName,
      email,
      isStaff,
    })
      .then((response) => {
        console.log("register user", response);
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setIsStaff(false);
        navigate("/Login");
      })
      .catch((error) => {
        console.log("error caught in catch block: ", error);
        if (error.response && error.response.status === 400) {
          if (error.response.data.error === "Username already taken") {
            console.log("this one!!!!");
            setErrorMessage("Username already taken.");
          } else {
            console.log(error.response.data);
            setErrorMessage("An Error occurred during registration.");
          }
        } else {
          setErrorMessage("An error occurred. Please try again.");
          console.log("this other ajodfoa!");
        }
      });
  };

  return (
    <div id="createUserMain">
      <img
        className="logo"
        src="/src/assets/logo.png"
        alt="a logo of a mule with a box"
      ></img>
      <h1 id="loginTitle">Pack Mule</h1>
      <p id="loginDesc">We'll hold that for you...</p>
      <form onSubmit={(e) => handleSubmitCreateUser(e)}>
        <div className="form-container">
          <h2 className="form-title">Create your account.</h2>

          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="form-button">
            Register
          </button>
        </div>
      </form>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};
export default AddUser;
