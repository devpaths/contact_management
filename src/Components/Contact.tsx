import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
// Interface for defining the structure of a contact object
interface Contact {
  id: string,
  LastName: string,
  FirstName: string,
  Status: string,
  last_name: string,
  first_name: string,
  status: string,
}

// Functional component ContactList
const ContactList = ({dash3,dash4}) => {
  // Accessing contacts from Redux store state
  const contacts = useSelector((state: Contact[]) => state);
  // Dispatch function for dispatching actions to Redux store
  const dispatch = useDispatch();

  // Function to delete a contact
  const deleteContact = (id: string) => {
    
    dispatch({ type: "Delete_Contact", payload: id });
    
    toast.success("Contact deleted successfully");
  }

  return (
    <div className="container mx-auto px-4">
      <div className="my-5 text-right">
        <Link to="/add_contact" onClick={dash4} className="block mx-auto w-40 py-2 text-center text-white bg-gray-800 rounded-lg hover:bg-gray-900 transition duration-300">
          Create Contact
        </Link>
      </div>
      {contacts.length === 0 && ( // Checking if no contacts are available
        <div className="flex items-center justify-center mt-40">
          <div className="bg-white border border-gray-300 rounded-lg p-4 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-600 text-center">
              No Contacts found. Please add a contact from the Create Contact Button.
            </h2>
          </div>
        </div>
      )}
      <div className="flex flex-wrap -mx-4"> 
        {contacts.map((contact, index) => ( // Mapping through contacts array
          <div key={contact.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4"> 
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h5 className="text-xl font-semibold mb-2">{contact.FirstName} {contact.first_name} {contact.last_name} {contact.LastName}</h5> {/* Displaying contact name */}
                <p className="text-gray-600">Status: {contact.status} {contact.Status}</p> 
              </div>
              <div className="flex justify-between px-6 py-4">
                
                <Link onClick={dash3} to={`/edit/${contact.id}`} className='btn btn-primary mr-2 hover:bg-green-500 rounded-lg px-5 py-1 transition-colors duration-300'>Edit</Link>
              
                <button type='button' onClick={() => deleteContact(contact.id)} className='btn btn-danger hover:bg-red-500 px-3 py-1 rounded-lg transition-colors duration-300'>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ContactList;
