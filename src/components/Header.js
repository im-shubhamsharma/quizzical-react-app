import React from "react"
import logo from "../images/logo.png"

export default function Header(){
    return(
        <header>
            <img className="logo" src={logo} alt="quizical logo"/>
        </header>
    )
}