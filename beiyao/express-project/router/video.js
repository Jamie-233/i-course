const express = require('express');

const video_controller = require('../controller/video-controller');

const router = express.Router();

router
    .get('/list', video_controller.list)
    .get('/list/:id', video_controller.list)
    .delete('/list', video_controller.delete);

module.exports = router;
