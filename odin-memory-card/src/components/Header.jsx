/* eslint-disable react/prop-types */
import '../styles/Header.css';  // Import the corresponding style

export default function Header({score, highScore}) {
    return(
        <header>
            <h1>Memory Game</h1>
            <div className='score-board'>
                <div>Score: <span>{score}</span></div>
                <div>High Score: <span>{highScore}</span></div>    
            </div>
        </header>
    )
}