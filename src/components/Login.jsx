import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';

const Login = () => {  // Cambié LoginPage por Login para que coincida con la importación en App.jsx
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Validación de email en tiempo real
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Cálculo de fortaleza de contraseña
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  // Efecto para calcular fortaleza de contraseña
  useEffect(() => {
    if (!isLogin && formData.password) {
      setPasswordStrength(calculatePasswordStrength(formData.password));
    }
  }, [formData.password, isLogin]);

  // Manejo de cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar email
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validaciones específicas para registro
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'El nombre es requerido';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirma tu contraseña';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }

      if (passwordStrength < 3) {
        newErrors.password = 'La contraseña debe ser más fuerte';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulación de llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría la lógica real de autenticación
      console.log(isLogin ? 'Login:' : 'Registro:', formData);
      
      // Simular éxito
      alert(isLogin ? '¡Login exitoso!' : '¡Registro exitoso!');
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cambiar entre login y registro
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setErrors({});
    setPasswordStrength(0);
  };

  // Componente para mostrar fortaleza de contraseña
  const PasswordStrengthIndicator = () => {
    const getStrengthText = () => {
      switch (passwordStrength) {
        case 0:
        case 1: return 'Muy débil';
        case 2: return 'Débil';
        case 3: return 'Regular';
        case 4: return 'Fuerte';
        case 5: return 'Muy fuerte';
        default: return '';
      }
    };

    const getStrengthColor = () => {
      switch (passwordStrength) {
        case 0:
        case 1: return '#ef4444';
        case 2: return '#f97316';
        case 3: return '#eab308';
        case 4: return '#3b82f6';
        case 5: return '#10b981';
        default: return '#d1d5db';
      }
    };

    if (!formData.password || isLogin) return null;

    return (
      <div style={{ marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ flex: 1, backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
            <div 
              style={{ 
                height: '8px', 
                borderRadius: '9999px', 
                transition: 'all 0.3s ease',
                backgroundColor: getStrengthColor(),
                width: `${(passwordStrength / 5) * 100}%`
              }}
            />
          </div>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{getStrengthText()}</span>
        </div>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            <span style={{ color: formData.password.length >= 8 ? '#059669' : '#6b7280' }}>
              ✓ Min. 8 caracteres
            </span>
            <span style={{ color: /[A-Z]/.test(formData.password) ? '#059669' : '#6b7280' }}>
              ✓ Mayúscula
            </span>
            <span style={{ color: /[a-z]/.test(formData.password) ? '#059669' : '#6b7280' }}>
              ✓ Minúscula
            </span>
            <span style={{ color: /[0-9]/.test(formData.password) ? '#059669' : '#6b7280' }}>
              ✓ Número
            </span>
          </div>
        </div>
      </div>
    );
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #faf5ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: '32px',
    border: '1px solid #e5e7eb',
    width: '100%',
    maxWidth: '448px'
  };

  const inputStyle = (hasError, isValid) => ({
    display: 'block',
    width: '100%',
    paddingLeft: '40px',
    paddingRight: hasError ? '12px' : isValid ? '40px' : '12px',
    paddingTop: '12px',
    paddingBottom: '12px',
    border: `1px solid ${hasError ? '#fca5a5' : isValid ? '#86efac' : '#d1d5db'}`,
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  });

  const buttonStyle = {
    width: '100%',
    background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '8px',
    fontWeight: '500',
    border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    opacity: isLoading ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '16px',
    transition: 'all 0.2s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={{ width: '100%', maxWidth: '448px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '64px', 
            height: '64px', 
            background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)', 
            borderRadius: '50%', 
            marginBottom: '16px' 
          }}>
            <User style={{ width: '32px', height: '32px', color: 'white' }} />
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px', margin: 0 }}>
            {isLogin ? 'Bienvenido' : 'Crear Cuenta'}
          </h1>
          <p style={{ color: '#6b7280', margin: 0 }}>
            {isLogin 
              ? 'Inicia sesión en tu cuenta' 
              : 'Regístrate para comenzar'
            }
          </p>
        </div>

        {/* Form */}
        <div style={cardStyle}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Nombre (solo en registro) */}
            {!isLogin && (
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Nombre completo
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <User style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={inputStyle(errors.name)}
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                {errors.name && (
                  <p style={{ marginTop: '8px', fontSize: '14px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle style={{ width: '16px', height: '16px' }} />
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Correo electrónico
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <Mail style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle(errors.email, formData.email && validateEmail(formData.email) && !errors.email)}
                  placeholder="tu@email.com"
                />
                {formData.email && validateEmail(formData.email) && !errors.email && (
                  <div style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)' }}>
                    <CheckCircle2 style={{ height: '20px', width: '20px', color: '#10b981' }} />
                  </div>
                )}
              </div>
              {errors.email && (
                <p style={{ marginTop: '8px', fontSize: '14px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle style={{ width: '16px', height: '16px' }} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Contraseña
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <Lock style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={inputStyle(errors.password)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ 
                    position: 'absolute', 
                    top: '50%', 
                    right: '12px', 
                    transform: 'translateY(-50%)', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer' 
                  }}
                >
                  {showPassword ? (
                    <EyeOff style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                  ) : (
                    <Eye style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p style={{ marginTop: '8px', fontSize: '14px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle style={{ width: '16px', height: '16px' }} />
                  {errors.password}
                </p>
              )}
              <PasswordStrengthIndicator />
            </div>

            {/* Confirmar contraseña (solo en registro) */}
            {!isLogin && (
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Confirmar contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <Lock style={{ height: '20px', width: '20px', color: '#9ca3af' }} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={inputStyle(errors.confirmPassword, formData.confirmPassword && formData.password === formData.confirmPassword)}
                    placeholder="••••••••"
                  />
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <div style={{ position: 'absolute', top: '50%', right: '12px', transform: 'translateY(-50%)' }}>
                      <CheckCircle2 style={{ height: '20px', width: '20px', color: '#10b981' }} />
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p style={{ marginTop: '8px', fontSize: '14px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle style={{ width: '16px', height: '16px' }} />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Recordarme / Olvidé contraseña (solo en login) */}
            {isLogin && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    style={{ height: '16px', width: '16px', marginRight: '8px' }}
                  />
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Recordarme</span>
                </label>
                <button
                  type="button"
                  style={{ fontSize: '14px', color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            {/* Botón de submit */}
            <button type="submit" style={buttonStyle} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    border: '2px solid white', 
                    borderTop: '2px solid transparent', 
                    borderRadius: '50%', 
                    animation: 'spin 1s linear infinite' 
                  }} />
                  {isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}
                </>
              ) : (
                <>
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </>
              )}
            </button>
          </form>

          {/* Toggle entre login y registro */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280', margin: 0 }}>
              {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
              {' '}
              <button
                type="button"
                onClick={toggleMode}
                style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}
              >
                {isLogin ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>
          <p style={{ margin: 0 }}>
            Al continuar, aceptas nuestros{' '}
            <a href="#" style={{ color: '#2563eb' }}>Términos de Servicio</a>
            {' '}y{' '}
            <a href="#" style={{ color: '#2563eb' }}>Política de Privacidad</a>
          </p>
        </div>
      </div>

      {/* Estilos para la animación de loading */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Login; // Cambié la exportación para que coincida con la importación