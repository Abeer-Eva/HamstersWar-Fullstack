
import { Hamster } from "../../models/hamster"
import { useState } from 'react'
import { useDispatch } from "react-redux"
import { actions } from '../../features/hamstersReducer'






interface OverlayProps {
    close: () => void;
    addHamster: (hamster: Hamster) => void;
    setHamsterData: (array: Hamster[]) => void;
}

const Overlay = ({ close, setHamsterData }: OverlayProps) => {
    const [name, setName] = useState<string>('')
    const [age, setAge] = useState<number>(0.5)
    const [favFood, setFavFood] = useState<string>('')
    const [loves, setLoves] = useState<string>('')
    const [imgName, setImgName] = useState<string>('')

    //validition
    const [isChecked, setChecked] = useState<boolean>(false)
    const [clickedNameField, setClickedNameField] = useState<boolean>(false)
    const [clickedLoveField, setClickedLoveField] = useState<boolean>(false)
    const [clickedFoodField, setClickedFoodField] = useState<boolean>(false)
    const [ clickedAgeField, setClickedAgeField ] = useState<boolean>(false)
    const nameIsValid = validateName(name)
    const loveIsValid = validateLove(loves)
    const foodIsValid = validateFood(favFood)
    const imgIsValid = validateImg(imgName, isChecked)
    const ageIsValid = validateAge(age)




    // valdition
    function validateName(name: string): boolean {
        return name.length >= 2
    }

    function validateLove(loves: string): boolean {
        return loves.length >= 2
    }

    function validateFood(favFood: string): boolean {
        return favFood.length >= 2
    }

    function validateImg(imgName: string, isChecked: boolean): boolean {

        let testString = imgName.split('')
        let testArray1 = testString.slice(0, 8)
        let testArray2 = testString.slice(0, 7)
        let startHost = testArray1.join('') === 'https://' || testArray2.join('') === 'http://'
        let pathCheck = testString.slice(8).includes('.') && testString.slice(8).includes('/')
        let hamsterImg1 = testString.slice(0, 8)
        let hamsterImg2 = testString.slice(-4)

        let urlOk = startHost && pathCheck

        let fileNameOk = hamsterImg2.join('') === '.jpg' && hamsterImg1.join('') === 'hamster-'
        return urlOk || fileNameOk || isChecked
    }

    const handleImgName = (input: string) => {
        setImgName(input)
    }
    const handleRandomImg = (checked:boolean) => {
		setChecked(checked)
		if ( checked ) {
			setImgName(`/hamster-${Math.ceil(Math.random()*40)}.jpg`)
		}
	}

    const handleName = (input: string) => {
        setName(input)
        setClickedNameField(true)
    }

    const handleLove = (input: string) => {
        setLoves(input)
        setClickedLoveField(true)
    }

    const handleFavFood = (input: string) => {
        setFavFood(input)
        setClickedFoodField(true)
    }
    const handleAge = (input:number) => {
		if(input.toString().length > 0) {
			setAge(input)
		}
		setClickedAgeField(true)
	}


    function validateAge(input:number):boolean {
		return input >= 0.5 
		
	}
    async function sendRequest() {
        try {
            const response = await fetch('http://localhost:3000/hamsters')
            const data = await response.json()
            setHamsterData(data)
        } catch (error) {
            console.log('error:', error);
        }
    }


    const dispatch = useDispatch()

    const postHamster = async () => {
        // förbered Hamster-objekt och anropa addHamster-funktionen
        const hamster = {
            // Hämta riktiga värden från formuläret
            age: age, defeats: 0, favFood: favFood, games: 0, imgName: imgName, loves: loves, name: name, wins: 0
        }
        const response = await fetch('/hamsters/',
            {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(hamster)
            }

        )

        console.log(JSON.stringify(hamster));
        const newHamster = await response.json()
        console.log(newHamster)
        await dispatch(actions.addHamster(newHamster))
        sendRequest()

        close()


    }
    return (
        <div className="overlay">
            <div className="dialog">
                <h2>Add a new hamster</h2>
                <form>

                    <input type="text" placeholder="Hamsters name"
                        value={name}
                        onChange={e => handleName(e.target.value)} className={nameIsValid ? 'valid' : ' not-valid'} />
                    {!nameIsValid && clickedNameField ?
                        <span >Name is empty or not correct.</span>
                        : null
                    }
                    <input type="text" placeholder="Favorite food"
                        value={favFood}
                        onChange={e => handleFavFood(e.target.value)} className={foodIsValid ? 'valid' : ' not-valid'} />
                    {!foodIsValid && clickedFoodField ?
                        <span >At least two letters.</span>
                        : null
                    }
                    <input type="text" placeholder="Loves"
                        value={loves}
                        onChange={e => handleLove(e.target.value)} className={loveIsValid ? 'valid' : ' not-valid'} />
                    {!loveIsValid && clickedLoveField ?
                        <span  >Hoppy is empty.</span>
                        : null
                    }

                    <input type="number" min="1" value={age}
                        onChange={e => handleAge(e.target.valueAsNumber)} />
                        {!ageIsValid && clickedAgeField ?
				        <span >Age att least 0.5</span>
				         :null

                }
                    <input type="url" placeholder="Image URL" value={imgName} disabled={isChecked}
                        onChange={e => handleImgName(e.target.value)} className={imgIsValid ? 'valid' : ' not-valid'} />
                    {imgIsValid && !isChecked ?
                        <img src={imgName.includes('http') ? imgName : `/img/${imgName}`} alt="hamsterbild"    className="web-img"/>
                        : null
                    }
                    <input type="checkbox" onChange={() => handleRandomImg(!isChecked)} /><label>tryck here for random bild</label>
                </form>
                <div>

                    <button className="addhamster" onClick={() => { postHamster(); sendRequest()}} disabled={!nameIsValid || !loveIsValid || !foodIsValid || !imgIsValid}> Add hamster </button>
                    <button className="close-btn" onClick={close}> x </button>
                </div>



            </div>
        </div>
    )
}


export default Overlay


