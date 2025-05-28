import axios from 'axios';

// Configura la URL base - ajusta según tu backend
const API_URL = 'http://localhost:3030'; // Actualizado para usar un solo valor consistente

// Crear una instancia de axios con la configuración base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Interceptor para añadir el token a las peticiones
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Servicio de autenticación
const authService = {
  // Login
login: async (email, password) => {
  try {
    console.log('Usando login hardcodeado');
    
    // Verificar credenciales hardcodeadas (puedes cambiarlas a lo que prefieras)
    if (email === 'mau@gmail.com' && password === 'mauimaui1234') {
      // Simular respuesta exitosa
      const fakeResponseData = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlVzdWFyaW8gZGUgUHJ1ZWJhIiwiZW1haWwiOiJ1c3VhcmlvQGVqZW1wbG8uY29tIiwiaWF0IjoxNjE2MjM5MDIyfQ.fake-token-for-testing',
        user: {
          id: 1,
          name: 'Usuario de Prueba',
          email: email
        }
      };
      
      // Guardar en localStorage igual que antes
      localStorage.setItem('token', fakeResponseData.token);
      localStorage.setItem('user', JSON.stringify(fakeResponseData.user));
      
      return fakeResponseData;
    } else {
      // Simular error si las credenciales son incorrectas
      throw { response: { data: { message: 'Credenciales inválidas' } } };
    }
  } catch (error) {
    console.error('Error de login:', error.response?.data || error.message);
    throw error.response ? error.response.data : { message: 'Error de autenticación' };
  }
},

  // Registro
  register: async (name, username, password) => {
    try {
      console.log(`Intentando registrar usuario: ${name}, ${username}`);
      // Cambiado a la ruta correcta según tu backend
      const response = await apiClient.post('/users/register', {
        name,
        username,
        password
      });
      console.log('Respuesta del servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error de registro:', error.response?.data || error.message);
      throw error.response ? error.response.data : { message: 'Error de conexión al servidor' };
    }
  },

  // Verificar token y recuperar datos del usuario
  verifyToken: async () => {
    try {
      // Cambiado a la ruta correcta según tu backend
      const response = await apiClient.get('/users/profile');
      return response.data;
    } catch (error) {
      // Si hay error, limpiar almacenamiento
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error.response ? error.response.data : { message: 'Error de verificación de token' };
    }
  },

  // Obtener usuarios (si tienes permiso)
  getUsers: async () => {
    try {
      const response = await apiClient.get('/users/get-users');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : { message: 'Error al obtener usuarios' };
    }
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Comprobar si el usuario está autenticado
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  }
};

export default authService;