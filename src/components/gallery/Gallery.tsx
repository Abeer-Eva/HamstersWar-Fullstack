import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions } from '../../features/hamstersReducer'
import { Hamster } from "../../models/hamster"
import { RootState } from "../../store"
import "./gallery.css"
import Overlay from "./Overlay"
import '../gallery/gallery.css'
import Header from "./Header"




async function sendRequest(saveData: any) {

    const response = await fetch('http://localhost:1337/hamsters')
    const data = await response.json()
    saveData(data)
    console.log(data)
}


const Gallery = () => {
    const [hamsterData, setHamsterData] = useState<Hamster[] | null>(null)
    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(true) 
    useEffect(() => {
       sendRequest(setHamsterData)
    }, [])

    
	const addHamster = (hamster: Hamster) => {
		// TODO: anropa setMovies
		console.log('App.addMovie anropad med movie=', hamster)
	}

	let addHamsterOverlay = null
	if( showAddHamsterOverlay ) {
		const closeOverlay = () => setShowAddHamsterOverlay(false)
		addHamsterOverlay = <Overlay close={closeOverlay} addHamster={addHamster} />
		// JSX översätts till funktionsanrop: _jsx('h1', 'content')
	}

	const showOverlay = () => {
		// visa overlay
		setShowAddHamsterOverlay(true)

    }


    return (

        <div className="gallery-container">
           
           <Header addHamster={showOverlay} />
           {addHamsterOverlay}
            <div className="hamster-grid">
                {hamsterData ?
                    hamsterData.map(hamster => (
                        <section key={hamster.id} className="hamster-card">
                            <img  src={"hamsters/" + hamster.imgName} alt="hamster" width="300" height="300"/>

                            <h3>{hamster.name}</h3>
                            <p >age : {hamster.age}</p>
                            <p >favorit food : {hamster.favFood}</p>
                            <p >Loves : {hamster.loves}</p>
                            <p >{hamster.defeats}</p>
                           

                            <button   >Remove</button>
                        </section>

                    ))
                    : 'Loading hamsters...'
                }
            </div>
        </div>
    )
}



export default Gallery