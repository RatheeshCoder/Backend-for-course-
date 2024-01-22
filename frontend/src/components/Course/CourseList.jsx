import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';

// Assume you have a CourseDetailsModal component
const CourseDetailsModal = ({ course, onClose }) => {
  return (
    <div>
      <h2>{course.courseName}</h2>
      <p>Instructor: {course.instructorName}</p>
      <p>Description: {course.description}</p>
      <p>Duration: {course.courseDuration}</p>
      <p>Enrollment Status: {course.enrollmentStatus}</p>
      {/* Add more details as needed */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const fuse = new Fuse(courses, {
    keys: ['courseName', 'instructorName'],
  });

  const filteredCourses = searchTerm ? fuse.search(searchTerm).map((result) => result.item) : courses;

  const enrollInCourse = async (courseId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/courses/${courseId}/enroll`);
      console.log(response.data);

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === courseId ? { ...course, enrollmentStatus: 'Enrolled' } : course
        )
      );
    } catch (error) {
      console.error('Error enrolling in the course:', error);
    }
  };

  const viewCourse = (course) => {
    setSelectedCourse(course);
  };

  const closeDetailsModal = () => {
    setSelectedCourse(null);
  };

  return (
    <div>
      <h2>Course List</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by course or instructor name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredCourses.map((course) => (
          <li key={course._id}>
            <h3>{course.courseName}</h3>
            <p>Instructor: {course.instructorName}</p>
            <p>Duration: {course.courseDuration}</p>
            <p>Enrollment Status: {course.enrollmentStatus}</p>

            {/* Enroll and View buttons */}
            <button onClick={() => enrollInCourse(course._id)}>Enroll</button>
            <button onClick={() => viewCourse(course)}>View Course</button>
          </li>
        ))}
      </ul>

      {/* Modal for course details */}
      {selectedCourse && (
        <CourseDetailsModal course={selectedCourse} onClose={closeDetailsModal} />
      )}
    </div>
  );
};

export default CourseList;
