const eventIdReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EVENT_ID':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default eventIdReducer;