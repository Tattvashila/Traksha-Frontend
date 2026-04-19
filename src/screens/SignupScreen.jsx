import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://traksha-backend-production.up.railway.app";

export default function SignupScreen() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    email: "",
    password: "",
    aadhaar: ""
  });

  const [faceVerified, setFaceVerified] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleFaceVerify = () => {
    setFaceVerified(true);
    setMessage("✅ Face verified successfully");
  };

  const handleSignup = async () => {
    if (!form.phone || !form.email || !form.password || !form.aadhaar) {
      setMessage("Please fill all fields");
      return;
    }

    if (!faceVerified) {
      setMessage("Face verification required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // 🔥 REAL BACKEND CALL
      const res = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phone: form.phone,
          email: form.email,
          password: form.password
        })
      });

      const data = await res.json();

      if (!data.success) {
        setMessage(data.message || "Signup failed");
        setLoading(false);
        return;
      }

      // 🔥 SUCCESS
      setMessage(`🎉 Account created! Your ID: ${data.userId}`);

      // 👉 OTP FLOW
      setTimeout(() => {
        navigate("/otp", {
          state: {
            userId: data.userId
          }
        });
      }, 1200);

    } catch (err) {
      console.error(err);
      setMessage("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>🪔 Create Your TRK Identity</h2>
      <p style={styles.sub}>Start your journey with Traksha</p>

      <div style={styles.form}>

        <input
          placeholder="Phone Number"
          style={styles.input}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <input
          placeholder="Email"
          style={styles.input}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          style={styles.input}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <input
          placeholder="Aadhaar Number"
          style={styles.input}
          onChange={(e) => handleChange("aadhaar", e.target.value)}
        />

        <button style={styles.secondaryBtn} onClick={handleFaceVerify}>
          {faceVerified ? "✅ Face Verified" : "📸 Verify Face"}
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <button style={styles.primaryBtn} onClick={handleSignup}>
          {loading ? "Creating..." : "Create Account"}
        </button>

      </div>

    </div>
  );
}

// 🎨 SAME UI
const styles = {
  container: {
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #FFF3E0, #FFE0B2)",
    fontFamily: "serif"
  },
  title: {
    textAlign: "center",
    marginBottom: "5px",
    color: "#5D4037"
  },
  sub: {
    textAlign: "center",
    fontSize: "13px",
    marginBottom: "20px",
    color: "#6D4C41"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #FFCC80",
    outline: "none"
  },
  primaryBtn: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #FF9800, #F57C00)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  secondaryBtn: {
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #FFB74D",
    background: "#FFF8E1",
    cursor: "pointer"
  },
  message: {
    fontSize: "13px",
    color: "#2E7D32"
  }
};