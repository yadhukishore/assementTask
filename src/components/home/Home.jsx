import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthActions } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useEmployees } from "../../hooks/useEmployees";
import EmployeeTable from "./EmployeeTable";
import Header from "./header/Header";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const sortBy = searchParams.get("sortBy") || "name";
  
  const { logoutUser } = useAuthActions();
  const { isAuthenticated, user } = useAuth();
  const {
    employees,
    totalEmployees,
    isLoading,
    isValidating,
    error,
    mutate
  } = useEmployees(currentPage, sortOrder, sortBy);

  const totalPages = Math.ceil(totalEmployees / 10);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString(), sortOrder, sortBy });
  };

  const handleSort = (column, newSortOrder) => {
    setSearchParams({ 
      page: currentPage.toString(), 
      sortOrder: newSortOrder,
      sortBy: column 
    });
  };

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded">
        <h3 className="font-bold">Error loading employees</h3>
        <p>{error.message}</p>
        <button 
          onClick={() => mutate()} 
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

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
        
        {isLoading && !employees.length ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <EmployeeTable 
              employees={employees} 
              navigate={navigate}
              onSort={handleSort}
              currentSortBy={sortBy}
              currentSortOrder={sortOrder}
            />

            {isValidating && (
              <div className="text-center text-gray-500 my-2">
                Refreshing data...
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isValidating}
              >
                Previous
              </button>
              <span className="text-lg font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isValidating}
              >
                Next
              </button>
            </div>
          </>
        )}
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