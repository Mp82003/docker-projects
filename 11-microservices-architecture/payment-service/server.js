const express = require("express");

const app = express();

const PORT = 3003;

app.get("/", (req, res) => {
    res.send("Payment Service is Running");
});

app.get("/payments", (req, res) => {
    res.json({
        service: "Payment Service",
        payments: [
            {
                id: 201,
                amount: 5000,
                status: "Success"
            },
            {
                id: 202,
                amount: 2500,
                status: "Pending"
            }
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Payment Service running on port ${PORT}`);
});
