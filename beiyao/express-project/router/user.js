const express = require('express');

const user_controller = require('../controller/user-controller');

const router = express.Router();

router
    .post('/register', user_controller.register)
    .get('/list', user_controller.list)
    .delete('/list', user_controller.delete);

module.exports = router;
