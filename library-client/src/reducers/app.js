import * as types from '../constants/ActionTypes'

export default function data(state = [], action) {
    switch (action.type) {
        case types.LOAD_LIBRARIES_SUCCESS:
        return action.library

        case types.LOAD_LIBRARIES_FAILURE:
        return state

        case types.ADD_DATA:
        return [
            {
               id: action.id,
               title: action.title,
               image: action.image,
               writer: action.writer,
               category: action.category,
               location: action.location,
            },
            ...state
        ]

        case types.ADD_LIBRARIES_SUCCESS:
        let addData = state
        let add = addData.map(item => {
            if (item.id === action.id) {
                item.title = action.title
                item.image = action.image
                item.writer = action.writer
                item.category = action.category
                item.location = action.location
            }
            return item
        })
        return add

        case types.EDIT_DATA:
        return state.map(
            data => data.id === action.id ?
            Object.assign({}, data, {title: action.title,image: action.image, writer: action.writer,
            category: action.category, location: action.location,})
            :
            data
        )

        case types.EDIT_LIBRARIES_SUCCESS:
        let editData = state
        let edit = editData.map(item => {
            if (item.id === action.id) {
                item.title = action.title
                item.image = action.image
                item.writer = action.writer
                item.category = action.category
                item.location = action.location
            }
            return item
        })
        return edit

        case types.DELETE_DATA:
        return state.filter(data => data.id !== action.id)

        case types.ADD_DATALOAN:
        return [
                {
                  cardNumber: action.cardNumber,
                  id: action.id,
                  expiredData: action.expiredData,
                  forfeit: action.forfeit,
                },
                ...state
        ]

        case types.ADD_LOANBOOK_SUCCESS:
            let addDataLoan = state
            let addLoan = addDataLoan.map(item => {
                if (item.cardNumber === action.cardNumber) {
                    item.id = action.id
                    item.expiredData = action.expiredData
                    item.forfeit = action.forfeit
                }
                return item
            })
        return addLoan

        case types.EDIT_DATALOAN:
        return state.map(
            data => data.id === action.id ?
            Object.assign({}, data, {cardNumber: action.cardNumber,id: action.id, expiredData: action.expiredData,
            forfeit: action.forfeit,})
            :
            data
        )

        case types.EDIT_LOANBOOK_SUCCESS:
        let editDataLoan = state
        let editLoan = editDataLoan.map(item => {
            if (item.id === action.id) {
                item.cardNumber = action.cardNumber
                item.expiredData = action.expiredData
                item.forfeit = action.forfeit
            }
            return item
        })
        return editLoan

        case types.ADD_DATAUSER:
        return [
            {
               name: action.name,
               email: action.email,
               password: action.password,
               passwordConfirm: action.passwordConfirm,
            },
            ...state
        ]

       

        default:
        return state
    }
}