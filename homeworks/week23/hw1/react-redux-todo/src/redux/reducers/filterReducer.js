import { FILTER_TODO } from '../actionTypes';

const initialState = 'ALL';

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case FILTER_TODO: {
            return action.payload.filter;
        }
        
        default: {
            return state;
        }
    }    
}

export default filterReducer;