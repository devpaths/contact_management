import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Edit_Contact from "./Components/edit_Contact";
//Components
import { ToastContainer } from 'react-toastify';
import Sidebar from "./Components/Sidebar";
import Header from "./Components/header";

import RouteComponent from "./Route";
import ContactList from "./Components/Contact";
import Add_Contact from "./Components/Add_Contact";
import Dashboard from "./Components/Monitor";

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const [c,setC]=useState(0);

 const dash =() => {
  setC(1);
 }
 const dash1 =() => {
  setC(0);
 }
 useEffect(() => {
  if (location.pathname === "/Monitor") {
    setC(1);
  }
},[location.pathname]);


  return (
    <div>
      <ToastContainer />
      <Header/>
      
      <div className="flex">
     
      <Sidebar dash={dash} dash1={dash1}/>
      {c !== 1 && <ContactList dash3={dash} dash4={dash}/>
      }
      
      <Routes>
      <Route path="/add_contact" element={<Add_Contact dash6={dash1}/>} />
      <Route path="/Monitor" element={<Dashboard/>} />
      <Route path="/edit/:id" element={<Edit_Contact dash5={dash1} />} />
    </Routes>
      </div>
    </div>
  );
};

export default App;