import { useState } from "react";
import { validateUsername, validatePassword } from "../components/login/validateLogin";

export const useLoginForm = (onLogin) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    let error = "";
    if (name === "username") {
      error = validateUsername(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const usernameError = validateUsername(credentials.username);
    const passwordError = validatePassword(credentials.password);

    setErrors({ username: usernameError, password: passwordError });

    return !usernameError && !passwordError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;
    onLogin(credentials.username, credentials.password, setErrors);
  };

  return {
    credentials,
    errors,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword,
  };
};