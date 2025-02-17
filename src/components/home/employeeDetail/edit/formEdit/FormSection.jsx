import React from "react";

const FormSection = ({ title, children, icon }) => {
  return (
    <div className="mt-4 p-3 border rounded bg-light">
      <h3 className="h5 mb-3 d-flex align-items-center">
        {icon && <span className="me-2">{icon}</span>}
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FormSection;