import './App.css';
import { Header } from './components';
import { Home, Login } from './pages';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <main className='main'>
        <Home />
        {<Login />}
      </main>

    </>
  )
}

export default App;
