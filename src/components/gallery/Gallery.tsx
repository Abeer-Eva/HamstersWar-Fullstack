import { useEffect, useState } from "react"
import { Hamster } from "../../models/hamster"
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


    const [hamsterData, setHamsterData] = useState<Hamster[]>(Array)
    const [showAddHamsterOverlay, setShowAddHamsterOverlay] = useState<boolean>(true)

    useEffect(() => {
        sendRequest(setHamsterData)
    }, [])


    const addHamster = (hamster: Hamster) => {
        // TODO: anropa setMovies
        console.log('App.addHamster anropad med hamster=', hamster)

    }

    let addHamsterOverlay = null
    if (showAddHamsterOverlay) {
        const closeOverlay = () => setShowAddHamsterOverlay(false)
        addHamsterOverlay = <Overlay close={closeOverlay} addHamster={addHamster} />
        // JSX översätts till funktionsanrop: _jsx('h1', 'content')
    }

    const showOverlay = () => {
        // visa overlay
        setShowAddHamsterOverlay(true)

    }



    //Delete hamster från database


    const DeleteOne = async (id: string) => {
        await fetch(`http://localhost:1337/hamsters/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Accept': 'application/json;charset=UTF-8',
            },
        }
        )

    }

    const handleRemove = (hamsterId: string) => {
        setHamsterData((hamsterData) => hamsterData.filter((hamsterObject => hamsterObject.id !== hamsterId)))
    }


    return (

        <div className="gallery-container">

            <Header addHamster={showOverlay} />
            {addHamsterOverlay}
            <div className="hamster-grid">
                {hamsterData ?
                    hamsterData.map(hamster => (
                        <section key={hamster.id} className="hamster-card">
                            <img src={"hamsters/" + hamster.imgName} alt="hamster" width="250" height="250" />

                            <h3>{hamster.name}</h3>
                            <p className="hamster-info"  >age : {hamster.age}<br/>
                            favorit food : {hamster.favFood}<br/>
                            Loves : {hamster.loves}<br/>
                            Wins:{hamster.wins}
                            <br/>
                            Games:{hamster.games}</p>


                            <button onClick={() => { DeleteOne(hamster.id); handleRemove(hamster.id) }}    >Remove</button>
                        </section>

                    ))
                    : 'Loading hamsters...'
                }
            </div>
        </div>
    )
}



export default Gallery