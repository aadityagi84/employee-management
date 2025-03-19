import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import ProtectedRoute from "./ProctedRoute";
import Navbar from "../components/Navbar/Navbar";
import Register from "../components/Register/Register";
import Home from "../Pages/Home";
import Employess from "../Pages/Employess";

const UserRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <ProtectedRoute>
                <Employess />
              </ProtectedRoute>
            }
          />
          <Route
            path="employees/:id"
            element={
              <ProtectedRoute>
                <h2>Hello</h2>
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <div>
              <h2>404 Not Found</h2>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default UserRoute;
