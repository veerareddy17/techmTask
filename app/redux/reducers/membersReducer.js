const INITIAL_STATE = {
    members: [],  
  };

const membersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'ADD_Members':
        return {
          members: action.payload
        };
        case 'REMOVE_Member':
          return {
            members: action.payload
          }; 
      default:
        return state
    }
  };

export {membersReducer}