const initialState = [
  {
    id: "0",
    FirstName: "Devang",
    LastName: "Pathak",
    Status: "Active",
  },
  {
    id: "1",
    FirstName: "test",
    LastName: "Name",
    Status: "Inactive",
  },
];

const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, action.payload];
    case "UPDATE_CONTACT":
      return state.map((contact) =>
        contact.id.toString() === action.payload.id ? action.payload : contact
      );
    case "Delete_Contact":
      return state.filter(
        (contact) => contact.id.toString() !== action.payload
      );
    default:
      return state;
  }
};

export default ContactReducer;
