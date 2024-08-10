const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port ${PORT}');
    });
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// MongoDB connection

mongoose.connect('mongodb://localhost:3000/Skrilla-app', {
    userNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("Welcome! Thank you for Choosing Skrilla Transfer!");
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});