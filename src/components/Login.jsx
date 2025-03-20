import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("user001@gmail.com");
  const [password, setPassword] = useState("User@123");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong..!");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong..!");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-success-content w-96">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login" : "Sign Up"}</h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name:</legend>
                  <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    className="input"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name:</legend>
                  <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className="input"
                  />
                </fieldset>{" "}
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                onChange={(e) => setEmailId(e.target.value)}
                value={emailId}
                className="input"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="input"
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end">
            <button
              onClick={isLoginForm ? handleLogin : handleSignUp}
              className="btn btn-primary"
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="" onClick={() => setIsLoginForm((value) => !value)}>
            {isLoginForm
              ? "New User? Sign Up Here"
              : "Existing User? Login Here."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
