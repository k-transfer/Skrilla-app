const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();

const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// MongoDB connection

mongoose.connect('mongodb://localhost:3000/Skrilla-app', {
    userNewUrlParser: true,
    useUnifiedTopology: true,
})
then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});