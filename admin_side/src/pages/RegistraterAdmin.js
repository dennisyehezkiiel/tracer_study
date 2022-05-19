import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterAdmin() {
  const nagivate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleName = (e) => {
    const result = e.target.value;
    setAdminName(result);
  };

  const handlePassword = (e) => {
    const result = e.target.value;
    setAdminPassword(result);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const payload = {
      adminName,
      adminPassword,
    };

    function handleResponse(response) {
      return response.json().then((json) => {
        if (response.ok) {
          nagivate("/loginadmin");
        } else {
          return Promise.reject(json);
        }
      });
    }

    fetch("http://localhost:3000/adminregister", {
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
          placeholder="Name"
          type="text"
          value={adminName}
          onChange={handleName}
        />
        <input
          placeholder="Password"
          type="password"
          value={adminPassword}
          onChange={handlePassword}
        />
        <button type="submit" onClick={handleRegister}>
          Register
        </button>
      </form>
    </>
  );
}

export default RegisterAdmin;
