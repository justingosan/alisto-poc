import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import TOTP from '../Services/TOTP'

const totpInstance = new TOTP('test', 'test');
/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    generateCode: null,
    enterCode: null,
    sendCode: null,
    codeSuccess: null,
    codeFailure: null
})

export const CodeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    generatedCode: null,
    payload: null,
    submitting: false,
    error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const generateCode = (state) => {
    return state.merge({
        generatedCode: totpInstance.getOTP()
    })
}

export const enterCode = (state, action) => {
    return state.merge({})
}

// submit code
export const sendCode = (state, action) => {
    return state.merge({
        submitting: true,
    })
}

// successful api lookup
export const success = (state) => {
    return state.merge({
        submitting: false,
        error: null,
    })
}

// Something went wrong somewhere.
export const failure = state => state.merge({
    submitting: false,
    error: true,
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GENERATE_CODE]: generateCode,
    [Types.ENTER_CODE]: enterCode,
    [Types.SEND_CODE]: sendCode,
    [Types.CODE_SUCCESS]: success,
    [Types.CODE_FAILURE]: failure
})
