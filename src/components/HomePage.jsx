import React, { useState } from 'react'

const HomePage = () => {
  // Estado para el contador principal
  const [count, setCount] = useState(0)
  
  // Estado para los valores de las operaciones matemáticas
  const [num1, setNum1] = useState(5)
  const [num2, setNum2] = useState(2)
  
  // Función para incrementar el contador
  const incrementCounter = () => {
    setCount(prevCount => prevCount + 1)
  }

  return (
    <div style={containerStyle}>
      <section style={sectionStyle}>
        <h1 style={titleStyle}>Bienvenido a Mi Aplicación</h1>
        <p style={textStyle}>
          Esta es una página de inicio con un contador y operaciones matemáticas básicas.
          Explora las diferentes funcionalidades.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={subtitleStyle}>Contador Simple</h2>
        <div style={counterContainerStyle}>
          <div style={counterDisplayStyle}>{count}</div>
          <button 
            onClick={incrementCounter}
            style={buttonStyle}
          >
            Incrementar
          </button>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={subtitleStyle}>Calculadora Básica</h2>
        <div style={calculatorStyle}>
          <div style={inputGroupStyle}>
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(Number(e.target.value))}
              style={inputStyle}
            />
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(Number(e.target.value))}
              style={inputStyle}
            />
          </div>

          <div style={operationsStyle}>
            <div style={operationCardStyle}>
              <h3>Suma</h3>
              <p style={resultStyle}>{num1 + num2}</p>
            </div>
            <div style={operationCardStyle}>
              <h3>Resta</h3>
              <p style={resultStyle}>{num1 - num2}</p>
            </div>
            <div style={operationCardStyle}>
              <h3>Multiplicación</h3>
              <p style={resultStyle}>{num1 * num2}</p>
            </div>
            <div style={operationCardStyle}>
              <h3>División</h3>
              <p style={resultStyle}>
                {num2 !== 0 ? (num1 / num2).toFixed(2) : 'Error'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Estilos
const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem 1rem'
}

const sectionStyle = {
  marginBottom: '3rem'
}

const titleStyle = {
  fontSize: '2.5rem',
  color: '#333',
  marginBottom: '1rem'
}

const subtitleStyle = {
  fontSize: '1.8rem',
  color: '#333',
  marginBottom: '1rem'
}

const textStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.6',
  color: '#555'
}

const counterContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem'
}

const counterDisplayStyle = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#3b82f6',
  backgroundColor: '#f0f9ff',
  padding: '1rem 2rem',
  borderRadius: '8px',
  minWidth: '100px',
  textAlign: 'center'
}

const buttonStyle = {
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  padding: '0.75rem 1.5rem',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
}

const calculatorStyle = {
  backgroundColor: '#f8fafc',
  padding: '1.5rem',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
}

const inputGroupStyle = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '1.5rem'
}

const inputStyle = {
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%'
}

const operationsStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '1rem'
}

const operationCardStyle = {
  backgroundColor: 'white',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  textAlign: 'center'
}

const resultStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#3b82f6'
}

export default HomePage