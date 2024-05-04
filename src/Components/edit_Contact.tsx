import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

interface Contact {
  id: string,
  LastName: string,
  FirstName: string,
  Status: string,
}

const Edit_Contact = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [status, setstatus] = useState("");

  const contactList = useSelector((state: Contact[]) => state);
  const currentContact = contactList.find(contact => contact.id === id);

  useEffect(() => {
    if (currentContact) {
      setfirst_name(currentContact.FirstName);
      setlast_name(currentContact.LastName);
      setstatus(currentContact.Status);
    }
  }, [currentContact]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setstatus(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!first_name || !last_name || !status) {
      return toast.warning("Please fill in all details");
    }

    const updatedContact: Contact = {
      id: id!,
      FirstName: first_name,
      LastName: last_name,
      Status: status,
    };

    dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
    toast.success("Contact Updated Successfully!!");
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
