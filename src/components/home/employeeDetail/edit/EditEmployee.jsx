import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEmployeeDetails } from "../../../../hooks/useEmployees";
import EditEmployeeForm from "./FormEdit";
import Header from "../../header/Header";
import { useAuth } from "../../../../hooks/useAuth";
import { useAuthActions } from "../../../../services/authService";

const EMPLOYEE_UPDATE_API = "https://core-skill-test.webc.in/employee-portal/api/v1/employee/update";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employee, isLoading, error, mutate } = useEmployeeDetails(id);
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { logoutUser } = useAuthActions();

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        designation_id: employee.designation?.id || "",
        department_id: employee.department?.id || "",
        gender: employee.gender || "",
        date_of_birth: employee.date_of_birth || "",
        address: employee.address || "",
        city: employee.city || "",
        state: employee.state || "",
        zip_code: employee.zip_code || "",
        country: employee.country || "",
        employment_type_id: employee.employment_type_id || "",
        joining_date: employee.joining_date || "",
        salary: employee.salary || "",
        bank_account_number: employee.bank_account_number || "",
        ifsc_code: employee.ifsc_code || "",
        emergency_contact: employee.emergency_contact || "",
        employee_code: employee.employee_code || "",
      });
    }
  }, [employee]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header
          title="Employee Management"
          isAuthenticated={isAuthenticated}
          onLogout={logoutUser}
          userEmail={user?.email}
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header
          title="Employee Management"
          isAuthenticated={isAuthenticated}
          onLogout={logoutUser}
          userEmail={user?.email}
        />
        <div className="container mx-auto p-6">
          <div className="bg-red-50 p-4 rounded-lg text-red-500 text-center">
            <h3 className="font-bold">Error loading employee details</h3>
            <p>{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      alert("File size should not exceed 5MB");
      e.target.value = null;
      return;
    }
    setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) { // Only append if value exists
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append("id", id);
      
      if (profilePicture) {
        formDataToSend.append("profile_picture", profilePicture);
      }

      const response = await axios.post(EMPLOYEE_UPDATE_API, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Optimistically update the cache
      await mutate({ ...employee, ...formData }, false);
      
      // Then revalidate to make sure our optimistic update was correct
      await mutate();
      
      navigate(`/employee/${id}`);
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message);
      console.error("Update error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title="Employee Management"
        isAuthenticated={isAuthenticated}
        onLogout={logoutUser}
        userEmail={user?.email}
      />
      <EditEmployeeForm
        formData={formData}
        onChange={handleChange}
        onFileChange={handleFileChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        isSubmitting={isSubmitting}
        submitError={submitError}
        currentImage={employee?.profile_picture}
      />
    </div>
  );
};

export default EditEmployee;