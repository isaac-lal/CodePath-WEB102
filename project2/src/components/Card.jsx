import { useState, useEffect } from 'react';

const Card = (props) => {

    let dictionary = {
        "ciao": "hello/goodbye",
        "grazie": "thank you",
        "buongiorno": "good morning",
        "buonasera": "good evening",
        "sì": "yes",
        "mela": "apple",
        "per favore": "please",
        "scusa": "excuse me",
        "arrivederci": "goodbye",
        "amore": "love",
    };
    let randomIndex = Math.floor(Math.random() * Object.keys(dictionary).length);
    let randomWord = Object.keys(dictionary)[randomIndex];
    let translation = dictionary[randomWord];
    
    const [begun, begin] = useState(false)
    const [itDisplayed, changeWord] = useState(randomWord)
    const [engDisplayed, changeTranslation] = useState(translation)

    useEffect(() => {
        let newTranslation = dictionary[itDisplayed];
        changeTranslation(newTranslation);
    }, [itDisplayed]);

    const [display, changeDisplay] = useState(itDisplayed)

    const beginGame = () =>{
        if(begun === false){
            return (
                <div className="card">
                    <button className="begin-btn" onClick={() => begin(true)}>Begin</button>
                </div>
            )
        } else {
            return (
                <div className='game'>
                    <div className="card" onClick={() => changeDisplay(display === itDisplayed ? engDisplayed : itDisplayed)}>
                        <p>{display}</p>
                    </div>
                    <button className="next-btn" onClick={() => {
                        let newIndex = Math.floor(Math.random() * Object.keys(dictionary).length);
                        let newWord = Object.keys(dictionary)[newIndex];
                        let newTranslation = dictionary[newWord];
                        changeWord(newWord);
                        changeTranslation(newTranslation);
                        changeDisplay(newWord);
                    }}>Next</button>
                </div>
            )
        }
    }

    return beginGame()
}

export default Card
