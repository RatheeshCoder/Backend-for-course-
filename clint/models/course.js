const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: String,
    instructorName: String,
    description: String,
    enrollmentStatus: String,
    courseDuration: String,
    schedule: String,
    location: String,
    prerequisites: String,
    syllabus: String,
});

module.exports = mongoose.model('Course', courseSchema);
