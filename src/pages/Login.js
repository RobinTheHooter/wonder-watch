import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { LOGIN_USER } from "../operations/Mutations";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);

  if (loading) return <h1>Logging in...</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        input: formData,
      },
    });
  };

  return (
    <div className="container" style={{ maxWidth: "500px" }}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email/Username"
          name="identifier"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn blue">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
