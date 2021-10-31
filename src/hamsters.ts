import { atom } from 'recoil'
import { Hamster } from '../src/models/hamster'

const hamsters = atom<Hamster[]>({
	key: 'hamsters',
	default: []  // måste tala om att detta är en lista med Hamster-objekt
})

export default hamsters