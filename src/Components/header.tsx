import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Determine the title based on the current location
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Contact Page";
      case "/Monitor":
        return "Charts and Maps";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-gray-800 text-white h-16 w-full  flex justify-between  px-4">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">{getTitle()}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
