const userUpcomingEventReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_UPCOMING_EVENT_LIST':
            return action.payload;
        default:
            return state;
    }
};


export default userUpcomingEventReducer;