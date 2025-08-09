import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "./authSlice";
import { useNavigate, Link } from "react-router-dom";
import Snackbar from "../../components/Snackbar";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: yupResolver(schema) });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "error", // success, error, warning, info
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/tasks");
            setSnackbar({ open: true, message: "Login successfully!", type: "success" });

    } catch (err) {
        console.log("eerr", err)
setSnackbar({ open: true, message: err || "Failed to update task", type: "error" });    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input {...register("email")} className="w-full p-2 border rounded" placeholder="Email" />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <input {...register("password")} type="password" className="w-full p-2 border rounded" placeholder="Password" />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
          <button disabled={isSubmitting} className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
        </form>
        <p className="text-sm text-center mt-4">
          New user?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register now
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
}
