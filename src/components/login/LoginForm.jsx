import { User, Lock, EyeOff, Eye } from "lucide-react";
import { useLoginForm } from "../../hooks/useLoginForm";
import InputField from "./InputField";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm opacity-75">Please sign in to continue</p>
        </div>

        <div className="p-6">
          {errors.general && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className="w-full py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-md font-bold transition duration-300 hover:opacity-90 disabled:opacity-50"
              disabled={
                !!errors.username ||
                !!errors.password ||
                !credentials.username ||
                !credentials.password
              }
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