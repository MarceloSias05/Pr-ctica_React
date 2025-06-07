import React, { useState, useEffect } from 'react';

const VideoGamePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking');
  const [retryCount, setRetryCount] = useState(0);

  // Verificar si el servidor Unity está corriendo
  useEffect(() => {
    const checkServer = async () => {
      try {
        // Usar fetch normal para verificar el servidor
        const response = await fetch('http://localhost:54569/', { 
          method: 'GET',
          mode: 'cors'
        });
        
        if (response.ok) {
          setServerStatus('running');
          setError(null);
          setRetryCount(0);
        } else {
          throw new Error(`Servidor respondió con código: ${response.status}`);
        }
      } catch (err) {
        console.log('Error de conexión:', err.message);
        setServerStatus('offline');
        setError('El servidor Unity no está corriendo en el puerto 54569');
      }
    };

    checkServer();
    
    // Verificar cada 3 segundos si el servidor está disponible
    const interval = setInterval(checkServer, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleIframeLoad = () => {
    console.log('Iframe cargado exitosamente');
    setIsLoading(false);
    setServerStatus('running');
    setError(null);
  };

  const handleIframeError = (e) => {
    console.error('Error en iframe:', e);
    setError('Error al cargar el juego. Verifica que el servidor esté corriendo.');
    setIsLoading(false);
    setServerStatus('error');
  };

  const retryConnection = () => {
    setRetryCount(prev => prev + 1);
    setIsLoading(true);
    setError(null);
    setServerStatus('checking');
  };

  return (
    <div style={containerStyle}>
      <section style={headerSectionStyle}>
        <h1 style={titleStyle}>🎮 Mi Videojuego Unity</h1>
        <p style={descriptionStyle}>
          Este juego fue desarrollado en Unity y exportado para la web usando WebGL.
          ¡Disfruta jugando directamente en tu navegador!
        </p>
        
        {/* Indicador de estado del servidor */}
        <div style={{
          ...statusIndicatorStyle,
          backgroundColor: serverStatus === 'running' ? '#dcfce7' : 
                         serverStatus === 'offline' ? '#fee2e2' : 
                         serverStatus === 'error' ? '#fef2f2' : '#fef3c7'
        }}>
          <span style={{
            color: serverStatus === 'running' ? '#166534' : 
                   serverStatus === 'offline' ? '#dc2626' : 
                   serverStatus === 'error' ? '#b91c1c' : '#d97706'
          }}>
            {serverStatus === 'running' ? '✅ Servidor Unity conectado' :
             serverStatus === 'offline' ? '❌ Servidor Unity desconectado' :
             serverStatus === 'error' ? '⚠️ Error en el juego' :
             '🔄 Verificando servidor...'}
          </span>
          {retryCount > 0 && (
            <span style={{ fontSize: '12px', marginLeft: '10px', opacity: 0.7 }}>
              (Intento #{retryCount})
            </span>
          )}
        </div>
      </section>

      <section style={gameSectionStyle}>
        {/* Contenedor principal del juego */}
        <div style={gameFrameStyle}>
          {serverStatus === 'running' && (
            <>
              {isLoading && (
                <div style={loadingOverlayStyle}>
                  <div style={loadingSpinnerStyle}></div>
                  <h3>Cargando juego Unity...</h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    Esto puede tomar unos momentos...
                  </p>
                </div>
              )}
              
              <iframe
                src="http://localhost:54569/"
                style={{
                  ...iframeStyle,
                  visibility: isLoading ? 'hidden' : 'visible'
                }}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                title="Unity Game"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; microphone; camera"
              />
            </>
          )}
          
          {(error || serverStatus === 'offline' || serverStatus === 'error') && (
            <div style={errorContainerStyle}>
              <h3>❌ Error al cargar el juego</h3>
              <p>{error || 'El servidor Unity no está disponible'}</p>
              
              <button onClick={retryConnection} style={retryButtonStyle}>
                🔄 Reintentar conexión
              </button>
              
              <div style={instructionsStyle}>
                <h4>Pasos para solucionar:</h4>
                <ol>
                  <li>
                    <strong>Verificar servidor:</strong>
                    <br />
                    <code>npm run unity-server</code>
                  </li>
                  <li>
                    <strong>O iniciar todo junto:</strong>
                    <br />
                    <code>npm run dev-with-unity</code>
                  </li>
                  <li>
                    <strong>Verificar archivos Unity:</strong>
                    <pre style={codeBlockStyle}>
{`public/unity/game/Build/
  ├── game.loader.js ✅
  ├── game.data.br (requerido)
  ├── game.framework.js.br (requerido)
  └── game.wasm.br (requerido)`}
                    </pre>
                  </li>
                </ol>
                
                <div style={buttonGridStyle}>
                  <button 
                    onClick={() => window.open('http://localhost:54569', '_blank')}
                    style={testButtonStyle}
                  >
                    🔗 Probar directo
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    style={testButtonStyle}
                  >
                    🔄 Recargar página
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText('npm run dev-with-unity');
                      alert('Comando copiado al portapapeles');
                    }}
                    style={testButtonStyle}
                  >
                    📋 Copiar comando
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section style={infoSectionStyle}>
        <h2 style={subtitleStyle}>Acerca del Juego</h2>
        <div style={infoGridStyle}>
          <div style={infoCardStyle}>
            <h4>🎯 Género</h4>
            <p>Trivia / Educativo</p>
          </div>
          <div style={infoCardStyle}>
            <h4>🕹️ Controles</h4>
            <p>Mouse y Teclado</p>
          </div>
          <div style={infoCardStyle}>
            <h4>⚡ Tecnología</h4>
            <p>Unity WebGL</p>
          </div>
          <div style={infoCardStyle}>
            <h4>🌐 Estado</h4>
            <p style={{ 
              color: serverStatus === 'running' ? '#059669' : '#dc2626',
              fontWeight: 'bold' 
            }}>
              {serverStatus === 'running' ? 'En línea' : 'Desconectado'}
            </p>
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
  height: '600px',
  margin: '0 auto',
  backgroundColor: '#231F20',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  position: 'relative',
  border: '2px solid #374151'
};

const iframeStyle = {
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#231F20'
};

const loadingOverlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#231F20',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  color: 'white',
  borderRadius: '6px'
};

const errorContainerStyle = {
  padding: '2rem',
  backgroundColor: '#fee2e2',
  borderRadius: '8px',
  marginBottom: '2rem',
  textAlign: 'center',
  maxWidth: '800px'
};

const retryButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: '500',
  marginBottom: '20px',
  transition: 'background-color 0.2s ease'
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

const statusIndicatorStyle = {
  padding: '8px 16px',
  borderRadius: '6px',
  marginTop: '10px',
  textAlign: 'center',
  fontWeight: '500'
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

const testButtonStyle = {
  padding: '8px 12px',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
};

const buttonGridStyle = {
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
  gap: '10px', 
  marginTop: '15px'
};

const codeBlockStyle = {
  backgroundColor: '#1f2937',
  color: '#e5e7eb',
  padding: '12px',
  borderRadius: '4px',
  fontSize: '12px',
  fontFamily: 'monospace',
  overflowX: 'auto',
  margin: '10px 0'
};


export default VideoGamePage;