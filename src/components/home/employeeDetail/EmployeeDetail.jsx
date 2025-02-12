import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeDetails } from "../../../hooks/useEmployees";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, error, isLoading } = useEmployeeDetails(id);

  if (isLoading) return <p className="text-blue-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error fetching details: {error.message}</p>;
  if (!employee) return <p className="text-gray-500">No employee found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Employee Details</h2>

        {employee.profile_picture && (
          <div className="mb-4 text-center">
            <img
              src={employee.profile_picture}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
          </div>
        )}

        <p><strong>Employee ID:</strong> {employee.employee_code}</p>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Gender:</strong> {employee.gender}</p>
        <p><strong>Date of Birth:</strong> {employee.date_of_birth}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <p><strong>City:</strong> {employee.city}</p>
        <p><strong>State:</strong> {employee.state}</p>
        <p><strong>Zip Code:</strong> {employee.zip_code}</p>
        <p><strong>Country:</strong> {employee.country}</p>
        <p><strong>Designation:</strong> {employee.designation?.title || "N/A"}</p>
        <p><strong>Department:</strong> {employee.department?.name || "N/A"}</p>
        <p><strong>Employment Type:</strong> {employee.employment_type_id}</p>
        <p><strong>Joining Date:</strong> {employee.joining_date}</p>
        <p><strong>Salary:</strong> ${employee.salary}</p>
        <p><strong>Bank Account Number:</strong> {employee.bank_account_number}</p>
        <p><strong>IFSC Code:</strong> {employee.ifsc_code}</p>
        <p><strong>Emergency Contact:</strong> {employee.emergency_contact}</p>

        {/* Buttons */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to List
          </button>
          <button
            onClick={() => navigate(`/employee/edit/${id}`)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
