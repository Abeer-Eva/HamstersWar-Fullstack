import { Link } from "react-router-dom";
const StartSida = () => {
    return (
        <article className="introduction-container">
            <div>
                <h1>Hamster War</h1>
               <img className="hamster-logo-h1" src="" alt="Hamsters logotype" />
            </div>
            <h3>How to play?</h3>
            <p>Simple! Just click on the hamster that you think is the cutest.</p>
            <div className='cont'>
            <Link to="/play"> <button className="button" >                <p className="text" >Play</p>
                </button></Link>
            </div>
        </article>
    )
}

export default StartSida