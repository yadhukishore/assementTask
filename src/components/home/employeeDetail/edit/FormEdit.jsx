import React from "react";

const EditEmployeeForm = ({ formData, onChange, onFileChange, onSubmit, onCancel }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
        <form onSubmit={onSubmit}>
          {Object.keys(formData).map((key) => (
            <label key={key} className="block mb-2">
              {key.replace(/_/g, " ").toUpperCase()}:
              <input
                type={key.includes("date") ? "date" : "text"}
                name={key}
                value={formData[key]}
                onChange={onChange}
                className="w-full border p-2 rounded mt-1"
                required
              />
            </label>
          ))}
          <label className="block mb-2">
            Profile Picture:
            <input type="file" accept="image/*" onChange={onFileChange} className="w-full border p-2 rounded mt-1" />
          </label>
          <div className="mt-4 flex gap-4">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeForm;
