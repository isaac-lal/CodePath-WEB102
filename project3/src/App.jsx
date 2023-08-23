import { useState } from 'react'
import './App.css'
import Card from './components/Card.jsx';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className='top'>
        <h1 className='title'>Learn Italian - Flashcards!</h1>
        <p className='description'>Test your knowledge of Italian with these interactive flashcards:</p>
        <p className='card-count'>10 Cards</p>
      </div>
      <Card />
    </div>
  )
}

export default App
