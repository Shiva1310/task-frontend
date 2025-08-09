import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "./tasksSlice";
import Snackbar from "../../components/Snackbar";

export default function TaskItem({ task, onDeleted }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "error",
  });
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate?.split("T")[0] || "",
  });

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task._id)).unwrap();
      setSnackbar({
        open: true,
        message: "Task deleted successfully!",
        type: "success",
      });
      onDeleted && onDeleted();
      
    } catch (err) {
      setSnackbar({
        open: true,
        message: err || "Failed to delete the task",
        type: "error",
      });
    }
  };

  const handleUpdate = async (e) => {
    try{
    e.preventDefault();
    await dispatch(updateTask({ id: task._id, data: formData })).unwrap();
    setIsEditing(false);
    onDeleted && onDeleted();
    setSnackbar({
        open: true,
        message: "Task updated successfully!",
        type: "success",
      });
    }
    catch(err){
 setSnackbar({
        open: true,
        message: err || "Failed to update the task",
        type: "error",
      });
    }
  };
  console.log("formdata", formData);
  if (isEditing) {
    return (
      <form
        onSubmit={handleUpdate}
        className="p-4 border rounded bg-gray-50 space-y-2"
      >
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="p-2 border rounded w-full"
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="p-2 border rounded w-full"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In-progress</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          className="p-2 border rounded w-full"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-4 py-1 rounded"
          >
            Cancel
          </button>
        </div>
        <Snackbar
                    open={snackbar.open}
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                  />
      </form>
    );
  }

  return (
    <>
    <li className="p-4 border rounded flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-500">Status: {task.status}</p>
        <p className="text-sm text-gray-500">
          Due:{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
        </p>
      </div>
      <div className="mt-2 sm:mt-0 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
     
    </li>
     <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                type={snackbar.type}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
              />
    </>
  );
}
