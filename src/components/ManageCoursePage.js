import React, { useState, useEffect } from "react";
import courseStore from "../stores/CourseStore";
import * as courseAction from "../actions/courseActions";
import CourseForm from "./CourseForm";

import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug;
    console.log("slug is ", slug);
    if (courses.length === 0) {
      courseAction.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [props.match.params.slug, courses.length]); // the order of dependency array is impotant

  function onChange() {
    setCourses(courseStore.getCourses());
  }
  function handleChange({ target }) {
    // destructuring the event get event.target object
    const updatedCourse = { ...course, [target.name]: target.value }; // target object contain name and value properties.
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is requied";
    if (!course.authorId) _errors.authorId = "Author is requied";
    if (!course.category) _errors.category = "Category is requied";
    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    courseAction.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course Saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm course={course} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
    </>
  );
};

export default ManageCoursePage;
