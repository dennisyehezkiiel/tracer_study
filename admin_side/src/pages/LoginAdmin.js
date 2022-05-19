import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginAdmin() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleAdminName = (e) => {
    const result = e.target.value;
    setAdminName(result);
  };

  const handleAdminPassword = (e) => {
    const result = e.target.value;
    setAdminPassword(result);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const payload = {
      adminName,
      adminPassword,
    };

    function handleResponse(response) {
      return response.json().then((json) => {
        if (response.ok) {
          localStorage.setItem("access_token", json.access_token);
          setAdminName("");
          setAdminPassword("");
          navigate("/dashboard");
        } else {
          return Promise.reject(json);
        }
      });
    }

    fetch("http://localhost:3000/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(handleResponse)
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={adminName}
          onChange={handleAdminName}
        />
        <input
          type="password"
          placeholder="password"
          value={adminPassword}
          onChange={handleAdminPassword}
        />
        <button type="submit" onClick={loginHandler}>
          Login
        </button>
      </form>
    </>
  );
}

export default LoginAdmin;
