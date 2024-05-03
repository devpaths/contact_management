import React from "react";

import "./App.css";
import { Routes , Route} from "react-router-dom";

//Components
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from "./Components/Sidebar";
import Contact from "./Components/Contact";
import Add_Contact from "./Components/Add_Contact";
import Edit_Contact from "./Components/edit_Contact";
import Header from "./Components/header";
import Dashboard from "./Components/Monitor";
const App: React.FC = () => {
  return (
    <div>
    <ToastContainer />
    <Header/>
  
    <div className="flex">
    <Sidebar/>
     
      <Routes>
        <Route>
        <Route path="/" element={<Contact/>}/>
            <Route path="/add_contact" element={<Add_Contact/>}/>
            <Route path="/Monitor" element={<Dashboard/>}/>
            <Route path="/edit/:id" element={<Edit_Contact/>}/>
        </Route>
        </Routes>
    </div>
    </div>
  );
};

export default App;
