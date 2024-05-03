import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

interface Contact {
  id: string,
  LastName: string,
  FirstName: string,
  Status: string,

  last_name: string,
  first_name: string,
  status: string,
}

const ContactList = () => {
  const contact= useSelector((state: Contact[]) => state);
  const dispatch = useDispatch();
  const deleteContact = (id:string)=>{
   dispatch({type:"Delete_Contact" , payload:id});
   toast.success("Contact deleted successfully");
  }



  return (
    <div className="container mx-auto px-4">
      <div className="my-5 text-right">
        <Link to="/add_contact" className='btn btn-outline-dark'>Create Contact</Link>
      </div>
      <div className="flex flex-wrap -mx-4">
        {contact.map((contact, id) => (
          <div key={id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h5 className="text-xl font-semibold mb-2">{contact.FirstName} {contact.first_name} {contact.last_name} {contact.LastName}</h5>
                <p className="text-gray-600">Status: {contact.status} {contact.Status}</p>
              </div>
              <div className="flex justify-between px-6 py-4">
                <Link to={`/edit/${contact.id}`} className='btn btn-primary mr-2 hover:bg-green-500 rounded-lg px-5 py-1 transition-colors duration-300'>Edit</Link>
                <button type='button' onClick={()=> deleteContact(contact.id)} className='btn btn-danger hover:bg-red-500 px-3 py-1 rounded-lg transition-colors duration-300'>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
