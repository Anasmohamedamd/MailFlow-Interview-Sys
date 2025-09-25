import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = "Name is Required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is Required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    setError({});

    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        setMessage(res.data.msg || "Login Successful!");
        setMessageType("success");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.name);
        navigate("/dashboard");
      } else {
        const res = await axios.post("http://localhost:3000/api/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setMessage(`Registered Successfully! Welcome ${res.data.user.name}`);
        setMessageType("success");
        localStorage.setItem("token", res.data.token);
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || "Something Went Wrong");
      setMessageType("error");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center fw-bold mb-4 text-primary">
          {isLogin ? "Login" : "Register"}
        </h3>

        {message && (
          <div
            className={`alert ${
              messageType === "success" ? "alert-success" : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className={`form-control mt-1 ${
                  error.name ? "is-invalid" : ""
                }`}
                placeholder="Enter your Name"
                value={formData.name}
                onChange={handleChange}
              />
              {error.name && <div className="invalid-feedback">{error.name}</div>}
            </div>
          )}

          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control mt-1 ${
                error.email ? "is-invalid" : ""
              }`}
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && <div className="invalid-feedback">{error.email}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control mt-1 ${
                error.password ? "is-invalid" : ""
              }`}
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleChange}
            />
            {error.password && (
              <div className="invalid-feedback">{error.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-3">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
