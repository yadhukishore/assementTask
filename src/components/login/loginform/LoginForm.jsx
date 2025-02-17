import { User, Lock, EyeOff, Eye } from "lucide-react";
import { useLoginForm } from "../../../hooks/useLoginForm";
import InputField from "../InputField";
import { Button, Form } from "react-bootstrap";
import "./LoginForm.css"; 

const LoginForm = ({ onLogin }) => {
  const {
    credentials,
    errors,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword,
  } = useLoginForm(onLogin);

  return (
    <div className="login-container">
      <div className="login-header">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please sign in to continue</p>
      </div>

      <div className="login-body">
        {errors.general && (
          <div className="alert alert-danger">{errors.general}</div>
        )}

        <Form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            error={errors.username}
            icon={<User size={20} />}
          />

          <InputField
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            error={errors.password}
            icon={<Lock size={20} />}
            showPasswordToggle={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <Button
            type="submit"
            className="w-100 mt-3 login-button"
            variant="primary"
            disabled={
              !!errors.username ||
              !!errors.password ||
              !credentials.username ||
              !credentials.password
            }
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;