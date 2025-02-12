import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../../services/authService";
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuthActions();
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl text-green-600">Home Page</h1>
      {isAuthenticated ? (
        <button onClick={logoutUser} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      ) : (
        <button onClick={() => navigate("/login")} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      )}
    </div>
  );
};

export default Home;