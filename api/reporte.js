// Esta variable vive en la memoria del servidor mientras la función esté activa
let reportes = [];

export default function handler(req, res) {
    // 1. Configurar cabeceras CORS (Obligatorio para que Flutter no falle)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 2. Responder a la petición de prueba (Pre-flight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Manejo de POST (Desde Flutter)
    if (req.method === "POST") {
        const data = req.body;

        const nuevoReporte = {
            id: reportes.length + 1,
            placa: data.id_vehiculo, // Usamos 'placa' para que coincida con tu index.html
            fecha: data.fecha || new Date().toISOString(),
            ubicacion: `${data.latitud}, ${data.longitud}`, // Formato para la tabla
            falla: data.descripcion_falla,
            firma: data.firma_conductor_base64
        };

        reportes.push(nuevoReporte);

        return res.status(201).json({
            id: nuevoReporte.id,
            mensaje: "Reporte guardado en memoria"
        });
    }

    // 4. Manejo de GET (Desde la página Web)
    if (req.method === "GET") {
        return res.status(200).json(reportes);
    }

    // 5. Método no permitido
    res.status(405).json({ error: "Método no permitido" });
}