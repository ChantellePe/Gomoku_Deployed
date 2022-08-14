import './App.css';
import { Header, UserProvider, Logout } from './components';
import { Home, Login, Game, GameLog, Games, SignUp } from './pages';
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <UserProvider>
      <Header />
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="game" element={<Game />} />
          <Route path="games" element={<Games />} />
          <Route path="gamelog/:id" element={<GameLog />} />
          <Route path="signup/" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Logout />
      </main>
    </UserProvider>
  )
}

export default App;
