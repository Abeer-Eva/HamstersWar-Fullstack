import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './features/rootReeducer'

// configureStore skapar en Redux Store
// (man kan även använda Redux-funktionen createStore men den är inte lika enkel)
const store = configureStore({
    // enda inställningen vi behöver är en root reducer
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
/* State/store ser ut så här: { products, cart, user, view } */

export { store }