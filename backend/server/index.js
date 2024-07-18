const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 4040;

// Define the schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: Number
}, {
    timestamps: true
});

// Create a model
const userModel = mongoose.model('user', schemaData);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/backend")
    .then(() => console.log("Connected to DB"))
    .catch(err => console.error("Error connecting to DB:", err));

// Route to insert a single document
app.post('/users', async (req, res) => {
    try {
        const { name, email, mobile } = req.body;
        const newUser = new userModel({ name, email, mobile });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to insert multiple documents
app.post('/users/bulk', async (req, res) => {
    try {
        const users = req.body; // Assuming req.body is an array of users
        const result = await userModel.insertMany(users);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to fetch a single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update a single user by ID
app.patch('/users/:id', async (req, res) => {
    try {
        const user = await userModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update multiple users
app.patch('/users', async (req, res) => {
    try {
        const { filter, update } = req.body;
        const result = await userModel.updateMany(filter, { $set: update });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
