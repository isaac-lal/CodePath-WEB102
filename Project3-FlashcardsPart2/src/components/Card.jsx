import { useState, useEffect } from 'react';

const Card = (props) => {
  const dictionary = {
    ciao: 'hello',
    grazie: 'thank you',
    buongiorno: 'good morning',
    buonasera: 'good evening',
    sì: 'yes',
    mela: 'apple',
    'per favore': 'please',
    scusa: 'excuse me',
    arrivederci: 'goodbye',
    amore: 'love',
  };

  const [shuffledDictionary, setShuffledDictionary] = useState(() => {
    const shuffledKeys = Object.keys(dictionary).sort(
      () => Math.random() - 0.5
    );
    return Object.fromEntries(
      shuffledKeys.map((key) => [key, dictionary[key]])
    );
  });

  const [history, setHistory] = useState([Object.keys(shuffledDictionary)[0]]);

  function addHistory(element) {
    setHistory([...history, element]);
  }

  const [seen, setSeen] = useState(false);
  const [index, setIndex] = useState(0);
  const [begun, begin] = useState(false);
  const [display, changeDisplay] = useState(
    Object.keys(shuffledDictionary)[index]
  );
  const [guess, setGuess] = useState('');

  useEffect(() => {
    changeDisplay(Object.keys(shuffledDictionary)[index]);
  }, [index, shuffledDictionary]);

  const beginGame = () => {
    if (!begun) {
      return (
        <div className='card'>
          <button
            className='begin-btn'
            onClick={() => begin(true)}>
            Begin
          </button>
        </div>
      );
    } else {
      return (
        <div className='game'>
          <div
            className='card'
            onClick={() => {
              changeDisplay(
                display === Object.keys(shuffledDictionary)[index]
                  ? shuffledDictionary[Object.keys(shuffledDictionary)[index]]
                  : Object.keys(shuffledDictionary)[index]
              );
              setSeen(true);
            }}>
            <p>{display}</p>
          </div>
          {index > 0 && (
            <button
              className='back-btn'
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 1);
                  changeDisplay(Object.keys(shuffledDictionary)[index]);
                }
              }}>
              Back
            </button>
          )}

          {index < Object.keys(shuffledDictionary).length - 1 && (
            <button
              className='next-btn'
              onClick={() => {
                addHistory(Object.keys(shuffledDictionary)[index + 1]);
                setIndex(index + 1);
                setSeen(false);
              }}>
              Next
            </button>
          )}
          {seen === false && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  guess ===
                  shuffledDictionary[Object.keys(shuffledDictionary)[index]]
                ) {
                  alert('Correct!');
                } else {
                  alert('Incorrect. Try again.');
                }
                setGuess('');
              }}>
              <input
                className='input'
                type='text'
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          )}
        </div>
      );
    }
  };

  return beginGame();
};

export default Card;
