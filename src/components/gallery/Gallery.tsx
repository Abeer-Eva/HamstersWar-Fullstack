import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Hamster } from "../../models/hamster"
import { RootState } from "../../store"
import "./gallery.css"

// import '../gallery/Gallery.css'


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

    // const readMore = (index: number) =>{
    //     console.log('click',)
    // }

    return (

        <div className="gallery-container">
            <header className="gallery-header">
                <h1 className="gallery-title"> Gallery</h1>
                <p>It's your game , fill free to upload a new one, delete a current one or click on each hamster for more information about each and every unique hamster.</p>
                <button className="main-btn">Add hamster</button>
            </header>
            <div className="hamster-grid">
                {hamsterData ?
                    hamsterData.map(hamster => (
                        <section key={hamster.id} className="hamster-card">
                            <img className="hamster-image" src="" alt="hamster" />

                            <h3>{hamster.name}</h3>
                            <p >age:{hamster.age}</p>
                            <p >favorit food:{hamster.favFood}</p>
                            <p >{hamster.loves}</p>
                            <p >{hamster.defeats}</p>


                            <button className="button">Remove</button>
                        </section>

                    ))
                    : 'Loading hamsters...'
                }
            </div>
        </div>
    )
}



export default Gallery