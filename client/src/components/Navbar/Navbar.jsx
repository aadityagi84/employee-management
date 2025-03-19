import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const svgLogo = `https://flowbite.com/docs/images/logo.svg`;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/dashboard/employees", label: "Employees" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    console.log("Logout");
    Cookies.remove("token");
    logout();
    navigate("/");
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={svgLogo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Employee Management
          </span>
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={() => handleLogout()}
            className="text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center bg-red-600 "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
