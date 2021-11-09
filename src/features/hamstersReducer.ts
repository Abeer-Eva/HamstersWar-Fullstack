import { createAction, createReducer } from '@reduxjs/toolkit'
import { Hamster } from '../models/hamster'



// Dessa actions finns - detta är vad användaren kan göra
const getHamsters = createAction<Hamster>('get Hamster Array')
const addHamster = createAction<Hamster>('Add hamster to gallery')
const removeHamster = createAction<string>('remove one hamster')
const winHamster=createAction<String>('uppdate winner')
//Actions att skicka med
const actions = { getHamsters, addHamster ,removeHamster ,winHamster}

// Visar array på "hamsters" när appen startar
const initialState: Hamster[] = []

const hamsterReducer = createReducer(initialState, {
    //Lägg till hamsters i initialState
    [getHamsters.toString()]: (state, action) => action.payload || null,
   
    [addHamster.toString()]: (state, action) => [...state, action.payload],
    //Ta bort hamster med ett visst id
    [removeHamster.toString()]: (state, action) => state.filter(hamster => hamster.id !== action.payload),
    // to uppdate resultat
    [winHamster.toString()]: (state, action) => [...state, action.payload],

})


export { actions ,initialState, hamsterReducer }

