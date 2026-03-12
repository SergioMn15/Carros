export default function handler(req, res) {
    // 1. Cabeceras para que Flutter no tenga problemas de permisos (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 2. Manejo de peticiones de prueba (Pre-flight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 3. Manejo del POST (Lo que manda Flutter)
    if (req.method === 'POST') {
        const data = req.body;
        console.log("Datos recibidos:", data);

        return res.status(201).json({
            id: Date.now(),
            status: "success",
            mensaje: "Reporte recibido en Vercel"
        });
    }

    // 4. Si intentas entrar por el navegador (GET)
    res.status(200).json({ mensaje: "API activa. Envía un POST para registrar datos." });
}