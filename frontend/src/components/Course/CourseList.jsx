// CourseList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import Navbar from "../Header/Navbar";
import img from '../../assets/couse-img.jpg'

// Assume you have a CourseDetailsModal component
const CourseDetailsModal = ({ course, onClose, onConfirm }) => {
  const handleConfirm = () => {
    // Add logic to enroll the user in the course
    // For now, let's just call the onConfirm prop
    onConfirm();
    onClose(); // Close the modal
  };

  const handleCancel = () => {
    onClose(); // Close the modal
  };
  return (
    <div
      class="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center"
      onClick={handleCancel}
    >
      {/* Overlay */}
      <div
        aria-hidden="true"
        class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
      ></div>

      {/* Modal */}
      <div class="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
        <div class="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
          <button
            tabindex="-1"
            type="button"
            class="absolute top-2 right-2 rtl:right-auto rtl:left-2"
            onClick={handleCancel}
          >
            <svg
              title="Close"
              tabindex="-1"
              class="h-4 w-4 cursor-pointer text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close</span>
          </button>

          <div class="space-y-2 p-2">
            <div class="p-4 space-y-2 text-center dark:text-white">
              <h2
                class="text-xl font-bold tracking-tight"
                id="page-action.heading"
              >
                {course.courseName}
              </h2>

              <p class="text-gray-500 font-bold tracking-tight">
                Instructor: {course.instructorName}
              </p>
              <p class="text-gray-500 font-bold tracking-tight">
                Duration: {course.courseDuration}
              </p>
              <p class="text-gray-500 font-bold tracking-tight">
                Enrollment Status: {course.enrollmentStatus}
              </p>
              <p class="text-gray-500 font-bold tracking-tight">
                Schedule: {course.schedule}
              </p>
              <p class="text-gray-500 font-bold tracking-tight">
                Location: {course.location}
              </p>
              <p class="text-gray-500 font-bold tracking-tight">
                Prerequisites: {course.prerequisites}
              </p>
              <p class="text-gray-500 font-bold tracking-tight">
                Description: {course.description}
              </p>
              <p class="text-gray-500 font-bold tracking-tight">
                Syllabus: {course.syllabus}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div
              aria-hidden="true"
              className="border-t dark:border-gray-700 px-2"
            ></div>

            <div className="px-6 py-2">
              <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                <button
                  type="button"
                  className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700"
                  onClick={handleCancel}
                >
                  <span className="flex items-center gap-1">
                    <span className="">Cancel</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = useState({});
  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const fuse = new Fuse(courses, {
    keys: ["courseName", "instructorName"],
  });

  const filteredCourses = searchTerm
    ? fuse.search(searchTerm).map((result) => result.item)
    : courses;

    const enrollInCourse = async (courseId) => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/courses/${courseId}/enroll`
        );
  
        setEnrollmentStatus((prevStatus) => ({
          ...prevStatus,
          [courseId]: "Enrolled",
        }));
      } catch (error) {
        console.error("Error enrolling in the course:", error);
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
      {/* Navbar component */}
      <Navbar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />

      <div class="bg-gray-900 py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-white mb-8 text-center">All Course </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course._id} class="bg-white rounded-lg shadow-lg p-8">
                <div class="relative overflow-hidden">
                  <img
                    class="object-cover w-full h-full"
                    src={img}
                    alt="Course"
                  />
                  <div class="absolute inset-0 bg-black opacity-40"></div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <button
                      class="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300"
                      onClick={() => viewCourse(course)}
                    >
                      View Course
                    </button>
                  </div>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mt-4">
                  {course.courseName}
                </h3>
                <p class="text-gray-500 text-xl  mt-2">
                  Instructor: {course.instructorName}
                </p>
                <p class="text-gray-500 text-xl mt-2">
                  Duration: {course.courseDuration}
                </p>
                <p class="text-gray-500 text-xl mt-2">
                  Enrollment Status: {course.enrollmentStatus}
                </p>
                <div class="flex items-center justify-between mt-4">
                  <span class="text-gray-900 font-bold text-lg">$29.99</span>
                  <button
          type="button"
          className={`inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm ${
            enrollmentStatus[course._id] === "Enrolled"
              ? "bg-green-600 hover:bg-green-500 focus:bg-green-700"
              : "bg-gray-900 hover:bg-gray-800 focus:bg-gray-700"
          }`}
          onClick={() => enrollInCourse(course._id)}
        >
          <span className="flex items-center gap-1">
            <span className="">
              {enrollmentStatus[course._id] === "Enrolled"
                ? "Enrolled"
                : "Enroll"}
            </span>
          </span>
        </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for course details */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          onClose={closeDetailsModal}
        />
      )}
    </div>
  );
};

export default CourseList;
