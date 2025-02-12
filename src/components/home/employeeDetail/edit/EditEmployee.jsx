import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEmployeeDetails } from "../../../../hooks/useEmployees";
import EditEmployeeForm from "./FormEdit";

const EMPLOYEE_UPDATE_API = "https://core-skill-test.webc.in/employee-portal/api/v1/employee/update";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, error, isLoading, mutate } = useEmployeeDetails(id);
  const [formData, setFormData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      formDataToSend.append("id", id);
      if (profilePicture) {
        formDataToSend.append("profile_picture", profilePicture);
      }

      await axios.post(EMPLOYEE_UPDATE_API, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      mutate({ ...employee, ...formData });
      navigate(`/employee/${id}`);
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
    }
  };

  return (
    <EditEmployeeForm
      formData={formData}
      onChange={handleChange}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
};

export default EditEmployee;
