import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    if (password === "2026no.1") {

      localStorage.setItem("adminAuth", "true");

      navigate("/admin");

    } else {

      alert("Wrong Password");

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          width: "400px",
          background: "#111",
          padding: "40px",
          borderRadius: "25px",
          border: "1px solid #222",
        }}
      >

        <h1
          style={{
            color: "white",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "#1a1a1a",
            color: "white",
            marginBottom: "20px",
            fontSize: "18px",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "15px",
            background: "#d4a017",
            border: "none",
            borderRadius: "15px",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

      </div>

    </div>

  );
}