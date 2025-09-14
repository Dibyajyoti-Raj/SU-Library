// db.js or app.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dibyajyotiraj08:j7V1CALtVUP8XB3r@cluster0.zoxjb.mongodb.net/librarySU', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB: library"))
.catch((err) => console.error("MongoDB connection error:", err));
