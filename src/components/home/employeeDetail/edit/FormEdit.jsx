import React from "react";
import { Form, Input, Select } from "informed";
import { genderOptions } from "../../../../utils/genderMapping";

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
    <div className="container mx-auto py-6 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Employee</h2>
        
        {submitError && (
          <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-lg">
            {submitError}
          </div>
        )}

        <Form 
          onSubmit={handleSubmit} 
          initialValues={formData}
          className="space-y-4"
        >
          <div className="mb-6">
            {currentImage && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Profile Picture:</p>
                <img
                  src={currentImage}
                  alt="Current profile"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
            <label className="block">
              <span className="text-gray-700">Update Profile Picture:</span>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <FormField label="Name" name="name" />
              <FormField label="Email" name="email" type="email" />
              <FormField label="Phone" name="phone" />
              <label className="block">
                <span className="text-gray-700">Gender</span>
                <Select
                  name="gender"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </label>
            </div>

            <div className="space-y-4">
              <FormField label="Date of Birth" name="date_of_birth" type="date" />
              <FormField label="Employee Code" name="employee_code" />
              <FormField label="Salary" name="salary" type="number" />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Address Information</h3>
            <FormField label="Address" name="address" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="City" name="city" />
              <FormField label="State" name="state" />
              <FormField label="Zip Code" name="zip_code" />
              <FormField label="Country" name="country" />
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Bank Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Bank Account Number" name="bank_account_number" />
              <FormField label="IFSC Code" name="ifsc_code" />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving...." : "Save Changes"}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const FormField = ({ label, name, type = "text" }) => (
  <label className="block">
    <span className="text-gray-700">{label}</span>
    <Input
      type={type}
      name={name}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
  </label>
);

export default EditEmployeeForm;
