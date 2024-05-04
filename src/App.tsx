import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

//Components
import { ToastContainer } from 'react-toastify';
import Sidebar from "./Components/Sidebar";
import Header from "./Components/header";

import RouteComponent from "./Route";
import ContactList from "./Components/Contact";
const App: React.FC = () => {
 const [c,setC]=useState(0);

 const dash =() => {
  setC(1);
 }
 const dash1 =() => {
  setC(0);
 }
  return (
    <div>
      <ToastContainer />
      <Header/>
      
      <div className="flex">
     
      <Sidebar dash={dash} dash1={dash1}/>
      {c !== 1 && <ContactList/>}
        <RouteComponent/>
      </div>
    </div>
  );
};

export default App;