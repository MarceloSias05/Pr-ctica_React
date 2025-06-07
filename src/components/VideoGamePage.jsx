import React, { useState } from 'react';

const VideoGamePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setError('No se pudo cargar el juego. Verifica que el servidor esté corriendo en http://localhost:54569/');
    setIsLoading(false);
  };

  return (
    <div style={containerStyle}>
      <section style={headerSectionStyle}>
        <h1 style={titleStyle}>🎮 Mi Videojuego</h1>
        <p style={descriptionStyle}>
          Este juego fue desarrollado en Unity y exportado para la web usando WebGL.
          ¡Disfruta jugando directamente en tu navegador!
        </p>
      </section>

      <section style={gameSectionStyle}>
        {isLoading && (
          <div style={loadingContainerStyle}>
            <div style={loadingSpinnerStyle}></div>
            <h3>Cargando juego...</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Esto puede tomar unos momentos...
            </p>
          </div>
        )}

        {error && (
          <div style={errorContainerStyle}>
            <h3>❌ Error al cargar el juego</h3>
            <p>{error}</p>
            <div style={instructionsStyle}>
              <h4>Pasos para solucionar:</h4>
              <ol>
                <li>Verifica que el servidor esté corriendo en <code>http://localhost:54569/</code></li>
                <li>Asegúrate de que los archivos del juego estén disponibles</li>
                <li>Comprueba la consola del navegador (F12) para más detalles</li>
              </ol>
            </div>
          </div>
        )}

        <div style={gameFrameStyle}>
          <iframe
            src="http://localhost:54569/"
            style={iframeStyle}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            title="Unity Game"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </section>

      <section style={infoSectionStyle}>
        <h2 style={subtitleStyle}>Acerca del Juego</h2>
        <div style={infoGridStyle}>
          <div style={infoCardStyle}>
            <h4>🎯 Género</h4>
            <p>Trivia</p>
          </div>
          <div style={infoCardStyle}>
            <h4>🕹️ Controles</h4>
            <p>Mouse</p>
          </div>
          <div style={infoCardStyle}>
            <h4>⚡ Características</h4>
            <p>WebGL optimizado para navegadores</p>
          </div>
          <div style={infoCardStyle}>
            <h4>🛠️ Desarrollado con</h4>
            <p>Unity WebGL</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Estilos (sin cambios significativos)


const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem 1rem'
};

const headerSectionStyle = {
  textAlign: 'center',
  marginBottom: '2rem'
};

const titleStyle = {
  fontSize: '2.5rem',
  color: '#333',
  marginBottom: '1rem'
};

const descriptionStyle = {
  fontSize: '1.2rem',
  color: '#666',
  maxWidth: '600px',
  margin: '0 auto'
};

const gameSectionStyle = {
  marginBottom: '3rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const gameFrameStyle = {
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
  backgroundColor: '#231F20',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  height: '600px' // Altura fija para el iframe
};

const iframeStyle = {
  width: '100%',
  height: '600px', // Altura específica para el juego
  border: 'none',
  borderRadius: '8px'
};

const loadingContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '3rem',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  marginBottom: '2rem'
};

const loadingSpinnerStyle = {
  width: '50px',
  height: '50px',
  border: '5px solid #e2e8f0',
  borderTop: '5px solid #3b82f6',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '1rem'
};

const errorContainerStyle = {
  padding: '2rem',
  backgroundColor: '#fee2e2',
  borderRadius: '8px',
  marginBottom: '2rem',
  textAlign: 'center',
  maxWidth: '800px'
};

const instructionsStyle = {
  textAlign: 'left',
  marginTop: '1rem',
  padding: '1rem',
  backgroundColor: '#f3f4f6',
  borderRadius: '4px'
};

const infoSectionStyle = {
  marginTop: '3rem'
};

const subtitleStyle = {
  fontSize: '2rem',
  color: '#333',
  marginBottom: '2rem',
  textAlign: 'center'
};

const infoGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem'
};

const infoCardStyle = {
  backgroundColor: '#f8fafc',
  padding: '1.5rem',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  textAlign: 'center'
};


export default VideoGamePage;