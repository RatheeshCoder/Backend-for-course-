// CourseDetails.js

import React from 'react';

const CourseDetails = ({ course }) => {
  return (
    <div>
      <h2>Course Details</h2>
      <h3>{course.courseName}</h3>
      <p>Instructor: {course.instructorName}</p>
      <p>Duration: {course.courseDuration}</p>
      <p>Enrollment Status: {course.enrollmentStatus}</p>
      <p>Schedule: {course.schedule}</p>
      <p>Location: {course.location}</p>
      <p>Prerequisites: {course.prerequisites}</p>
      <p>Description: {course.description}</p>
      <p>Syllabus: {course.syllabus}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default CourseDetails;
