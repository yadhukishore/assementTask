import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useEmployees } from "../../hooks/useEmployees";
import EmployeeTable from "./EmployeeTable";
import Header from "./header/Header";

const Home = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuthActions();
  const { isAuthenticated,user } = useAuth();

  const [page, setPage] = useState(1);
  const { data, error } = useEmployees(page);

  const employees = data?.data || [];
  const totalEmployees = data?.total || 0;
  const totalPages = Math.ceil(totalEmployees / 10);

  if (error) return <p className="text-red-500">Error fetching employees: {error.message}</p>;
  if (!employees?.length) return <p className="text-blue-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <Header
        title="Employee Management"
        isAuthenticated={isAuthenticated}
        onLogout={logoutUser}
        userEmail={user?.email}
      />


      {/* Employee Table */}
      <div className="container mx-auto mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Employee List</h2>
        <EmployeeTable employees={employees} navigate={navigate} />

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
