const apiUrl = import.meta.env.VITE_BACKEND_URL;

export const apiData = {
  login: `${apiUrl}/api/login`,
  register: `${apiUrl}/api/register`,

  // Employees section
  getEmployees: `${apiUrl}/api/employees`,
  getEmployeeById: (id) => `${apiUrl}/api/employees/${id}`,
};
