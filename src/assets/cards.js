
const characters = [
    {
        id: 5
    },
    {
        id: 107
    },
    {
        id: 122
    },
    {
        id: 193
    },
    {
        id: 199
    },
    {
        id: 210
    },
    {
        id: 212
    },
    {
        id: 230
    },
    {
        id: 356
    },
    {
        id: 388
    },
    {
        id: 407
    },
    {
        id: 421
    },
    {
        id: 1066
    },
    {
        id: 1293
    },
    {
        id: 1299
    }
]

const fetchCharacterData = async (id) => {
    try {
      const response = await fetch(`https://narutodb.xyz/api/character/${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error fetching character data:', err);
      throw err;
    }
  };
  
  const fetchCharacterDetails = async () => {
    try {
      const charactersData = await Promise.all(
        characters.map(async (character) => {
          const charData = await fetchCharacterData(character.id);
  
          return {
            ...character,
            isSelected: false,
            name: charData.name,
            imgUrl: charData.images
          };
        })
      );
  
      return charactersData;
    } catch (error) {
      console.error('Error fetching character details:', error);
      throw error;
    }
  };
  
  export default fetchCharacterDetails;