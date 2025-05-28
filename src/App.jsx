import { useState } from 'react'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import ContactPage from './components/ContactPage'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  // Función para cambiar entre páginas
  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="App">
      <NavBar navigateTo={navigateTo} currentPage={currentPage} />
      <main className="content">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'contact' && <ContactPage />}
        {/* Puedes agregar más páginas aquí */}
      </main>
    </div>
  )
}

export default App