import { useEffect, useState } from "react"
import { Hamster } from "../../models/hamster"
import hamsterImg from "../../hamsters/hamster-6.jpg" /* Temporary image, TODO: Fix image url */

async function sendRequest(saveData: any) {
    const response = await fetch('http://localhost:1337/hamsters/cutest')
    const data = await response.json()
    saveData(data)
}

const Cutest = () => {
    const [hamster, setHamster] = useState<Hamster[] | null>(null);


    useEffect(() => {
        sendRequest(setHamster)
    }, [])

    return (
        <article className="first-place-container">
            {/* TODO: Lägga till (rendera) vinnar-hamstern*/}
            

            {hamster ?
                hamster.map(h => (
                    <div key={h.id}>
                        <h2>{h.name}  Is The Cutest</h2>
                        
                        <img src={hamsterImg} alt="hamster" className="cutest-hamster-img"/ >
                        
                    </div>
                ))
                : 'Loading cutest ...'
            }




        </article>
    )
}

export default  Cutest