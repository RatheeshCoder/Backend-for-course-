import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Header/Navbar';
import img from '../../assets/couse-img.jpg'

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
    <>
    <Navbar/>
    <ul class="grid grid-cols-1 xl:grid-cols-3 gap-y-10 gap-x-6 items-start p-8">
  {enrollments?.map((enrollment) => (
    <li key={enrollment?._id} class="relative flex flex-col sm:flex-row xl:flex-col items-start">
      <div class="order-1 sm:ml-6 xl:ml-0">
        <h3 class="mb-1 text-slate-900 font-semibold dark:text-slate-200">
          {enrollment?.enrollmentDate ? new Date(enrollment?.enrollmentDate).toLocaleDateString() : 'N/A'}
        </h3>
        {enrollment?.courseId && (
          <div class="prose prose-slate prose-sm text-slate-600 dark:prose-dark">
            <p className='text-xl  text-white-900 mt-4'> {enrollment?.courseId.courseName}</p>
            <div class="flex my-3">
              <p class="mr-4 bg-gray-100 px-2 py-1 rounded-full"> {enrollment?.courseId.courseDuration}</p>
              <p className='bg-gray-100 px-2 py-1 rounded-full'> {enrollment?.courseId.enrollmentStatus}</p>
            </div>
            <p className='text-xl  text-white-900 mt-4'> {enrollment?.courseId.description}</p>
          </div>
        )}
       
      </div>
      <img
        src={img}
        alt=""
        class="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full"
        width="1216"
        height="640"
      />
    </li>
  ))}
</ul>
</>

  );
};

export default EnrollmentsList;
