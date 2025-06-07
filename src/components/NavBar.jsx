import React from 'react'

const NavBar = ({ navigateTo, currentPage, onLogout }) => {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}>Práctica con React</div>
      <ul style={navListStyle}>
        <li 
          onClick={() => navigateTo('home')} 
          style={{
            ...navItemStyle,
            ...(currentPage === 'home' ? activeStyle : {})
          }}
        >
          Inicio
        </li>
        <li 
          onClick={() => navigateTo('about')} 
          style={{
            ...navItemStyle,
            ...(currentPage === 'about' ? activeStyle : {})
          }}
        >
          Videojuego
        </li>
        <li 
          onClick={() => navigateTo('contact')} 
          style={{
            ...navItemStyle,
            ...(currentPage === 'contact' ? activeStyle : {})
          }}
        >
          Contacto
        </li>
        <li 
          onClick={onLogout} 
          style={logoutButtonStyle}
        >
          Cerrar Sesión
        </li>
      </ul>
    </nav>
  )
}

// Estilos
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#3b82f6',
  color: 'white',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
}

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold'
}

const navListStyle = {
  display: 'flex',
  listStyle: 'none',
  gap: '2rem',
  margin: 0,
  alignItems: 'center'
}

const navItemStyle = {
  cursor: 'pointer',
  padding: '0.5rem 0.75rem',
  borderRadius: '4px',
  transition: 'all 0.2s ease'
}

const activeStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  fontWeight: 'bold'
}

const logoutButtonStyle = {
  cursor: 'pointer',
  padding: '0.5rem 0.75rem',
  borderRadius: '4px',
  backgroundColor: '#ef4444',
  marginLeft: '1rem',
  fontWeight: '500',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center'
}

export default NavBar