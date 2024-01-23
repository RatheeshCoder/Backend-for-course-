import CourseDetails from "./components/Course/CourseDetails"
import CourseList from "./components/Course/CourseList"
import EnrollmentsList from "./components/Student/EnrollmentList"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
   
    <BrowserRouter>
    
    <Routes>
     
        <Route index element={<CourseList />} />
        <Route path="dashboard" element={<EnrollmentsList />} />
       
      
    </Routes>
  </BrowserRouter>
  )
}

export default App
