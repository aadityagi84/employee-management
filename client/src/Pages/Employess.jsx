import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { apiData } from "../Constants/Utils";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
  });
  const [updateEmployee, setUpdateEmployee] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(apiData.getEmployees);
      console.log("get data:", response.data);
      if (Array.isArray(response.data.data)) {
        setEmployees(response.data.data);
      } else {
        console.error("Response data.data is not an array:", response.data);
        setEmployees([]);
        setError("Invalid data format from server");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
      setError(
        "Failed to fetch employees: " + (error.message || "Unknown error")
      );
    }
  };

  const handleDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateEmployee({ ...updateEmployee, [name]: value });
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(apiData.getEmployeeById(id));
      console.log(res);
      alert(res.data.message);
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiData.getEmployees, newEmployee);
      fetchEmployees();
      setNewEmployee({
        name: "",
        position: "",
        department: "",
        email: "",
        phone: "",
      });
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding employee:", error);
      setError(error.response?.data?.error || "Failed to add employee");
    }
  };

  const handleUpdateClick = async (id) => {
    try {
      const response = await axios.get(apiData.getEmployeeById(id));
      console.log("Response from getEmployeeById:", response.data);
      const employeeData = response.data.data || response.data;
      if (employeeData && typeof employeeData === "object") {
        setUpdateEmployee(employeeData);
        setShowUpdateModal(true);
      } else {
        console.error(
          "Expected employee data not found in response:",
          response.data
        );
        setError("Failed to load employee data for update");
      }
    } catch (error) {
      console.error(
        "Error fetching employee for update:",
        error.response || error.message
      );
      setError(
        "Failed to fetch employee: " + (error.message || "Unknown error")
      );
    }
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        apiData.getEmployeeById(selectedEmployee.id),
        updateEmployee
      );
      fetchEmployees();
      setShowUpdateModal(false);
      // Do NOT close the details modal here, so it stays open
    } catch (error) {
      console.error("Error updating employee:", error);
      setError(error.response?.data?.error || "Failed to update employee");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="relative overflow-x-auto ">
        <table className="w-[60%] mx-auto text-sm text-left shadow-md sm:rounded-lg border  text-gray-700 bg-white rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3 text-right">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  onClick={() => setShowAddModal(true)}
                >
                  Add New Employee
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.position}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      onClick={() => handleDetails(employee)}
                    >
                      More Details
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded transition-colors"
                      onClick={() => handleDelete(employee.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Add New Employee
            </h2>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              {["name", "position", "department", "email", "phone"].map(
                (field) => (
                  <input
                    key={field}
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    value={newEmployee[field]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${
                      field.charAt(0).toUpperCase() + field.slice(1)
                    }`}
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                )
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Employee Details Modal */}
      {showDetails && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {selectedEmployee.name}
            </h2>
            <p className="text-gray-700">
              <strong>Position:</strong> {selectedEmployee.position}
            </p>
            <p className="text-gray-700">
              <strong>Department:</strong> {selectedEmployee.department}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {selectedEmployee.email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {selectedEmployee.phone}
            </p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                onClick={() => handleUpdateClick(selectedEmployee.id)}
              >
                Update
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                onClick={() => {
                  setShowDetails(false);
                  setShowUpdateModal(false); // Close update modal if open
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Employee Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[60]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Update Employee
            </h2>
            <form onSubmit={handleUpdateEmployee} className="space-y-4">
              {["name", "position", "department", "email", "phone"].map(
                (field) => (
                  <input
                    key={field}
                    type={
                      field === "email"
                        ? "email"
                        : field === "phone"
                        ? "tel"
                        : "text"
                    }
                    name={field}
                    value={updateEmployee[field] || ""}
                    onChange={handleUpdateInputChange}
                    placeholder={`Enter ${
                      field.charAt(0).toUpperCase() + field.slice(1)
                    }`}
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                )
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
