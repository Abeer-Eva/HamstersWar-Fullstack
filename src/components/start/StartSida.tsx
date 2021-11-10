import { Link } from "react-router-dom";
import Cutest from "./Cutest";


const StartSida = () => {
    
    return (
        <article className="introduction-container">
            <div>

                <h1>Hamster Wars</h1>
            </div>
            <h2>How to play?</h2>
            <p>Simple!!!!!<br />
                1-click on play or on playing on the top<br />
                2-Just click on the hamster that you think is the cutest.</p>


            <Cutest />

            <div className='cont'>
                <Link to="/fight"> <button className="button" >
                    <p className="text" >Play</p>
                </button></Link>
            </div>
        </article>
    )
}

export default StartSida