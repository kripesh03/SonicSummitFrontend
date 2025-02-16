
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
    <Navbar/>
      <main className='min-h-screen max-w-scree-2xl mx-auto px-4 py-8'>
        <Outlet/>
      </main>
    <footer>Footer</footer>
    </>
  )
}

export default App
