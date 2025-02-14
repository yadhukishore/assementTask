import React from "react";
import { genderOptions } from "../../../../utils/genderMapping";

const EditEmployeeForm = ({
  formData,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
  isSubmitting,
  submitError,
  currentImage
}) => {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Employee</h2>
        
        {submitError && (
          <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-lg">
            {submitError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Profile Picture Section */}
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
                className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <FormField
                label="Name"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                required
              />
              <FormField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                required
              />
              <label className="block">
                <span className="text-gray-700">Gender</span>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  required
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Additional Fields */}
            <div className="space-y-4">
              <FormField
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={onChange}
              />
              <FormField
                label="Employee Code"
                name="employee_code"
                value={formData.employee_code}
                onChange={onChange}
                required
              />
              <FormField
                label="Salary"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={onChange}
                required
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Address Information</h3>
            <FormField
              label="Address"
              name="address"
              value={formData.address}
              onChange={onChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="City"
                name="city"
                value={formData.city}
                onChange={onChange}
              />
              <FormField
                label="State"
                name="state"
                value={formData.state}
                onChange={onChange}
              />
              <FormField
                label="Zip Code"
                name="zip_code"
                value={formData.zip_code}
                onChange={onChange}
              />
              <FormField
                label="Country"
                name="country"
                value={formData.country}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Bank Information */}
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold text-gray-700">Bank Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Bank Account Number"
                name="bank_account_number"
                value={formData.bank_account_number}
                onChange={onChange}
              />
              <FormField
                label="IFSC Code"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={onChange}
              />
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
        </form>
      </div>
    </div>
  );
};
const FormField = ({ label, name, type = "text", value, onChange, required = false }) => (
  <label className="block">
    <span className="text-gray-700">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
    />
  </label>
);

export default EditEmployeeForm;