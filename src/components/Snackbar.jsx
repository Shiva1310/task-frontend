import { useEffect } from "react";

export default function Snackbar({ open, message, type = "error", onClose }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // auto close after 3s
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500",
  };

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`${typeClasses[type]} text-white px-4 py-2 rounded shadow-lg transition-all duration-300`}
      >
        {message}
      </div>
    </div>
  );
}
