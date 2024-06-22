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
    }).then((response) => {
      console.log("register user", response);
      setUsername("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setIsStaff(false);
      navigate("/Login");
    });
  };

  return (
    <form onSubmit={(e) => handleSubmitCreateUser(e)}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* <div>
        <label>Manager Status</label>
        <input
          type="checkbox"
          checked={isStaff}
          onChange={(e) => setIsStaff(e.target.checked)}
        />
      </div> */}
      <button type="submit">Register</button>
    </form>
  );
};
export default AddUser;
