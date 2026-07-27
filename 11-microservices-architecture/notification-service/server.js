const express = require("express");

const app = express();

const PORT = 3004;

app.get("/", (req, res) => {
    res.send("Notification Service is Running");
});

app.get("/notifications", (req, res) => {
    res.json({
        service: "Notification Service",
        notifications: [
            {
                id: 301,
                type: "Email",
                message: "Order Confirmed"
            },
            {
                id: 302,
                type: "SMS",
                message: "Payment Successful"
            }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
