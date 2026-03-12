export default function handler(req, res) {
    // Permitir CORS para que Flutter no tenga problemas de bloqueo
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const data = req.body;
        console.log("Datos recibidos de Flutter:", data);

        // Aquí es donde en el futuro guardarás en Supabase o Postgres
        return res.status(201).json({
            id: Date.now(),
            status: "success",
            mensaje: "Reporte recibido correctamente en Vercel"
        });
    }

    // Respuesta para cuando entras desde el navegador
    res.status(200).json({ mensaje: "El servidor está activo" });
}