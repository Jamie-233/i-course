const express = require('express');

const router = require('./router');
const router_video = require('./router/video');

const app = express();
app.use(express.json());

app.use('/lists', router);
app.use('/videos', router_video);

// /us?er
// /us+er
app.get('/us*er', (req, res) => {
    
    res.send(`${req.method}---${req.url}`);
})

const PORT = process.env.PORT || 3000;

// 挂载路由
// app.use('/api', router)

// app.get('/', (req, res) => {
//   res.send('/index');
// })

// app.get('/user', (req, res, next) => {
//   console.log(req.method)
//   next()
// }, (req, res) => {
//   res.send('/user');
// })

// app.all('/xxx', (req, res) => {
//     res.send('xxx');
// })

// 挂载统一处理服务端错误中间件
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
    next();
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: 'service error' });
    next();
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
