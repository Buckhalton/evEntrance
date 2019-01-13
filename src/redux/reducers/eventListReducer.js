const eventListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_EVENT_LIST':
        return action.payload; 
      default:
        return state;
    }
  };
  

  export default eventListReducer;