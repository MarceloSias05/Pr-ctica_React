import React from 'react';

const ContactPage = () => {
  return (
    <div style={containerStyle}>
      <div style={profileContainerStyle}>
        <div style={imageContainerStyle}>
          {/* Reemplaza la URL con la ruta a tu imagen */}
          <img 
            src="https://media.licdn.com/dms/image/v2/D4E03AQEw3wJr4lbdFw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726797443151?e=1753920000&v=beta&t=yjgvDSKf4_1GWqQ3ApeN-4izs55wWKpVn3pbCTXt5-U" 
            alt="Foto de perfil" 
            style={imageStyle}
          />
        </div>
        
        <div style={infoContainerStyle}>
          <h1 style={nameStyle}>Marcelo Sias</h1>
          <h3 style={titleStyle}>Desarrollador Web</h3>
            
          <div style={descriptionStyle}>
            <p>
              Soy un desarrollador web apasionado por crear experiencias digitales 
              intuitivas y atractivas. Me especializo en tecnologías frontend como 
              React, HTML, CSS y JavaScript.
            </p>
            <p>
              Me encanta resolver problemas complejos y convertir ideas en 
              aplicaciones funcionales. Siempre estoy aprendiendo nuevas tecnologías
              para mejorar mis habilidades y mantenerme actualizado en el campo.
            </p>
          </div>
          
          <div style={contactInfoStyle}>
            <h3 style={contactTitleStyle}>Información de contacto</h3>
            <ul style={contactListStyle}>
              <li>📧 Email: arnoldomarcelos@gmail.com</li>
              <li>🌐 GitHub: <a href="https://github.com/MarceloSias05" target="_blank" rel="noopener noreferrer">https://github.com/MarceloSias05</a></li>
              <li>💼 LinkedIn: <a href="https://www.linkedin.com/in/marcelo-sias/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/marcelo-sias/</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const containerStyle = {
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '3rem 1rem',
};

const profileContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  padding: '2rem',
  gap: '2rem',
};

const imageContainerStyle = {
  width: '200px',
  height: '200px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: '4px solid #3b82f6',
  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const infoContainerStyle = {
  textAlign: 'center',
  maxWidth: '700px',
};

const nameStyle = {
  fontSize: '2.5rem',
  color: '#1e3a8a',
  marginBottom: '0.5rem',
};

const titleStyle = {
  fontSize: '1.5rem',
  color: '#3b82f6',
  fontWeight: '500',
  marginTop: '0',
  marginBottom: '1.5rem',
};

const descriptionStyle = {
  fontSize: '1.1rem',
  lineHeight: '1.7',
  color: '#4b5563',
  marginBottom: '2rem',
  textAlign: 'left',
};

const contactInfoStyle = {
  backgroundColor: '#f0f9ff',
  padding: '1.5rem',
  borderRadius: '8px',
  textAlign: 'left',
};

const contactTitleStyle = {
  fontSize: '1.3rem',
  color: '#1e3a8a',
  marginTop: '0',
  marginBottom: '1rem',
};

const contactListStyle = {
  listStyle: 'none',
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.7rem',
  fontSize: '1.1rem',
  color: '#4b5563',
};

export default ContactPage;