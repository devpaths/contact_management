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
      state = [...state, action.payload];
      return state;
    case "UPDATE_CONTACT":
      const updateState = state.map((contact) =>
        contact.id.toString() === action.payload.id ? action.payload : contact
      );
      state = updateState;
      return state;
    case "Delete_Contact":
      const filterContacts = state.filter(
        (contact) => contact.id.toString() !== action.payload && contact
      );
      state = filterContacts;
      return state;
    default:
      return state;
  }
};

export default ContactReducer;
