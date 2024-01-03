/* eslint-disable react/prop-types */
import Tilt from 'react-parallax-tilt';
import '../styles/Card.css'

export default function Card({character, handleClick}) {
  return (
    <Tilt className='tilt' >
      <div className='card' onClick={()=>handleClick(character.id)}>
        <img src={character.imgUrl} alt={character.name} />
        <span>{character.name}</span>
      </div>
    </Tilt> 
  )
}


