import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEmployeeDetails } from "../../../hooks/useEmployees";
import { getGenderLabel } from "../../../utils/genderMapping";
import Header from "../header/Header";
import { useAuth } from "../../../hooks/useAuth";
import { useAuthActions } from "../../../services/authService";

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, error, isLoading } = useEmployeeDetails(id);
  const { isAuthenticated, user } = useAuth();
  const { logoutUser } = useAuthActions();

  if (isLoading) return <p className="text-blue-500 text-center mt-8">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">Error fetching details: {error.message}</p>;
  if (!employee) return <p className="text-gray-500 text-center mt-8">No employee found.</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title="Employee Management"
        isAuthenticated={isAuthenticated}
        onLogout={logoutUser}
        userEmail={user?.email}
      />
      <div className="container mx-auto p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Employee Details</h2>

          {employee.profile_picture && (
            <div className="flex justify-center mb-6">
              <img
                src={employee.profile_picture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DetailItem label="Employee ID" value={employee.employee_code} />
            <DetailItem label="Name" value={employee.name} />
            <DetailItem label="Email" value={employee.email} />
            <DetailItem label="Phone" value={employee.phone} />
            <DetailItem label="Gender" value={getGenderLabel(employee.gender)} />
            <DetailItem label="Date of Birth" value={employee.date_of_birth} />
            <DetailItem label="Address" value={employee.address} />
            <DetailItem label="City" value={employee.city} />
            <DetailItem label="State" value={employee.state} />
            <DetailItem label="Zip Code" value={employee.zip_code} />
            <DetailItem label="Country" value={employee.country} />
            <DetailItem label="Designation" value={employee.designation?.title || "N/A"} />
            <DetailItem label="Department" value={employee.department?.name || "N/A"} />
            <DetailItem label="Employment Type" value={employee.employment_type_id} />
            <DetailItem label="Joining Date" value={employee.joining_date} />
            <DetailItem label="Salary" value={`$${employee.salary}`} />
            <DetailItem label="Bank Account Number" value={employee.bank_account_number} />
            <DetailItem label="IFSC Code" value={employee.ifsc_code} />
            <DetailItem label="Emergency Contact" value={employee.emergency_contact} />
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to List
            </button>
            <button
              onClick={() => navigate(`/employee/edit/${id}`)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-sm font-semibold text-gray-600">{label}</p>
    <p className="text-lg font-medium text-gray-800">{value}</p>
  </div>
);

export default EmployeeDetails;