import { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!credentials.username.trim()) newErrors.username = "Username is required.";
    if (!credentials.password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    onLogin(credentials.username, credentials.password, setErrors);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md w-96">
      <h2 className="text-2xl mb-4">Login</h2>

      {errors.general && <p className="text-red-500 mb-4">{errors.general}</p>}

      <div className="mb-2">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className={`block w-full p-2 border rounded ${errors.username ? "border-red-500" : ""}`}
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
      </div>

      <div className="mb-2">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className={`block w-full p-2 border rounded ${errors.password ? "border-red-500" : ""}`}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
