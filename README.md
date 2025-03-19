# Employee Management System

This is a full-stack Employee Management System built with Basic React (frontend) and Node.js with SQLite (backend). The application allows users to manage employees, including adding, updating, deleting, and viewing employee details. It also includes user authentication with registration and login functionality.

## Features

- **User Authentication**: Register and login functionality with password hashing and JWT-based authentication.
- **Employee Management**:
  - View a list of employees.
  - Add new employees.
  - Update employee details.
  - Delete employees.
  - View detailed information about an employee.
- **Frontend**: Built with React and TailwindCSS for a responsive and modern UI.
- **Backend**: Built with Node.js and SQLite for a lightweight and efficient database.

## Project Structure

### Backend

- **`index.js`**: Entry point for the backend server.
- **`config/db.js`**: SQLite database configuration and initialization.
- **`controllers/`**: Contains controllers for handling user and employee-related requests.
- **`helpers/`**: Contains validation helpers for user input.
- **`routes/`**: Defines API routes for user authentication and employee management.

### Frontend

- **`client/src/`**: Contains React components, pages, and routes.
- **`client/src/components/`**: Reusable components like `Login`, `Navbar`, and `Register`.
- **`client/src/Pages/`**: Pages like `Employees` and `Home`.
- **`client/src/Routes/`**: Defines protected and user routes.
- **`client/src/Context/`**: Context for managing authentication state.
- **`client/src/Constants/Utils.jsx`**: Contains API endpoint constants.

---

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- SQLite

### Steps to Install and Run

1. **Clone the Repository**
   ```bash
   git clone https://aadityagi84/employee-management.git
   cd employee-management
   ```
1. **Backend Setup**
   ```bash
   cd employee-management
   ```

- Install dependencies:
  ```bash
    npm install
  ```
- Create a .env file in the root directory and add the following:
  ```bash
   PORT=8080
   JWT_SECRET=your-secret-key
  ```
- Start the backend server:
  ```bash
    npm start
  ```

3. **Frontend Setup**
   ```bash
   cd client
   ```

- Install dependencies:

```bash
  npm install
```

- Create a .env file in the client directory and add the following:

```bash
  VITE_BACKEND_URL=http://localhost:8080
```

- Start the frontend development server:

```bash
  npm run dev
```

4. **Access the Application**

- Open your browser and navigate to http://localhost:5173 to access the frontend.
- The backend API will be running at http://localhost:8080.

5. **Contact**

- For any questions or feedback, please contact tyagiadityagi@gmail.com.
