import { db } from '@vercel/postgres';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const client = await db.connect();

    // CREAR TABLA (Solo se ejecuta si no existe)
    await client.sql`CREATE TABLE IF NOT EXISTS reportes (
        id SERIAL PRIMARY KEY,
        placa TEXT,
        falla TEXT,
        ubicacion TEXT,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

    if (req.method === 'POST') {
        const { id_vehiculo, descripcion_falla, latitud, longitud } = req.body;
        const ubicacion = `${latitud}, ${longitud}`;

        // GUARDAR EN BD
        await client.sql`INSERT INTO reportes (placa, falla, ubicacion) 
                         VALUES (${id_vehiculo}, ${descripcion_falla}, ${ubicacion});`;

        return res.status(201).json({ mensaje: "Guardado en BD" });
    }

    // SI ES GET (Cuando abres la web), LEEMOS DE LA BD
    const { rows } = await client.sql`SELECT * FROM reportes ORDER BY fecha DESC;`;
    return res.status(200).json(rows);
}