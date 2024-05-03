import React from "react";
import { Link } from "react-router-dom";
import Add_Contact from "./Add_Contact"

const Header = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-800 text-white h-16 w-full flex justify-between items-center px-4">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Contact Page</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
