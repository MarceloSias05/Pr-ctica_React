# Practica con React

Ejecutar
- npm install
- 'npm run dev'

# React Unity Game Application

Esta aplicación combina React con un juego Unity WebGL integrado.

## 🚀 Instalación

```bash
npm install
```

## 🎮 Ejecutar la aplicación

### Opción 1: Ejecutar todo junto (Recomendado)
```bash
npm run dev-with-unity
```

### Opción 2: Ejecutar por separado
```bash
# Terminal 1 - Servidor Unity
npm run unity-server

# Terminal 2 - Aplicación React
npm run dev
```

## 📁 Estructura de archivos Unity

Para que el juego funcione, necesitas colocar los archivos de tu build Unity WebGL en:

```
public/
  unity/
    game/
      Build/
        game.loader.js
        game.data.br
        game.framework.js.br
        game.wasm.br
      index.html
      TemplateData/ (opcional)
```

## 🔧 Configuración

- **Puerto React**: 5173 (por defecto de Vite)
- **Puerto Unity**: 54569
- **Login de prueba**: 
  - Email: `mau@gmail.com`
  - Password: `mauimaui1234`

## 🎯 Funcionalidades

- ✅ Sistema de autenticación
- ✅ Navegación entre páginas
- ✅ Integración Unity WebGL
- ✅ Servidor Express para Unity
- ✅ Detección automática de servidor
- ✅ Interfaz responsive

## 🛠️ Tecnologías

- React 18
- Unity WebGL
- Express.js
- Lucide React (iconos)
- CSS-in-JS

## 📝 Notas

1. Asegúrate de que el puerto 54569 esté disponible
2. Los archivos Unity deben estar comprimidos con Brotli (.br)
3. El servidor Unity incluye configuración CORS automática