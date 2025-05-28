import { useState } from 'react'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import ContactPage from './components/ContactPage'
import Login from './components/Login'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isAuthenticated, setIsAuthenticated] = useState(true) 

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    alert('Sesión cerrada correctamente')
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentPage('home') 
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="App">
      <NavBar 
        navigateTo={navigateTo} 
        currentPage={currentPage} 
        onLogout={handleLogout} 
      />
      <main className="content">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
    </div>
  )
}

export default App