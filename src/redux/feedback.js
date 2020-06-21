import * as ActionTypes from './ActionTypes';

export const Feedback = (state = { errMess: null, feedback: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEEDBACKS:
            return {...state, errMess: null, feedback: action.payload};

        case ActionTypes.FEEDBACKS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_FEEDBACK:
            const feedback = action.payload;
            return {...state, feedback: state.comments.concat(feedback)};

        default:
            return state;
    }
};