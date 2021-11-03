import { Link } from "react-router-dom";import { useEffect, useState } from "react"
import { Hamster } from "../../models/hamster"
import Cutest from "./Cutest";





const StartSida = () => {
    return (
        <article className="introduction-container">
            <div>
                <h1>Hamsters War</h1>
            </div>
            <h3>How to play?</h3>
            <p>Simple! Just click on the hamster that you think is the cutest.</p>

            
          <Cutest/>

            <div className='cont'>
            <Link to="/play"> <button className="button" >                <p className="text" >Play</p>
                </button></Link>
            </div>
        </article>
    )
}

export default StartSida