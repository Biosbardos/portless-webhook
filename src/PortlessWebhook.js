const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 3000;

// Usa variables de entorno para el secreto y el nombre de la cabecera de firma
const secret = process.env.WEBHOOK_SECRET;
const signatureHeader = process.env.SIGNATURE_HEADER; // Cambia según el servicio
const signatureAlgorithm = process.env.SIGNATURE_ALGORITHM || 'sha256'; // Por defecto sha256

if (!secret || !signatureHeader) {
  console.error('WEBHOOK_SECRET y SIGNATURE_HEADER deben estar definidos en las variables de entorno.');
  process.exit(1);
}

// Middleware para procesar JSON y verificar la firma
function verifySignature(req, res, buf, encoding) {
  const signature = req.headers[signatureHeader];
  if (!signature) {
    throw new Error(`No se encontró la cabecera ${signatureHeader}.`);
  }

  // Calcula la firma HMAC (puedes ajustar el algoritmo si el servicio lo requiere)
  const hmac = crypto.createHmac(signatureAlgorithm, secret);
  hmac.update(buf);
  const digest = `${signatureAlgorithm}=` + hmac.digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
    throw new Error('Firma no válida.');
  }
}

// Integra el verificador en el middleware de Express
app.use(express.json({ verify: verifySignature }));

// Ruta genérica para recibir webhooks
app.post('/webhook', (req, res) => {
  const payload = req.body;
  if (!payload || typeof payload !== 'object') {
    return res.status(400).send('Payload inválido');
  }
  // Aquí puedes procesar el payload como quieras, por ejemplo guardarlo, enviarlo, etc.
  console.log('Payload recibido:', payload);

  // Responde confirmando la recepción
  res.status(200).send('Webhook recibido correctamente');
});

app.use((err, req, res, next) => {
  console.error('Error en la petición:', err.message);
  res.status(400).send('Solicitud no válida: ' + err.message);
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
  console.log('Para exponer este servidor públicamente, ejecuta en otra terminal:');
  console.log('ngrok http 3000');
  console.log('Usa la URL pública que te da ngrok como endpoint en el servicio externo.');
});
