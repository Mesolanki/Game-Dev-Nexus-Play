const express = require('express');

const { 
    getGameData, 
    seedGameData, 
    addMarketItem,
    addLiveEvent,
    addUpcomingRelease
} = require('../controller/Game_controller');

const router = express.Router();

router.get('/', getGameData);
router.post('/seed', seedGameData);

router.post('/add-vehicle', addMarketItem);
router.post('/add-event', addLiveEvent); 
router.post('/add-release', addUpcomingRelease);

module.exports = router;