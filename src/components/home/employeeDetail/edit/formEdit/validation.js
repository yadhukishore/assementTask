export const requiredField = (field) => (value) => !value ? `${field} is required` : undefined;

export const validateJoiningDate = (value) => {
  if (!value) return "Joining Date is required";
  
  const selectedDate = new Date(value);
  const todayDate = new Date();
  selectedDate.setHours(0, 0, 0, 0);
  todayDate.setHours(0, 0, 0, 0);
  
  if (selectedDate > todayDate) {
    return "Joining Date cannot be in the future";
  }
  
  return undefined;
};

export const validatePhone = (value) => {
  if (!value) return "Phone is required";
  if (value.replace(/\D/g, "").length < 12) return "Phone number not valid";
  return undefined;
};