import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthActions } from "../../services/authService";

const Body = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuthActions();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const response = await loginUser(credentials.username, credentials.password);
    if (response.success) {
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } else {
      setError(response.message || "Invalid login credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} className="block w-full p-2 border rounded mb-2" required />
        <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} className="block w-full p-2 border rounded mb-2" required />
        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Login</button>
      </form>
    </div>
  );
};

export default Body;