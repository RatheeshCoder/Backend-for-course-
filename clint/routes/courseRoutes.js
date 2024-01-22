const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Enrollment = require('../models/enrollmentDetails');

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:id/enroll', async (req, res) => {
    const courseId = req.params.id;
    const { studentName } = req.body;

    try {
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Create a new enrollment
        const enrollment = new Enrollment({
            courseId: course._id,
            studentName,
        });
        await enrollment.save();

        res.status(201).json(enrollment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
