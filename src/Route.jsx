import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Add_Contact from "./Components/Add_Contact";
import Dashboard from "./Components/Monitor";
import Edit_Contact from "./Components/edit_Contact";
import ContactList from "./Components/Contact";

const RouteComponent = () => {
  return (
    <Routes>
      <Route path="/add_contact" element={<Add_Contact />} />
      <Route path="/Monitor" element={<Dashboard />} />
      <Route path="/edit/:id" element={<Edit_Contact />} />
    </Routes>
  );
};

export default RouteComponent;
