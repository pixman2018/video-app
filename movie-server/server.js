const jsonServer = require('json-server');
// erzeugt ein express server
const server = jsonServer.create();
// Default Einstellung für den Server aktivieren
// logger, static, cors, no-cache
server.use(jsonServer.defaults());
// db.json laden und Endpunkt unter /api bereitstellen
const router = jsonServer.router('db.json');
server.use('/api', router);

server.listen(3000);