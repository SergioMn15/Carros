export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        return res.status(201).json({
            id: Date.now(),
            status: "success",
            mensaje: "Reporte recibido correctamente"
        });
    }

    return res.status(200).json({ mensaje: "API activa" });
}