const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

// In-memory database
let users = [
    { id: 1, name: "Muskan" },
    { id: 2, name: "Rahul" }
];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to My REST API");
});

// Get all users
app.get("/users", (req, res) => {
    res.json(users);
});

// Get one user
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

// Create user
app.post("/users", (req, res) => {
    users.push(req.body);

    res.status(201).json({
        message: "User added",
        user: req.body
    });
});

// Update user
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name;

    res.json({
        message: "User updated",
        user
    });
});

// Delete user
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    users = users.filter(u => u.id !== id);

    res.json({
        message: "User deleted"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
