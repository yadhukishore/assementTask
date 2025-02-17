import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Alert, Image } from 'react-bootstrap';
import { useEmployeeDetails } from "../../../hooks/useEmployees";
import { getGenderLabel } from "../../../utils/genderMapping";
import Header from "../header/Header";
import { useAuth } from "../../../hooks/useAuth";
import { useAuthActions } from "../../../services/authService";

const DetailItem = ({ label, value }) => (
  <Card className="h-100">
    <Card.Body className="p-3">
      <Card.Subtitle className="mb-1 text-muted">{label}</Card.Subtitle>
      <Card.Text className="fs-5">{value || "N/A"}</Card.Text>
    </Card.Body>
  </Card>
);

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, isLoading, error } = useEmployeeDetails(id);
  const { isAuthenticated, user } = useAuth();
  const { logoutUser } = useAuthActions();

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="danger" className="text-center">
          <Alert.Heading>Error loading employee details</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      );
    }

    if (!employee) {
      return (
        <Alert variant="warning" className="text-center">
          No employee found.
        </Alert>
      );
    }

    return (
      <Card className="border-0 shadow">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4 text-primary fs-2 fw-bold">Employee Details</h2>

          {employee.profile_picture && (
            <div className="text-center mb-4">
              <Image
                src={employee.profile_picture}
                roundedCircle
                className="border border-4 border-primary-subtle"
                style={{ width: '128px', height: '128px', objectFit: 'cover' }}
              />
            </div>
          )}

          <Row className="g-3">
            <Col md={6}>
              <DetailItem label="Employee ID" value={employee.employee_code} />
            </Col>
            <Col md={6}>
              <DetailItem label="Name" value={employee.name} />
            </Col>
            <Col md={6}>
              <DetailItem label="Email" value={employee.email} />
            </Col>
            <Col md={6}>
              <DetailItem label="Phone" value={employee.phone} />
            </Col>
            <Col md={6}>
              <DetailItem label="Gender" value={getGenderLabel(employee.gender)} />
            </Col>
            <Col md={6}>
              <DetailItem label="Date of Birth" value={employee.date_of_birth} />
            </Col>
            <Col md={6}>
              <DetailItem label="Address" value={employee.address} />
            </Col>
            <Col md={6}>
              <DetailItem label="City" value={employee.city} />
            </Col>
            <Col md={6}>
              <DetailItem label="State" value={employee.state} />
            </Col>
            <Col md={6}>
              <DetailItem label="Zip Code" value={employee.zip_code} />
            </Col>
            <Col md={6}>
              <DetailItem label="Country" value={employee.country} />
            </Col>
            <Col md={6}>
              <DetailItem label="Designation" value={employee.designation?.title || "N/A"} />
            </Col>
            <Col md={6}>
              <DetailItem label="Department" value={employee.department?.name || "N/A"} />
            </Col>
            <Col md={6}>
              <DetailItem label="Employment Type" value={employee.employment_type?.title || "N/A"} />
            </Col>
            <Col md={6}>
              <DetailItem label="Joining Date" value={employee.joining_date} />
            </Col>
            <Col md={6}>
              <DetailItem label="Salary" value={`$${employee.salary}`} />
            </Col>
            <Col md={6}>
              <DetailItem label="Bank Account Number" value={employee.bank_account_number} />
            </Col>
            <Col md={6}>
              <DetailItem label="IFSC Code" value={employee.ifsc_code} />
            </Col>
            <Col md={6}>
              <DetailItem label="Emergency Contact" value={employee.emergency_contact} />
            </Col>
            <Col md={6}>
              <DetailItem 
                label="Created By" 
                value={`${employee.created_by?.name || "N/A"} (${employee.formatted_created_at || "N/A"})`} 
              />
            </Col>
            <Col md={6}>
              <DetailItem 
                label="Updated By" 
                value={`${employee.updated_by?.name || "N/A"} (${employee.formatted_updated_at || "N/A"})`} 
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button
              variant="primary"
              onClick={() => navigate(-1)}
            >
              Back to List
            </Button>
            <Button
              variant="success"
              onClick={() => navigate(`/employee/edit/${id}`)}
            >
              Edit
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="min-vh-100 bg-light">
      <Header
        title="Employee Management"
        isAuthenticated={isAuthenticated}
        onLogout={logoutUser}
        userEmail={user?.email}
      />
      <Container className="py-4">
        {renderContent()}
      </Container>
    </div>
  );
};

export default EmployeeDetails;