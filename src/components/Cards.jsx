/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import Card from './Card'
import '../styles/Cards.css'
/* eslint-disable react/prop-types */

export default function Cards({characters, handleClick}) {
    
    const currentCharacters = characters.slice(0, 4);

    return (
        <div className='cards-container'>
            {
                currentCharacters.map(character => (
                    <Card 
                        key={character.id} 
                        character={character} 
                        handleClick={handleClick} 
                    />
                  )
                )
            }
        </div>
    )
}