import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

// Interface for defining the structure of a contact object
interface Contact {
  id: string,
  LastName: string,
  FirstName: string,
  Status: string,
}

// Functional component Edit_Contact
const Edit_Contact = ({dash5}) => {
  const { id } = useParams<{ id: string }>(); // Getting id parameter from URL
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  // State variables for storing contact details
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [status, setstatus] = useState("");

  // Accessing contact list from Redux store state
  const contactList = useSelector((state: Contact[]) => state);
  // Finding current contact based on id
  const currentContact = contactList.find(contact => contact.id === id);

  // useEffect hook to update state when current contact changes
  useEffect(() => {
    if (currentContact) {
      setfirst_name(currentContact.FirstName);
      setlast_name(currentContact.LastName);
      setstatus(currentContact.Status);
    }
  }, [currentContact]);

  // Function to handle radio button change
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setstatus(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Preventing default form submission behavior

    // Validation: Checking if all fields are filled
    if (!first_name || !last_name || !status) {
      return toast.warning("Please fill in all details"); // Displaying warning toast notification
    }

    // Creating updated contact object
    const updatedContact: Contact = {
      id: id!,
      FirstName: first_name,
      LastName: last_name,
      Status: status,
    };

    // Dispatching UPDATE_CONTACT action with payload of updated contact
    dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
    toast.success("Contact Updated Successfully!!"); // Displaying success toast notification
    navigate("/"); 
  };
  return (
    <div className="container">
      <div className="row">
        <h1 className="text-3xl font-bold text-center my-10">Edit Contact</h1>
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
                  id="Active"
                  name="status"
                  value="Active"
                  className="mr-2"
                  checked={status === "Active"}
                  onChange={handleOptionChange}
                />
                <label htmlFor="work" className="mr-4">
                  Active
                </label>
                <input
                  type="radio"
                  id="Inactive"
                  name="status"
                  value="Inactive"
                  className="mr-2"
                  checked={status === "Inactive"}
                  onChange={handleOptionChange}
                />
                <label htmlFor="personal">Inactive</label>
              </div>
            </div>
            <div className="mb-4">
              <input
              onClick={dash5}
                type="submit"
                value="Update Contact"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit_Contact;
