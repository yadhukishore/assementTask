import React from "react";
import { Form as InformedForm, Input, Select } from "informed";
import { Container, Row, Col, Form, Button, Card, Alert, Image } from 'react-bootstrap';
import { genderOptions } from "../../../../utils/genderMapping";
import { showErrorToast } from "../../../../utils/toastMessage";

const FormField = ({ label, name, type = "text" }) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Input
      type={type}
      name={name}
      className="form-control"
    />
  </Form.Group>
);

const EditEmployeeForm = ({
  formData,
  onFileChange,
  onSubmit,
  onCancel,
  isSubmitting,
  submitError,
  currentImage
}) => {
  const handleSubmit = async ({ values }) => {
    if (!values.phone) {
      showErrorToast("Please enter phone number.");
      return;
    }
    else if (!values.name) {
      showErrorToast("Please add name.");
      return;
    }
    else if(!values.email) {
      showErrorToast("Please add email.");
      return;
    }
    else if (!values.date_of_birth) {
      showErrorToast("Please add date of birth.");
      return;
    }
    else if (!values.zip_code) {
      showErrorToast("Please zip code.");
      return;
    }
    else if (!values.bank_account_number) {
      showErrorToast("Please add bank account number.");
      return;
    }
    else if (!values.ifsc_code) {
      showErrorToast("Please add ifsc code.");
      return;
    }
    
    const formattedData = {
      id: formData.id,
      name: values.name || formData.name,
      email: values.email || formData.email,
      phone: values.phone || formData.phone,
      gender: values.gender || formData.gender,
      date_of_birth: values.date_of_birth || formData.date_of_birth,
      employee_code: values.employee_code || formData.employee_code,
      salary: values.salary || formData.salary,
      address: values.address || formData.address,
      city: values.city || formData.city,
      state: values.state || formData.state,
      zip_code: values.zip_code || formData.zip_code,
      country: values.country || formData.country,
      bank_account_number: values.bank_account_number || formData.bank_account_number,
      ifsc_code: values.ifsc_code || formData.ifsc_code,
      designation_id: values.designation_id || formData.designation_id,
      department_id: values.department_id || formData.department_id,
      employment_type_id: values.employment_type_id || formData.employment_type_id,
      joining_date: values.joining_date || formData.joining_date,
      emergency_contact: values.emergency_contact || formData.emergency_contact
    };
    
    const cleanedData = Object.fromEntries(
      Object.entries(formattedData).filter(([_, value]) => value != null)
    );

    onSubmit(cleanedData);
  };

  return (
    <Container className="py-4">
      <Card className="mx-auto" style={{ maxWidth: '768px' }}>
        <Card.Body className="p-4">
          <h2 className="mb-4 fw-bold">Edit Employee</h2>
          
          {submitError && (
            <Alert variant="danger" className="mb-4">
              {submitError}
            </Alert>
          )}

          <InformedForm 
            onSubmit={handleSubmit} 
            focusOnInvalid={true}
            initialValues={formData}
          >
            <div className="mb-4">
              {currentImage && (
                <div className="mb-3">
                  <Form.Label className="text-muted mb-2">Current Profile Picture:</Form.Label>
                  <Image
                    src={currentImage}
                    alt="Current profile"
                    style={{ width: '128px', height: '128px', objectFit: 'cover' }}
                    className="rounded"
                  />
                </div>
              )}
              <Form.Group>
                <Form.Label>Update Profile Picture:</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  size="sm"
                />
              </Form.Group>
            </div>

            <Row>
              <Col md={6}>
                <FormField label="Name" name="name" />
                <FormField label="Email" name="email" type="email" />
                <FormField label="Phone" name="phone" />
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Select
                    name="gender"
                    className="form-select"
                  >
                    <option value="">Select Gender</option>
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <FormField label="Date of Birth" name="date_of_birth" type="date" />
                <FormField label="Employee Code" name="employee_code" />
                <FormField label="Salary" name="salary" type="number" />
              </Col>
            </Row>

            <div className="mt-4">
              <h3 className="h5 mb-3">Address Information</h3>
              <FormField label="Address" name="address" />
              <Row>
                <Col md={6}>
                  <FormField label="City" name="city" />
                  <FormField label="State" name="state" />
                </Col>
                <Col md={6}>
                  <FormField label="Zip Code" name="zip_code" />
                  <FormField label="Country" name="country" />
                </Col>
              </Row>
            </div>

            <div className="mt-4">
              <h3 className="h5 mb-3">Bank Information</h3>
              <Row>
                <Col md={6}>
                  <FormField label="Bank Account Number" name="bank_account_number" />
                </Col>
                <Col md={6}>
                  <FormField label="IFSC Code" name="ifsc_code" />
                </Col>
              </Row>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button
                variant="light"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving...." : "Save Changes"}
              </Button>
            </div>
          </InformedForm>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditEmployeeForm;