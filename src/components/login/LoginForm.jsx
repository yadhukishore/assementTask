import React, { useState } from "react";
import { User, Lock, EyeOff, Eye } from "lucide-react";

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-10 py-8 bg-gradient-to-r from-blue-600 to-purple-600">
            <h2 className="text-3xl font-bold text-white text-center">Welcome Back</h2>
            <p className="text-blue-100 text-center mt-2">Please sign in to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-10 space-y-6">
            {errors.general && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:ring-2 transition-all ${
                    errors.username 
                      ? "border-red-300 focus:ring-red-200" 
                      : "border-gray-200 focus:ring-blue-100 focus:border-blue-400"
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm pl-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg outline-none focus:ring-2 transition-all ${
                    errors.password 
                      ? "border-red-300 focus:ring-red-200" 
                      : "border-gray-200 focus:ring-blue-100 focus:border-blue-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm pl-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transform transition-all hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;