import { useEffect, useState } from 'react';
import './styles/App.css';
import fetchCharacterDetails from './assets/cards';
import Cards from './components/Cards';
import Header from './components/Header';
import GameOver from './components/GameOver';

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [numCards, setNumCards] = useState(4);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const cntCharacters = characters.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterDetails = await fetchCharacterDetails();
        setCharacters(characterDetails);
      } catch (error) {
        console.error('Error fetching character details: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isGameOver && currentScore > highScore) {
      setHighScore(currentScore);
    }
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) => ({ ...character, isSelected: false }))
    );
  }, [isGameOver]);

  useEffect(() => {
    if (currentScore !== 0 && currentScore === cntCharacters) {
      setIsWin(true);  
      setIsGameOver(true);
    }
  }, [currentScore]);

  function shuffleCards(characters) {
    let shuffledCharacters = [...characters];
    let currentIndex = shuffledCharacters.length;
    let randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffledCharacters[currentIndex], shuffledCharacters[randomIndex]] = [
        shuffledCharacters[randomIndex],
        shuffledCharacters[currentIndex],
      ];
    }

    return shuffledCharacters;
  }

  function drawCards(numCards) {
    // NEED TO FIX!!!
    const shuffledCards = shuffleCards(characters);
  
    const selectedCards = shuffledCards.filter((card) => card.isSelected);
    const unselectedCards = shuffledCards.filter((card) => !card.isSelected);
    const cntSelected = selectedCards.length;
    const cntRemaining = cntCharacters - cntSelected;
    const maxUnselected = numCards - 1;
    console.clear()
    console.table(selectedCards);
    console.table(unselectedCards)

    console.log(selectedCards.length < numCards, cntRemaining <=  maxUnselected, numCards - cntRemaining )
    const nDrawUnselected = selectedCards.length < numCards
      ? numCards - cntSelected
      : cntRemaining <=  numCards - 1
      ? Math.floor(Math.random() * cntRemaining) + 1
      : Math.floor(Math.random() * maxUnselected) + 1;
  
    const nDrawSelected = nDrawUnselected === 0 ? numCards : numCards - nDrawUnselected;
    
    console.log(cntRemaining, nDrawSelected, nDrawUnselected)

    const nextCards = shuffleCards([
      ...unselectedCards.slice(0, nDrawUnselected),
      ...selectedCards.slice(0, nDrawSelected),
    ]);
  
    return nextCards;
  }

  function updateCharacterSelection(id) {
    const newCharacters = characters.map((character) => {
      if (character.id === id) {
        return { ...character, isSelected: true };
      }
      return character;
    });
    setCharacters(newCharacters);
  }

  function handleCardSelection(id) {
    const selectedCharacter = characters.find(
      (character) => character.id === id
    );
    if (selectedCharacter.isSelected) {
      setIsGameOver(true);
      setIsWin(false);
    }

    if (!selectedCharacter.isSelected) {
      setCurrentScore((score) => score + 1);    
      updateCharacterSelection(id);
    }
  }

  function resetGame() {
    setIsGameOver(false);
    setIsWin(false);
    setCurrentScore(0);
  }

  return (
    <>
      <Header score={currentScore} highScore={highScore} />
        {isGameOver ? (
          <GameOver handleReset={resetGame} isWin={isWin} />
        ) : cntCharacters > 0 ? (
          <Cards
            characters={drawCards(numCards)}
            handleClick={handleCardSelection}
          />
        ) : null}
    </>
  );
}

export default App;
