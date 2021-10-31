import { combineReducers } from 'redux'
import { hamsterReducer } from './hamstersReducer'


const rootReducer = combineReducers({
	// här lägger vi till reducers, allt eftesom vi behöver dem (precis som vi gör med komponenter)
    hamsters: hamsterReducer
})

export { rootReducer }