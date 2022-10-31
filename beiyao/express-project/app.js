const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const router = require('./router');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use('/api/v1', router);

// /us?er /us+er /us*er
// app.get('/user/:id/video/:vid', (req, res) => {
//     console.log(req.params);
//     res.send(`${req.method}---${req.url}`);
// }).post('/video', () => {
//     console.log(req.params);
//     res.send(`${req.method}---${req.url}`);
// });

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
