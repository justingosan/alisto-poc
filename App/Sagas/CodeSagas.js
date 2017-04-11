/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import CodeActions from '../Redux/CodeRedux'
import _ from 'lodash'
import moment from 'moment'

var {AsyncStorage, } = require('react-native');

export function* saveCode(action) {
    try {
        const data = {
            name: 'John Smith',
            time: moment().format()
        }
        const value = yield AsyncStorage.getItem('@Alisto:records2');

        if (value === null) {
            data.id = 0;
            yield AsyncStorage.setItem('@Alisto:records2', JSON.stringify([data]));
        } else {
            const obj = JSON.parse(value);
            data.id = obj[0].id + 1;
            obj.unshift(data);
            yield AsyncStorage.setItem('@Alisto:records2', JSON.stringify(obj));
        }
    } catch ( err ) {
        throw new Error(err);
    }

// yield AsyncStorage.setItem('@Alisto::records', )513
}

export function* sendCode(api, action) {
    try {
        const value = yield AsyncStorage.getItem('@Alisto:records2');

        const response = yield call(api.sendCode, JSON.parse(value))

        console.log(response);


    } catch ( err ) {
        throw new Error(err);
    }
}
