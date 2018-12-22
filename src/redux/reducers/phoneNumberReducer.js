const phoneNumber = (state = {}, action) => {
    switch (action.type) {
      case 'SET_NUMBER':
        return action.payload;
      default:
        return state;
    }
  };

// phoneNumber will be on the redux state at:
// state.phoneNumber
export default phoneNumber;