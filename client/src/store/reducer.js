
import * as actionTypes from './action';

const initialState = {
    isAuthenticated: false,
    token: null,
    userData: {}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_USER_DATA:
            return {
                ...state,
                userData: action.payload
            }
        case actionTypes.ADD_TOKEN:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true
            }
        default: 
            return state;
    }
};

export default reducer;