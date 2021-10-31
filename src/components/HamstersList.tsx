import { useRecoilState } from 'recoil'
import { Link } from 'react-router-dom'
import hamstersAtom from '../hamsters'

const HamsterList = () => {
	const [hamsters] = useRecoilState(hamstersAtom)
	return (
		<div>
		All Hamsters:
		<ul>
			{ hamsters.map(f => (
				<Link to="/hamsters"  key={f.id}>
				<li>
				
                <h2>{f.name}</h2>
				<img src={f.imgName} alt="" />
                	
				</li>
			</Link>
			))}
		</ul>
		</div>
	)
}



export default HamsterList