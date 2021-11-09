import { useState } from "react"
import { Hamster } from "../../models/hamster"




const Fight = () => {
	const [hamster, setHamster] = useState<Hamster[] | null>(null);
	const [showResult, setShowResult] = useState<boolean>(false)
	const [winner, setWinner] = useState<Hamster | null>(null)
	const [loser, setLoser] = useState<Hamster | null>(null)
	const [doneLoadingUpdate, setDoneLoadingUpdate] = useState<boolean>(false)
	async function requestRandom(saveData: any) {
		const response1 = await fetch('/hamsters/random')
		const data1 = await response1.json()
		let response2 = await fetch('/hamsters/random')
		let data2 = await response2.json()

		//WHILE LOOP - WHILE DATA1.ID === DATA2.ID -> FETCH NEW RANDOM
		while (data1.id === data2.id) {
			response2 = await fetch('/hamsters/random')
			data2 = await response2.json()
		}
		setShowResult(false)
		saveData([data1, data2])
	}





	const newGame = () => {
		requestRandom(setHamster)
		setWinner(null)
		setLoser(null)
		setDoneLoadingUpdate(false)
	}

	const updateLoser = async (y: Hamster) => {
		setLoser(y)
		await fetch("/hamsters/" + y.id, {
			method: 'put',
			body: JSON.stringify({ defeats: y.defeats + 1, games: y.games + 1 }),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}

	const updateWinner = async (x: Hamster) => {
		setWinner(x)
		//PUT update wins ++, games ++
		await fetch("/hamsters/" + x.id, {
			method: 'put',
			body: JSON.stringify({ wins: x.wins + 1, games: x.games + 1 }),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}

	const handleClick = async (x: Hamster, y: Hamster) => {
		await updateLoser(y)
		await updateWinner(x)
		setDoneLoadingUpdate(true)
	}


	return (
		<section className='fight'>
			<h1>Hamsters War</h1>


			<>
				<h2>And the winner is ...</h2>
				<h2 className="winner">{winner?.name}</h2>
				<button className="btn-light" onClick={() => newGame()}>New game</button>

				<h2> Choose one </h2>
			</>

			<section className='contestants'>
				{hamster ?
					<>
						{
							!doneLoadingUpdate && !winner && !loser ?
								hamster.map(x => (
									<article onClick={!showResult ? () => handleClick(x, hamster?.filter(l => l !== x)[0]) : undefined} className={showResult ? 'hamster-card' : 'hamster-card game-card'} key={x.id} >
										<li><img src={x.imgName.includes('http') ? x.imgName : `/img/${x.imgName}`} alt={x.name} width="300" height="300" /></li>
										<h2 className="hamster-name">{x.name}</h2>
										<h2 className="hamster-name">{x.age}</h2>
										<h2 className="hamster-name">{x.favFood}</h2>
										<h2 className="hamster-name">{x.loves}</h2>


									</article>
								))
								: null
						}
						{
							winner && loser ?
								<>
									{
										<>
											<article className={'hamster-card'} key={winner.id} >
												<li><img src={winner.imgName.includes('http') ? winner.imgName : `/img/${winner.imgName}`} alt={winner.name} width="500" height="400" /></li>
												<h2 className="hamster-name">{winner.name}</h2>

											</article>

										</>
									}
								</>
								: null
						}
					</>
					: 'Laddar hamstrar...'
				}
			</section>
		</section>
	)
}

export default Fight