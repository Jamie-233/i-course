const express = require('express');

const { getDB, saveDB } = require('./db');

const app = express();

// app.use(express.urlencoded());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const data = await getDB();
        res.send(data.user);
    } catch (error) {
        res.status(500).json({ error });
    }
});

app.post('/', async (req, res) => {
    console.log(req.body);
    let params = req.body;

    if (!params) {
        res.status(403).json({
            error: 'miss user info'
        });
    }

    const data = await getDB();
    const id = data.users[data.users.length - 1].id + 1;

    data.users.push({
        ...params,
        id
    });

    try {
        const write_result = await saveDB(data);
        if (!write_result) {
            res.status(200).send({
                msg: 'success'
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }

    res.send('ok');
});

app.put('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('id', id)
    const body = req.body;

    try {
        const data = await getDB()
        const user_id = Number.parseInt(id);
        const user = data.users.find(item => item.id === user_id);
        if(!user) {
            res.status(403).json({
                error: '用户不存在'
            })
        }

        user.username = body?.username || user.username;
        user.age = body?.age || user.age;
        data.users[id - 1] = user;
        
        const result = await saveDB(data)

        if(!result) {
            res.status(201).json({
                msg: 'success'
            })
        }
        res.send(user)
    }catch(error) {
        res.status(500).json({error})
    }
    res.send(id);
})

app.listen(3000, () => {
    console.log('server run on http://localhost:3000');
});
