import axios from './client'
import isEmpty from 'is-empty'
import jwt_decode from 'jwt-decode'

import {
 GET_SUCCESS,
 GET_ERRORS,
 SET_CURRENT_USER,
} from './types'

export const registerUser = ( userData, history) => dispatch => {
    axios().post("/user/register",userData).then( res => {
        dispatch(loginUser(userData,history));
            }).catch( err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.message
            })
        })
    }

export const loginUser = ( userData, history) => dispatch => {
    axios().post("/user/login",userData).then( res => {
        const {token} = res.data;
        localStorage.setItem('token',token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        history.push("/")}
        ).catch( err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.message
            })
        })
    }

export const setCurrentUser = (user) => {
        return {
            type: SET_CURRENT_USER,
            payload: user
        }
    }

export const logoutUser = () => dispatch => {
    localStorage.removeItem('token');
    dispatch(setCurrentUser({}))
}

export const deleteUser = (userData) => dispatch => {
    axios().delete("/user/me",{data:userData}).then( res => {
        dispatch(logoutUser())
}).catch( err => {
    console.log(err)
    dispatch({
        type: GET_ERRORS,
        payload: err.response.data.message
    })
})
}

export const editUser = (userData,history) => dispatch => {
    let endPoint = '/user/me?';
    if(!isEmpty(userData.fullname))
    endPoint += `&fullname=${userData.fullname}`
    if(!isEmpty(userData.password))
    endPoint += `&password=${userData.password}`
    axios().put(endPoint).then( res => {
        const {result,token,...data} = res.data;
        localStorage.setItem('token',token)
        dispatch(setCurrentUser(result))
        dispatch({
            type: GET_SUCCESS,
            payload: data
        })
}).catch( err => {
    console.log(err)
    dispatch({
        type: GET_ERRORS,
        payload: err.response.data.message
    })
})
}