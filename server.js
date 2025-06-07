import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 54569;

// Configurar CORS para permitir requests desde React
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Configurar tipos MIME correctos para archivos Unity
app.use((req, res, next) => {
  if (req.url.endsWith('.br')) {
    res.set('Content-Encoding', 'br');
    if (req.url.endsWith('.js.br')) {
      res.set('Content-Type', 'application/javascript');
    } else if (req.url.endsWith('.wasm.br')) {
      res.set('Content-Type', 'application/wasm');
    } else if (req.url.endsWith('.data.br')) {
      res.set('Content-Type', 'application/octet-stream');
    }
  }
  next();
});

// Servir archivos estáticos desde la carpeta public/unity/game
app.use("/", express.static(path.join(__dirname, "public", "unity", "game")));

// Ruta específica para el index.html del juego
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "unity", "game", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Servidor Unity corriendo en http://localhost:${PORT}`);
  console.log(`📁 Sirviendo archivos desde: ${path.join(__dirname, "public", "unity", "game")}`);
  console.log(`🎮 Abre tu navegador en http://localhost:${PORT} para probar el juego directamente`);
});
