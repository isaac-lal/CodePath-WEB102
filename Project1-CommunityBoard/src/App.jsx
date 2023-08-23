import './App.css';
import Card from './components/Card.jsx';

const App = () => {
  return (
    <div className='App'>
      <header>
        <h1 class='heading'>Sushi Restaurants in NYC</h1>
      </header>
      <div className='Card-Container'>
        <Card
          name='Uogashi'
          image='./src/assets/Uogashi.jpeg'
          link='https://www.google.com/maps/search/?api=1&query=Uogashi&query_place_id=ChIJ03JXKllZwokRdL8HMVY_6A0'
        />
        <Card
          name='Nakaji'
          image='./src/assets/Nakaji.jpeg'
          link='https://www.google.com/maps/search/?api=1&query=Nakaji&query_place_id=ChIJX20rB1VbwokRM2mtS1kd9u0'
        />
        <Card
          name='Takeda'
          image='./src/assets/Takeda.jpeg'
          link='https://www.google.com/maps/search/?api=1&query=Takeda&query_place_id=ChIJT4-zRP9ZwokRph9ydWRuqTU'
        />
        <Card
          name='Joji Box'
          image='./src/assets/Joji_Box.jpeg'
          link='https://www.google.com/maps/search/?api=1&query=Joji+Box&query_place_id=ChIJoQlKzdVZwokRchZSA2Z7Jf8'
        />
        <Card
          name='Sushi Yasuda'
          image='./src/assets/Sushi_Yasuda.jpeg'
          link='https://www.google.com/maps/search/204%20E%2043rd%20St%2C%20New%20York%2C%20NY%2010017%2C%20USA/40.751165565042065,-73.97359674949541'
        />
        <Card
          name='Sushi On Me'
          image='./src/assets/Sushi_On_Me.jpeg'
          link='https://www.google.com/maps/search/?api=1&query=Sushi+On+Me&query_place_id=ChIJya9SkEZfwokRER22OiahUrY'
        />
        <Card
          name='Noz 17'
          image='./src/assets/Noz_17.jpeg'
          link='https://www.google.com/maps/search/?api=1&query=Noz+17&query_place_id=ChIJT4q4QIFZwokRs1nRu7_ckVI'
        />
        <Card
          name='Shuko'
          image='./src/assets/Shuko.jpeg'
          link='https://www.google.com/maps/search/?api=1&query=Shuko&query_place_id=ChIJe8WrB5lZwokREBs3DZYJyKc'
        />
        <Card
          name='Kanoyama'
          image='./src/assets/Kanoyama.jpeg'
          link='https://www.google.com/maps/search/175%202nd%20Ave%2C%20New%20York%2C%20NY%2010003%2C%20USA/40.730476413615385,-73.98632599079954'
        />
        <Card
          name='Yoshino'
          image='./src/assets/Yoshino.jpeg'
          link='https://www.google.com/maps/search/?api=1&query=Yoshino&query_place_id=ChIJ6WTjLENZwokRsU3IurxvnCI'
        />
      </div>
    </div>
  );
};

export default App;
