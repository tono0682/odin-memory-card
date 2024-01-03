/* eslint-disable react/prop-types */
import '../styles/Gameover.css'

export default function GameOver({isWin, handleReset}) {

    return (
      <div className="gameover">
        { isWin &&
          <div className="modal">
            <div>Congratulations you have completed the game!</div>
            <button onClick={handleReset}><span>Play Again</span></button>
          </div>
        }
        {
          !isWin &&
          <div className="modal">
            <div>Game Over! You have failed</div>
            <button onClick={handleReset}><span>Try Again</span></button>
          </div>
        }
      </div>
    )
}