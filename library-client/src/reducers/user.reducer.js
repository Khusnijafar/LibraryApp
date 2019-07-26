import * as types from '../constants/user.constants'

export default function user(state = [], action) {
    switch (action.type) {
        case types.ADD_DATA:
        return [
            {
               name: action.name,
               email: action.email,
               password: action.password,
               passwordConfirm: action.passwordConfirm,
            },
            ...state
        ]

        case types.ADD_USER_SUCCESS:
        let addData = state
        let add = addData.map(item => {
            if (item.name === action.name) {
                item.email = action.email
                item.password = action.password
                item.passwordConfirm = action.passwordConfirm
            }
            return item
        })
        return add
        
        default:
        return state
    }
}