const express = require('express');
const bodyParser = require('body-parser');
const RateLimit = require('express-rate-limit');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const mongoose = require('mongoose');



const app = express();
app.use(bodyParser.json());

// Setup rate limiter: amount of requests per minute
const limiter = RateLimit({
    windowMS: 15 * 60 * 1000, // 15 minutes
    max: 60, // max 60 requests per WindowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.get('/:path', function(req, res) {
    let path = req.params.path;
    if (isValidPath(path))
        res.sendFile(path);
});



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
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transactions', transactionRoutes);

// MongoDB connection

mongoose.connect('mongodb:https://github.com/k-transfer/Skrilla-app.git', {
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