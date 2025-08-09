import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/auth/Login";
import TaskList from "./features/tasks/TaskList";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/tasks" element={
          <ProtectedRoute>
            <Navbar/>
            <TaskList/></ProtectedRoute>
        }/>
        <Route path="*" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}
