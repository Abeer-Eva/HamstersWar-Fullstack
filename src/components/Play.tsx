import { useEffect, useState } from "react"
import { Hamster } from "../models/hamster"



async function sendRequest(saveData: any) {
    const response = await fetch('http://localhost:1337/hamsters/random')
    const response1 = await fetch('http://localhost:1337/hamsters/random')
    const data1 = await response1.json()
    const data2 = await response.json()
    saveData([data1, data2])
}

const Play = () => {
    const [hamster1, setHamster1] = useState<Hamster[] | null>(null);

    useEffect(() => {
        sendRequest(setHamster1)
    }, [])


    return (
        <article className="hamster-grid">

            {hamster1 ?
                hamster1.map(h => (
                    <div key={h.id}   className="hamster-card">
                        <img src={"hamsters/" + h.imgName} alt="hamster" width="300" height="300" />
                        <h2>{h.name}  </h2>
                        <h3>{h.age}  </h3>
                        <h3>{h.favFood}  </h3>
                        <h3>{h.loves}  </h3>
                        <h3>{h.wins}  </h3>

                        <button className="cutest">Cutest</button>



                    </div>

                ))
                : 'Loading  ...'
            }




        </article>

    )
}

export default Play