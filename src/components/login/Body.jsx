import { useNavigate, useLocation } from "react-router-dom";
import { useAuthActions } from "../../services/authService";
import { showSuccessToast, showErrorToast } from "../../utils/toastMessage";
import LoginForm from "./LoginForm";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuthActions();

  const handleLogin = async (username, password, setErrors) => {
    const response = await loginUser(username, password);
    if (response.success) {
      showSuccessToast("Login successful! Welcome back.");
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } else {
      setErrors({ general: response.message || "Invalid login credentials" });
      showErrorToast(response.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Body;