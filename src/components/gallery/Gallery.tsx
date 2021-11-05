import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions } from '../../features/hamstersReducer'
import { Hamster } from "../../models/hamster"
import { RootState } from "../../store"
import "./gallery.css"
import Overlay from "./Overlay"
import '../gallery/gallery.css'




async function sendRequest(saveData: any) {

    const response = await fetch('http://localhost:1337/hamsters')
    const data = await response.json()
    saveData(data)
    console.log(data)
}


const Gallery = () => {
    const [hamsterData, setHamsterData] = useState<Hamster[] | null>(null)
   
    useEffect(() => {
       sendRequest(setHamsterData)
    }, [])

    //Delelte-----------

	


    return (

        <div className="gallery-container">
            <header className="gallery-header">
                <h1 className="gallery-title"> Gallery</h1>
                <p>It's your game , fill free to upload a new one, delete a current one or click on each hamster for more information about each and every unique hamster.</p>
       <button className="main-btn"/* onClick={addHamster}*/ >Add hamster</button> 
            </header>
            <div className="hamster-grid">
                {hamsterData ?
                    hamsterData.map(hamster => (
                        <section key={hamster.name} className="hamster-card">
                            <img  src={"hamsters/" + hamster.imgName} alt="hamster" width="300" height="300"/>

                            <h3>{hamster.name}</h3>
                            <p >age : {hamster.age}</p>
                            <p >favorit food : {hamster.favFood}</p>
                            <p >Loves : {hamster.loves}</p>
                            <p >{hamster.defeats}</p>
                           

                            <button key={ hamster.id}  >Remove</button>
                        </section>

                    ))
                    : 'Loading hamsters...'
                }
            </div>
        </div>
    )
}



export default Gallery