import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="">
        <div>
          <Navbar />
        </div>
        <div className=" mt-20 w-[90%] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
