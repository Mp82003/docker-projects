const express = require("express");
const axios = require("axios");

const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
    res.send("API Gateway is Running");
});

app.get("/users", async (req, res) => {
    const response = await axios.get("http://host.docker.internal:3001/users");
    res.json(response.data);
});

app.get("/orders", async (req, res) => {
    const response = await axios.get("http://host.docker.internal:3002/orders");
    res.json(response.data);
});

app.get("/payments", async (req, res) => {
    const response = await axios.get("http://host.docker.internal:3003/payments");
    res.json(response.data);
});

app.get("/notifications", async (req, res) => {
    const response = await axios.get("http://host.docker.internal:3004/notifications");
    res.json(response.data);
});

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
