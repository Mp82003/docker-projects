const express = require("express");

const app = express();

const PORT = 3001;

app.get("/", (req, res) => {
    res.send("User Service is Running");
});

app.get("/users", (req, res) => {
    res.json({
        service: "User Service",
        users: [
            { id: 1, name: "Muskan" },
            { id: 2, name: "Rahul" }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});
