const InputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  icon,
  showPasswordToggle,
  onTogglePassword,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{placeholder}</label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">{icon}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`pl-10 pr-10 py-2 w-full border rounded-md focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-3 text-gray-400 focus:outline-none"
          >
            {showPasswordToggle}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;