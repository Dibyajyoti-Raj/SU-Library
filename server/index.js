const express = require('express');
const app = express();
const cors = require('cors');
require('./connection/DB'); // connects to MongoDB
const bookRoutes = require('./routes/bookRoutes');

//CROSS_PLATFORM CONNECTION
app.use(cors({
  origin: 'http://localhost:5173', // allow only your frontend
  credentials: true // if using cookies/auth, optional otherwise
}));


// Middleware
app.use(express.json());

// Routes
app.use('/api', bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Something went wrong',
    });
});

// START SERVER HERE
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
