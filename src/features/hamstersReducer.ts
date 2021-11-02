import { createAction, createReducer } from '@reduxjs/toolkit'
import { Hamster } from '../models/hamster'

// Dessa actions finns - detta är vad användaren kan göra
// const ?? = createAction(??)

const getHamster = createAction('get hamsters')
const actions = {getHamster  }


// Värdet på "products" när appen startar
const initialState: Hamster[] = [
    {
        games: 0,
        wins: 2,
        loves: "promenader",
        defeats: 0,
        favFood: 'sallad',
        age: 2,
        name: 'Bobby',
        imgName: 'https://image.posterlounge.se/images/l/1895875.jpg', // URL to image
        id: '1'
    }
]

const hamsterReducer = createReducer(initialState, {

})

export { actions, hamsterReducer }