
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from './userTypes';

const initialStates = {

    user: '',
    loading: false,
    errors: []
}


const userReducer = (state = initialStates, action) => {

    switch (action.type) {

        case LOGIN_REQUEST: return {
            ...state,
            loading: true
        }

        case LOGIN_SUCCESS: return {
            ...state,
            loading: false,
            user: action.payload
        }

        case LOGIN_FAIL: return {
            ...state,
            loading: false,
            user: [],
            errors: action.payload
        }

        default: return state;
    }

}

export default userReducer;