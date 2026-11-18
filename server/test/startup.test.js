const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const http = require('node:http');
const path = require('node:path');
const { createServer } = require('node:net');
const { once } = require('node:events');
const { test } = require('node:test');

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

const getAvailablePort = async () => {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();
  server.close();
  await once(server, 'close');
  return port;
};

const getHealthResponse = port => new Promise((resolve, reject) => {
  const request = http.get(`http://127.0.0.1:${port}/`, response => {
    let body = '';
    response.setEncoding('utf8');
    response.on('data', chunk => { body += chunk; });
    response.on('end', () => resolve({ statusCode: response.statusCode, body }));
  });
  request.on('error', reject);
});

test('server starts and responds to the health route', async t => {
  const port = await getAvailablePort();
  const serverProcess = spawn(process.execPath, ['index.js'], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let output = '';
  serverProcess.stdout.on('data', chunk => { output += chunk; });
  serverProcess.stderr.on('data', chunk => { output += chunk; });

  t.after(async () => {
    if (serverProcess.exitCode === null) {
      const exited = once(serverProcess, 'exit');
      serverProcess.kill('SIGTERM');
      await Promise.race([exited, delay(2000)]);
      if (serverProcess.exitCode === null) serverProcess.kill('SIGKILL');
    }
  });

  let response;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (serverProcess.exitCode !== null) break;
    try {
      response = await getHealthResponse(port);
      break;
    } catch (error) {
      await delay(100);
    }
  }

  assert.ok(response, `server did not become ready. Output: ${output}`);
  assert.equal(response.statusCode, 200);
  assert.match(response.body, /server is up and running/);
});
