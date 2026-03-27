require("dotenv").config(); // 🛠️ LOAD .ENV FIRST
const express = require("express");
const app = express();
const db = require("./config/db.js");
const U_route = require("./routes/User_route.js");
const gameRoute = require("./routes/Game_route.js");
const cors = require("cors");
const passport = require("passport");
const Community_router = require("./routes/Post_route.js");
require("./config/passport.js");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/uploads', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/community', Community_router);
app.use('/api/games', gameRoute);
app.use("/user", U_route);

app.get("/backend", (req, res) => res.send("Terminal_Online"));

// 🛠️ USE PORT FROM .ENV
const PORT = process.env.PORT || 8050;
app.listen(PORT, () => console.log(`>>> [System]: Server Online on Port ${PORT}`));