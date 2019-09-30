import {GET_ERRORS,GET_SUCCESS} from '../actions/types'

const initalState = {}

export default function (state = initalState,action){
    switch(action.type) {
        case GET_SUCCESS:
            return action.payload
        case GET_ERRORS:
            return action.payload
        default:
            return state
    }
}