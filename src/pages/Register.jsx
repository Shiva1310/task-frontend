import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../components/InputField';
import { registerUser } from '../features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Snackbar from '../components/Snackbar';
import { useState } from 'react';

export default function Register(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);
 const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "error", // success, error, warning, info
  });
  const initialValues = { name: '', email: '', password: '' };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
    .min(6, 'Min 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    )
    .required('Password is required'),
  });

  const handleSubmit = async(values) => {
      try {
          await dispatch(registerUser(values)).unwrap();
          navigate("/tasks");
                setSnackbar({ open: true, message: "Registered successfully!", type: "success" });
    
        } catch (err) {
            console.log("eerr", err)
    setSnackbar({ open: true, message: err || "Failed to update task", type: "error" });    }
      
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => navigate('/login'), 1500); 
    }
  }, [success, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="bg-red-100 text-red-600 p-2 mb-4 rounded">{error}</p>}
        {success && <p className="bg-green-100 text-green-600 p-2 mb-4 rounded">{success}</p>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <InputField
                label="Name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
              />
              <InputField
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
              />

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
          )}
        </Formik>
        <p className="text-sm text-center mt-4">
          Already Registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
        <Snackbar
              open={snackbar.open}
              message={snackbar.message}
              type={snackbar.type}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
    </div>
  );
};


