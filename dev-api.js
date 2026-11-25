const http = require('http');
const fs = require('fs');
const path = require('path');

const devDataPath = path.join(__dirname, 'backend', 'dev_data.json');
let devData = '{}';
try {
  devData = fs.readFileSync(devDataPath, 'utf8');
} catch (e) {
  console.error('Could not read dev_data.json', e);
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = req.url || '';
  console.log(`[API] ${req.method} ${url}`);

  if (url === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
  } else if (url === '/api/auth/config') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ demo: true, google_client_id: '' }));
  } else if (url === '/api/auth/me') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ logged_in: true, email: 'demo@kosh.local', name: 'Demo User' }));
  } else if (url === '/api/auth/demo-login' || url === '/api/auth/login') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, logged_in: true }));
  } else if (url.startsWith('/api/data')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(devData);
  } else if (url.startsWith('/api/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`✓ Kosh Demo API server listening at http://localhost:${PORT}`);
});
