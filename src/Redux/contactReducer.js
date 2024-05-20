//Testing using initial state of the contacts array
const initialState = [
  // {
  //   id: "0",
  //   FirstName: "Devang",
  //   LastName: "Pathak",
  //   Status: "Active",
  // },
  // {
  //   id: "1",
  //   FirstName: "test",
  //   LastName: "Name",
  //   Status: "Inactive",
  // },
];

// ContactReducer function to manage state changes related to contacts
const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    // Action type to add a new contact
    case "ADD_CONTACT":
      return [...state, action.payload]; // Adding new contact to the state array
    // Action type to update an existing contact
    case "UPDATE_CONTACT":
      return state.map((contact) =>
        // Updating contact with matching id, otherwise returning original contact
        contact.id.toString() === action.payload.id ? action.payload : contact
      );
    // Action type to delete a contact
    case "Delete_Contact":
      return state.filter(
        // Removing contact with matching id from the state array
        (contact) => contact.id.toString() !== action.payload
      );
    default:
      return state; // Returning the current state if action type doesn't match
  }
};
export default ContactReducer;
