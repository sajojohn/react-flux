import React, { useState, useEffect } from "react";
import courseStore from "../stores/CourseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";
import { toast } from "react-toastify";
function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) loadCourses();
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function onDeleteCourse(courseId) {
    return deleteCourse(courseId).then(() => toast.success("Course Deleted."));
  }
  return (
    <>
      <h2>Courses</h2>
      <Link to='/course' className='btn btn-primary'>
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={onDeleteCourse} />
    </>
  );
}

export default CoursesPage;
