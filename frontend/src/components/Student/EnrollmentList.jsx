import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnrollmentsList = () => {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/enrollments');
        setEnrollments(response.data);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div>
      <h2>Enrollments List</h2>
      <ul>
        {enrollments?.map((enrollment) => (
          <li key={enrollment?._id}>
            <p>Student: {enrollment?.studentName}</p>
            <p>Enrollment Date: {enrollment?.enrollmentDate ? new Date(enrollment?.enrollmentDate).toLocaleDateString() : 'N/A'}</p>

            {/* Fetch and display course details */}
            {enrollment?.courseId && (
              <div>
                <p>Course Name: {enrollment?.courseId.courseName}</p>
                <p>Duration: {enrollment?.courseId.courseDuration}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrollmentsList;
