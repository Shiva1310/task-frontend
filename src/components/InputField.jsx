const InputField = ({ label, type, name, value, onChange, onBlur, error, touched }) => {
  return (
    <div className="mb-4">
      <label className="block text-left font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error && touched ? 'border-red-500 ring-red-200' : 'border-gray-300'
        }`}
      />
      {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
