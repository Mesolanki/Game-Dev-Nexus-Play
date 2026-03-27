const Game = require('../model/Game_model'); 

const seedGameData = async (req, res) => {
    try {
        await Game.deleteMany();

        const seedData = {
            featuredAsset: {
                id: "APEX_V8_TURBO", 
                title: "MIDNIGHT_RUN",
                tagline: "High-octane street racing. Push past the redline, dominate the asphalt, and build your legacy.",
                price: "FREE_TO_PLAY",
                image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop"
            },
            globalMarket: [
                { id: "R_01", title: "TOKYO_DRIFT_OS", genre: "STREET_ARCADE", price: "39.99_USD", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop" },
                { id: "R_02", title: "APEX_MOTORSPORT", genre: "SIMULATOR", price: "59.99_USD", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=800&auto=format&fit=crop" },
                { id: "R_03", title: "CANYON_RALLY_X", genre: "OFF_ROAD", price: "29.99_USD", image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800&auto=format&fit=crop" },
                { id: "R_04", title: "NEON_HIGHWAY", genre: "RETRO_RACER", price: "19.99_USD", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop" }
            ],
            liveEvents: [
                { target: "TOKYO_EXPRESSWAY_NIGHT", prize: "15,000_REP", class: "S_CLASS", status: "LIVE" },
                { target: "MOUNTAIN_DRIFT_BATTLE", prize: "8,500_REP", class: "A_CLASS", status: "STARTING_SOON" },
                { target: "QUARTER_MILE_DRAG", prize: "3,200_REP", class: "B_CLASS", status: "LIVE" }
            ],
            upcomingReleases: [
                { id: "DLC_01", title: "TWIN_TURBO_PACK", eta: "Q3_2026", type: "TUNING_KIT", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop", status: "IN_GARAGE" },
                { id: "DLC_02", title: "CARBON_AERO_KIT", eta: "Q4_2026", type: "BODY_MOD", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop", status: "PROTOTYPE" },
                { id: "DLC_03", title: "NEVADA_DESERT_TRACK", eta: "TBA", type: "CIRCUIT", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop", status: "CLASSIFIED" }
            ],
            systemTelemetry: [
                { label: "Active Racers", value: "142,509", trend: "+12%" },
                { label: "Global Top Speed", value: "278 MPH", trend: "+5%" },
                { label: "Total Drifts Logged", value: "8.4M", trend: "+24%" }
            ],
            topDrivers: [
                { rank: "01", alias: "GHOST_RIDER", time: "01:12.44", car: "CUSTOM_RSR" },
                { rank: "02", alias: "APEX_HUNTER", time: "01:13.01", car: "V8_VANTAGE" },
                { rank: "03", alias: "TOKYO_DRIFTER", time: "01:14.20", car: "SILVIA_S15" }
            ],
            trackComms: [
                { time: "04:00:12", type: "WEATHER", msg: "Heavy rain detected on Sector 4. Equip wet tires." },
                { time: "03:45:00", type: "UPDATE", msg: "Server maintenance scheduled in 2 hours." },
                { time: "02:10:05", type: "EVENT", msg: "Double REP weekend is now active!" }
            ]
        };

        const createdData = await Game.create(seedData);
        res.status(201).json({ message: "Database seeded successfully!", data: createdData });

    } catch (error) {
        res.status(500).json({ message: "Failed to seed data", error: error.message });
    }
};

const getGameData = async (req, res) => {
    try {
        const gameData = await Game.findOne();

        if (!gameData) {
            return res.status(404).json({ message: "No game data found in the database. Run the seed route first." });
        }

        res.status(200).json(gameData);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching game data", error: error.message });
    }
};

const addMarketItem = async (req, res) => {
    try {
        const { id, title, genre, price, image } = req.body;
        const gameData = await Game.findOne();
        
        if (!gameData) return res.status(404).json({ message: "Database not seeded yet." });

        gameData.globalMarket.push({ id, title, genre, price, image });
        await gameData.save();

        res.status(201).json({ message: "Vehicle added to Showroom!", data: gameData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addLiveEvent = async (req, res) => {
    try {
        const { target, prize, eventClass, status } = req.body;
        const gameData = await Game.findOne();
        
        if (!gameData) return res.status(404).json({ message: "Database not seeded yet." });

        gameData.liveEvents.push({ target, prize, class: eventClass, status });
        await gameData.save();

        res.status(201).json({ message: "Live Event added to Mainframe!", data: gameData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addUpcomingRelease = async (req, res) => {
    try {
        const { id, title, eta, type, image, status } = req.body;
        const gameData = await Game.findOne();
        
        if (!gameData) return res.status(404).json({ message: "Database not seeded yet." });

        gameData.upcomingReleases.push({ id, title, eta, type, image, status });
        await gameData.save();

        res.status(201).json({ message: "Upcoming Release added!", data: gameData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    seedGameData, 
    getGameData, 
    addMarketItem, 
    addLiveEvent, 
    addUpcomingRelease 
};