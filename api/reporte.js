export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const data = req.body;
        return res.status(201).json({
            id: Math.floor(Math.random() * 1000),
            status: "success",
            mensaje: "Reporte recibido"
        });
    }

    res.status(200).json({ mensaje: "API activa" });
}