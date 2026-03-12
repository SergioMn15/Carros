export default function handler(req, res) {
    // Cabeceras de seguridad para permitir conexión desde Flutter (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Responder rápido a la prueba de conexión (Pre-flight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        // Vercel ya parsea el body automáticamente si envías JSON
        const data = req.body;
        console.log("Reporte recibido:", data);

        return res.status(201).json({
            id: "ID-" + Math.floor(Math.random() * 1000),
            status: "success",
            mensaje: "Reporte guardado con éxito"
        });
    }

    // Respuesta por defecto para el navegador
    res.status(200).json({ mensaje: "API de Carros lista. Envía un POST desde la App." });
}