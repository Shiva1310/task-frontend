import React,{useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { createTask } from "./tasksSlice";
import Snackbar from "../../components/Snackbar";
import * as Yup from "yup";

// Yup validation schema
const schema = Yup.object({
  title: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
  description: Yup.string().min(10, "Description must be at least 10 characters").required("Description is required"),
  status: Yup.string().oneOf(["pending", "in-progress", "completed"]).required("Status is required"),
  dueDate: Yup.date().required("Due date is required"),
});

export default function TaskForm({ onSuccess }) {
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      type: "error", 
    });
  
const today = new Date().toISOString().split("T")[0]; 

  return (
    <>
    <Formik
      initialValues={{
        title: "",
        description: "",
        status: "pending",
        dueDate: "",
      }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          await dispatch(createTask(values)).unwrap();
          resetForm();
                      setSnackbar({ open: true, message: "Task created successfully!", type: "success" });

          onSuccess && onSuccess();
        } catch (err) {
            console.log("erorr",err)
            setSnackbar({ open: true, message: err || "Failed to create task", type: "error" });    

        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="p-4 bg-white rounded shadow mb-4">
          <div className="grid grid-cols-1 gap-2">
            {/* Title */}
            <Field name="title" placeholder="Title" className="p-2 border rounded" />
            <ErrorMessage name="title" component="p" className="text-red-500 text-sm" />

            {/* Description */}
            <Field as="textarea" name="description" placeholder="Description" className="p-2 border rounded" />
            <ErrorMessage name="description" component="p" className="text-red-500 text-sm" />

            {/* Status */}
            <Field as="select" name="status" className="p-2 border rounded">
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </Field>

            {/* Due Date */}
            <Field name="dueDate" type="date" className="p-2 border rounded"  min={today}/>
            <ErrorMessage name="dueDate" component="p" className="text-red-500 text-sm" />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white p-2 rounded"
            >
              {isSubmitting ? "Creating..." : "Create Task"}
            </button>
          </div>
        </Form>
      )}
      
    </Formik>
     <Snackbar
            open={snackbar.open}
            message={snackbar.message}
            type={snackbar.type}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          />
    </>
  );
}
