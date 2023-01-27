import React, { useState } from "react";
import "../componentscss/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const userInput = (e) => {
    setUserName(e.target.value);
    localStorage.setItem("user", e.target.value);
  };

  const userInputPass = (e) => {
    setUserPassword(e.target.value);
    localStorage.setItem("user", e.target.value);
  };

  const navigate = useNavigate();

  /**
   *
   * this function is goiing to show password
   * when we click on check box
   *
   */

  const mycheck = () => {
    var x = document.getElementById("LoginPass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  /**
   *
   * this function is get value from password filed
   * and check the password is correct or not
   * if it correct it will show next page otherwise redirect to login
   */

  var data = false;
  async function getData() {
    const getData = await axios.get(
      `http://localhost:8080/userValidation?empUsername=${userName}&empPassword=${userPassword}`
    );
    data = getData.data;
  }
  getData();

  const checkUser = async () => {
  
    if (data) {
      var getRoleUrl = `http://localhost:8080/getRoleByName/${userName}`
      const a = await axios.get(getRoleUrl);
      navigate("/userDashboard", { state: { name: userName, role: a.data} });
    } else {
      alert("please enter correct password !");
    }
  };

  return (
    <>
      <div className="login-LoginContainer">
        <div className="login-Loginbox">
          <div className="login-form" autoSave="off">
            <label className="login-label" htmlFor="LoginUsername">
              UserName
            </label>
            <input
              className="login-input"
              type="text"
              name="LoginUsername"
              id="LoginUser"
              value={userName}
              onChange={userInput}
            />

            <label className="login-label" htmlFor="username">
              Password
            </label>
            <input
              className="login-input"
              type="password"
              name="LoginPassword"
              id="LoginPass"
              value={userPassword}
              onChange={userInputPass}
            />
            <span className="login-span">
              <input type="checkbox" className="check" onClick={mycheck} />
              show
            </span>
            <button
              className="login-LoginButton"
              type="submit"
              onClick={checkUser}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
