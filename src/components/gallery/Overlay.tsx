
import { Hamster } from "../../models/hamster"
import { useState } from 'react'






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
  




    const handleAddHamster = () => {
        // förbered Hamster-objekt och anropa addMovie-funktionen
        let hamster: Hamster = {
            // Hämta riktiga värden från formuläret
            id: '', name: name, age: 0, favFood: favFood, loves: loves, imgName: imgName, wins: 0, defeats: 0, games: 0
        }
        addHamster(hamster)
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

                    <input type="text" placeholder="Image URL" />

                </form>
                <div>

                    <button className="addhamster" onClick={handleAddHamster}> Add hamster </button>
                    <button className="close-btn" onClick={close}> x </button>
                </div>



            </div>
        </div>
    )
}


export default Overlay