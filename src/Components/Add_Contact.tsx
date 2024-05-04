import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface Contact {
  id: string;
  LastName: string;
  FirstName: string;
  Status: string;
}

const Add_Contact = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [status, setstatus] = useState("");

  const contacts = useSelector((state: Contact[]) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOptionChange = (option: string, done: string) => {
    setSelectedOption(option);
    setstatus(done);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!first_name || !last_name || !status) {
      return toast.warning("Please fill in all details");
    }

    // Check if contact list is empty
    let id = "0";
    if (contacts.length > 0) {
      id = String(Number(contacts[contacts.length - 1].id) + 1);
    }

    // Create new contact object
    const data: Contact = {
      id: id,
      FirstName: first_name,
      LastName: last_name,
      Status: status,
    };

    // Dispatch action to add contact
    dispatch({ type: "ADD_CONTACT", payload: data });

    // Show success message and navigate to home
    toast.success("Contact added successfully");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-3xl font-bold text-center my-10">Create Contact</h1>
        <div className="w-full md:w-1/2 mx-auto shadow-md rounded-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="first_name" className="block text-sm font-bold mb-2">
                First Name
              </label>
              <input
                id="first_name"
                value={first_name}
                type="text"
                placeholder="First Name"
                onChange={(event) => setfirst_name(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="last_name" className="block text-sm font-bold mb-2">
                Last Name
              </label>
              <input
                id="last_name"
                value={last_name}
                type="text"
                placeholder="Last Name"
                onChange={(event) => setlast_name(event.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Status</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="active"
                  name="status"
                  value="Active"
                  className="mr-2"
                  checked={selectedOption === "active"}
                  onChange={(event) => handleOptionChange("active", event.target.value)}
                />
                <label htmlFor="active" className="mr-4">
                  Active
                </label>
                <input
                  type="radio"
                  id="inactive"
                  name="status"
                  value="Inactive"
                  className="mr-2"
                  checked={selectedOption === "Inactive"}
                  onChange={(event) => handleOptionChange("Inactive", event.target.value)}
                />
                <label htmlFor="inactive">Inactive</label>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="submit"
                value="Add Contact"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Contact;
