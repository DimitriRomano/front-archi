import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import HomeView from './views/Home'
import { VMProvider } from './shared/VmContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Routes>
        
        <Route path="/" element={
          <VMProvider>
            <HomeView />
          </VMProvider>
        } />
      </Routes>
    </div>
  )
}

export default App
