
import { Hamster } from "../../models/hamster"
import { useState } from 'react'
import { RootState } from '../../store'
import { useDispatch, useSelector } from "react-redux"
import { actions } from '../../features/hamstersReducer'
import { url } from "inspector"






interface OverlayProps {
    close: () => void;
    addHamster: (hamster: Hamster) => void;
}

const Overlay = ({ close, addHamster }: OverlayProps) => {
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [favFood, setFavFood] = useState<string>('')
    const [loves, setLoves] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')


    const dispatch = useDispatch()
    const hamster = useSelector((state: RootState) => state.hamsters)
    const postHamster = async ()=> {
        // förbered Hamster-objekt och anropa addHamster-funktionen
        const hamster = {
            // Hämta riktiga värden från formuläret
            age: 0, defeats: 0,  favFood: favFood, games: 0, imgName: imgName,  loves: loves, name: name,wins: 0
        }
        const response = await fetch('http://localhost:1337/hamsters/' , 
            { method: 'POST',
             headers: {
             Accept: "application/json",
             "Content-Type" : "application/json"},
            body: JSON.stringify(hamster)}
             )
    
            console.log(JSON.stringify(hamster));
            const newHamster = await response.json()
            console.log(newHamster)
             console.log("Success", newHamster);
            await dispatch(actions.addHamster(newHamster))
        
       
        close()


    }
    return (
        <div className="overlay">
            <div className="dialog">
                <h2>Add a new hamster</h2>
                <form>

                    <input type="text" placeholder="Hamsters name"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Favorite food"
                        value={favFood}
                        onChange={e => setFavFood(e.target.value)} />

                    <input type="text" placeholder="Loves"
                        value={loves}
                        onChange={e => setLoves(e.target.value)} />

                    <input type="number" placeholder="Insert age" value={age}
                        onChange={e => setAge(e.target.valueAsNumber)} />

                    <input type="url" placeholder="Image URL" value={imgName}
                        onChange={e => setImgName(e.target.value)} />

                </form>
                <div>

                    <button className="addhamster" onClick={postHamster}> Add hamster </button>
                    <button className="close-btn" onClick={close}> x </button>
                </div>



            </div>
        </div>
    )
}


export default Overlay