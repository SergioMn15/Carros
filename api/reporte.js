import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Configuración de CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // 1. Intentar crear la tabla si no existe
    await sql`CREATE TABLE IF NOT EXISTS reportes (
      id SERIAL PRIMARY KEY,
      placa TEXT NOT NULL,
      falla TEXT,
      ubicacion TEXT,
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    // 2. Manejar el POST (Envío desde Flutter)
    if (req.method === 'POST') {
      const { id_vehiculo, descripcion_falla, latitud, longitud } = req.body;
      const coords = `${latitud}, ${longitud}`;

      await sql`INSERT INTO reportes (placa, falla, ubicacion) 
                VALUES (${id_vehiculo}, ${descripcion_falla}, ${coords});`;

      return res.status(201).json({ status: 'success' });
    }

    // 3. Manejar el GET (Carga de la página web)
    const { rows } = await sql`SELECT * FROM reportes ORDER BY fecha DESC;`;
    return res.status(200).json(rows);

  } catch (error) {
    console.error("Error en la base de datos:", error);
    return res.status(500).json({ error: "Error de conexión con la BD", details: error.message });
  }
}