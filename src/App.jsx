import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import ContactPage from './components/ContactPage'
import Login from './components/Login'
import authService from './services/authService.js'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      
      try {
        if (authService.isAuthenticated()) {
          await authService.verifyToken();
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error de autenticación:", error);
        setIsAuthenticated(false);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  const handleLogout = () => {
    authService.logout(); 
    setIsAuthenticated(false);
    alert('Sesión cerrada correctamente')
  }

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('home');
  }

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        fontSize: '20px',
        color: '#3b82f6'
      }}>
        Cargando...
      </div>
    );
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