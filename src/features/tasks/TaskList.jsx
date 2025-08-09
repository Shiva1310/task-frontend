import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./tasksSlice";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const dispatch = useDispatch();
  const { items, page, pages } = useSelector((s) => s.tasks);
  const [filters, setFilters] = useState({ page: 1, limit: 4, status: "", dueDate: "" });

  useEffect(() => {
    dispatch(fetchTasks(filters));
  }, [dispatch, filters]);

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      {/* Responsive flex container */}
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Create Task Form */}
        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Create Task</h2>
          <TaskForm onSuccess={() => dispatch(fetchTasks(filters))} />
        </div>

        {/* Divider */}
        <div className="w-full h-px md:w-px md:h-auto bg-gray-300"></div>

        {/* Task List */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Task List</h2>

          {/* Filters */}
          <div className="mb-4 flex gap-2 flex-wrap">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
              className="p-2 border rounded"
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In-progress</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="date"
              value={filters.dueDate}
              onChange={(e) => setFilters({ ...filters, dueDate: e.target.value, page: 1 })}
              className="p-2 border rounded"
            />
          </div>

          {/* Task Items */}
          <ul className="space-y-3">
            {items.map((t) => (
              <TaskItem key={t._id} task={t} onDeleted={() => dispatch(fetchTasks(filters))} />
            ))}
          </ul>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center">
            <button
              disabled={filters.page <= 1}
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              className="p-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <div>
              Page {filters.page} / {pages}
            </div>
            <button
              disabled={filters.page >= pages}
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              className="p-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
