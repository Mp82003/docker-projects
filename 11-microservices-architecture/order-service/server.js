const express = require("express");

const app = express();

const PORT = 3002;

app.get("/", (req, res) => {
    res.send("Order Service is Running");
});

app.get("/orders", (req, res) => {
    res.json({
        service: "Order Service",
        orders: [
            {
                id: 101,
                product: "Laptop",
                quantity: 1
            },
            {
                id: 102,
                product: "Mouse",
                quantity: 2
            }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});
