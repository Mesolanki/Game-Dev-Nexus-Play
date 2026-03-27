const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    featuredAsset: { id: String, title: String, tagline: String, price: String, image: String },
    globalMarket: [{ id: String, title: String, genre: String, price: String, image: String }],
    liveEvents: [{ target: String, prize: String, class: String, status: String }],
    upcomingReleases: [{ id: String, title: String, eta: String, type: String, image: String, status: String }],
    systemTelemetry: [{ label: String, value: String, trend: String }],
    topDrivers: [{ rank: String, alias: String, time: String, car: String }],
    trackComms: [{ time: String, type: String, msg: String }]
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);