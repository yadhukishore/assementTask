import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useAuthActions } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import { useEmployees } from "../../hooks/useEmployees";
import EmployeeTable from "./employeeTable/EmployeeTable";
import Header from "./header/Header";
import './Home.css';

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
      <Alert variant="danger" className="m-4">
        <Alert.Heading>Error loading employees</Alert.Heading>
        <p>{error.message}</p>
        <Button 
          variant="danger"
          onClick={() => mutate()} 
          className="mt-2"
        >
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <div className="home-wrapper">
      <Header
        title="Employee Management"
        isAuthenticated={isAuthenticated}
        onLogout={logoutUser}
        userEmail={user?.email}
      />

      <Container className="main-content mt-4">
        <Row>
          <Col>
            <div className="content-card">
              <h2 className="mb-4">Employee List</h2>
              
              {isLoading && !employees.length ? (
                <div className="loading-spinner">
                  <Spinner animation="border" variant="primary" />
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
                    <div className="text-center text-muted my-2">
                      Refreshing data...
                    </div>
                  )}

                  <div className="pagination-controls">
                    <Button
                      variant="secondary"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1 || isValidating}
                    >
                      Previous
                    </Button>
                    <span className="page-info">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="secondary"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages || isValidating}
                    >
                      Next
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>

        {!isAuthenticated && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="primary"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;