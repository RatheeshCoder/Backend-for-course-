const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add CORS middleware
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://ratheesh:ratheesh@cluster0.fjqeoph.mongodb.net/student-course-app?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Import routes
const courseRoutes = require('./routes/courseRoutes');
app.use('/api/courses', courseRoutes);

const enrollmentRoutes = require('./routes/enrollmentRoutes');
app.use('/api/enrollments', enrollmentRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
