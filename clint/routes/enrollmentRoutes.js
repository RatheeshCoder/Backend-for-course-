const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollmentDetails');
const Course = require('../models/course');

router.get('/', async (req, res) => {
    try {
      const enrollments = await Enrollment.find().populate({
        path: 'courseId',
        model: Course,
      });
  
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
