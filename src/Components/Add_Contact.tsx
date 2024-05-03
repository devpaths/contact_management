import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface Contact {
  id:string,
  LastName:string,
  FirstName: string,
  Status: string,
}

const Add_Contact = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [status, setstatus] = useState("");

  const contact = useSelector((state:Contact[]) => state);
  // const contact = useSelector((state: { contact: Contact[] }) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleOptionChange = (option:string, done:string) => {
    setSelectedOption(option);
    setstatus(done);
  };

  const handleSubmit = (done:React.FormEvent<HTMLFormElement>) => {
    done.preventDefault();
  
    const checkfirst_name = contact.find (
    contact => contact.FirstName === first_name && first_name);
    const checklast_name = contact.find (
    contact => contact.LastName === last_name && last_name);
     
//To check if all the fields are Added or Not
    if (!first_name || !last_name || !status) {
      return toast.warning("Please fill in all Details");
    }

//To check and show if the first Name is Already Registered
      if( checkfirst_name && checklast_name){
        
        return toast.error("Name Already Registered!");
      }  
//To create new Id 
    const data = {
      id: contact[contact.length-1].id +1,
      first_name,
      last_name,
      status,
    }

    dispatch({type: "ADD_CONTACT",payload:data});
    toast.success("Contact Added Successfully!!");
    navigate("/");
  };
 
  return (
    <div className="container">
      <div className="row">
        <h1 className="text-3xl font-bold text-center my-10">Create Contact</h1>
        <div className="w-full md:w-1/2 mx-auto shadow-md rounded-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="first_name"
                className="block text-sm font-bold mb-2"
              >
                First Name
              </label>
              <input
                id="first_name"
                value={first_name}
                type="text"
                placeholder="First Name"
                onChange={(done) => setfirst_name(done.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="last_name"
                className="block text-sm font-bold mb-2"
              >
                Last Name
              </label>
              <input
                id="last_name"
                value={last_name}
                type="text"
                placeholder="Last Name"
                onChange={(done) => setlast_name(done.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Status</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="Active"
                  name="category"
                  value="Active"
                  className="mr-2"
                  checked={selectedOption === "active"}
                  onChange={(done) =>
                    handleOptionChange("active", done.target.value)
                  }
                />
                <label htmlFor="work" className="mr-4">
                  Active
                </label>
                <input
                  type="radio"
                  id="Inactive"
                  name="category"
                  value="Inactive"
                  className="mr-2"
                  checked={selectedOption === "Inactive"}
                  onChange={(done) =>
                    handleOptionChange("Inactive", done.target.value)
                  }
                />
                <label htmlFor="personal">Inactive</label>
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
