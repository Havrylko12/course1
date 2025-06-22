const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
    res.send("Welcome to the Online Library API. Use /news to get news.");
});

app.get("/news", (req, res) => {
    const newsPath = path.join(__dirname, "data", "news.json");

    fs.readFile(newsPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to load news." });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
