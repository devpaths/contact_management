import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({dash,dash1}) => {
// const [dash,setdash]=useState("");
    return (
        
        <div className="flex h-screen">
          <div className="bg-gray-800 text-white w-60 h-200">
            <ul>
              <li className="mt-8 py-4 px-6">
                <Link to="/" onClick={dash1} className="block hover:pl-2 rounded-lg transition-all duration-300">
                  Contact
                </Link>
              </li>
              <li className="py-2 px-6">
                <Link to="/Monitor" onClick={dash} className="block hover:pl-2 rounded-lg transition-all duration-300">
                  Charts and Maps
                </Link>
              </li>
            </ul>
            <div className="absolute bottom-10 left-4 font-bold">Dashboard</div>

          </div>
          
        </div>
        
  );
};

export default Sidebar;
