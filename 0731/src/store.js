import {createStore} from 'redux';

export default createStore(function(state, action){
    if(state === undefined){
        return {number:0}
    }
    if(action.type === 'INCREMENT'){
        return {
            ...state, //원래 state 값 가져와서(복제)
            number: state.number + action.size // 값 변경
        }
    }
    return state
    }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())