import {
    SIDEX_REQUEST,
    SIDEX_SUCCESS,
    SIDEX_FAILED
}
    from './sidexTypes';


const initialStates = {

    loadingSidex: false,
    errors: [],
    project: {},
    lines: [],
    floors: [],
    buttons: {}

}


const sidexReducer = (state = initialStates, action) => {


    switch (action.type) {

        case SIDEX_SUCCESS: return {
            ...state,
            project: action.payload.project,
            lines: action.payload.lines,
            floors: action.payload.floors,
            buttons:action.payload.buttons
        }

        default: return state;
    }


}

export default sidexReducer;