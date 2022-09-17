import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import sidexReducer from "./sidex/sidexReducer";
import updateReducer from "./updateButton/updateReducer";

const reducers = combineReducers({
    userReducer,
    sidexReducer,
    updateReducer
});

export default reducers;