import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuthActions } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useEmployees } from "../../hooks/useEmployees";
import EmployeeTable from "./EmployeeTable";
import Header from "./header/Header";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  
  const { logoutUser } = useAuthActions();
  const { isAuthenticated, user } = useAuth();
  const { data, error } = useEmployees(currentPage);

  const employees = data?.data || [];
  const totalEmployees = data?.total || 0;
  const totalPages = Math.ceil(totalEmployees / 10);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (error) return <p className="text-red-500">Error fetching employees: {error.message}</p>;
  if (!employees?.length) return <p className="text-blue-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title="Employee Management"
        isAuthenticated={isAuthenticated}
        onLogout={logoutUser}
        userEmail={user?.email}
      />

      <div className="container mx-auto mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Employee List</h2>
        <EmployeeTable employees={employees} navigate={navigate} />

        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;