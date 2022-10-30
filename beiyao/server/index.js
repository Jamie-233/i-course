const http = require('http');

const router = require('./router')

const server = http.createServer();

server.on('request', (req, res) => {
    // res.setHeader('Content-type', 'text/plain;charset=utf-8');
    res.setHeader('Content-type', 'text/html;charset=utf-8');
    router(req, res)
});

server.listen(8080, () => {
    console.log('server running on http://localhost:8080');
});
