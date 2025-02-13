import { useNavigate, useLocation } from "react-router-dom";
import { useAuthActions } from "../../services/authService";
import LoginForm from "./LoginForm";

const Body = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuthActions();

  const handleLogin = async (username, password, setErrors) => {
    const response = await loginUser(username, password);
    if (response.success) {
      navigate(location.state?.from?.pathname || "/", { replace: true });
    } else {
      setErrors({ general: response.message || "Invalid login credentials" });
    }
  };

  return (
    <div className="min-h-screen">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Body;
