import './App.css';
import { Header } from './components';
import { Home, Login } from './pages';

function App() {
  return (
    <>
      <Header />
      <main className='main'>
        <Login />
      </main>

    </>
  )
}

export default App;
