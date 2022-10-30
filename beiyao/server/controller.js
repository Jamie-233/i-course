const fs = require('fs');
// const params = url.parse(req.url, true);

module.exports = {
    index(res) {
        fs.readFile('server/index.html', 'utf-8', (err, chunk) => {
            res.end(chunk);
        });
    },
    user(postData, res) {
        console.log('postData', postData)
        res.end('user');
    }
}