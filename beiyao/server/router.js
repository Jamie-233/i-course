const controller = require('./controller');

module.exports = (req, res) => {

    if (req.method === 'GET') {
        if (req.url === '/') {
            controller.index(res);
        } else {
            console.log(req.url);
            res.end('321');
        }
    } else if (req.method === 'POST') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            const value = require('querystring').parse(data);
            controller.user(value, res)
        });
    }
};
