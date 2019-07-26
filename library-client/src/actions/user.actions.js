import * as types from '../constants/user.constants'
import request from 'superagent'

const API_URL = 'http://localhost:3005/api/user/signup'


export function addData(name, email, password, passwordConfirm,) {
    return {type: types.ADD_DATA, name, email, password, passwordConfirm,}
}

function addUserFailure() {
    return {type: types.ADD_USER_FAILURE}
}

function addUserSuccess(user) {
    return {type: types.ADD_USER_SUCCESS, user}
}

export function addUser(name, email, password, passwordConfirm,) {
    return dispatch => {
        dispatch(addData(name, email, password, passwordConfirm,))
        return request
        .post(`${API_URL}`)
        .send({name})
        .send({email})
        .send({password})
        .send({passwordConfirm})
        .end((err, res) => {
                if (err) {
                    console.log(err);
                    dispatch(addUserFailure())
                } else {
                    dispatch(addUserSuccess(res.body.user))
                }
        })
    }
}

