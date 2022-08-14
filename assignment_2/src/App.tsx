import './App.css';
import { Header } from './components';
import { Home, Login, Game, GameLog, Games } from './pages';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="game" element={<Game />} />
          <Route path="games" element={<Games />} />
          <Route path="gamelog/:id" element={<GameLog />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  )
}

export default App;
