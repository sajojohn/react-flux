import React from "react";
import TextInput from "./common/TextInput";
import PropType from "prop-types";
function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput id='title' label='Title' error={props.errors.title} name='title' onChange={props.onChange} value={props.course.title} />
      <div className='form-group'>
        <label htmlFor='author'>Author</label>
        <div className='field'>
          <select id='author' type='text' name='authorId' onChange={props.onChange} className='form-control' value={props.course.authorId || ""}>
            <option value='' />
            <option value='1'>Cory House</option>
            <option value='2'>Scott Allen</option>
          </select>
        </div>
        {props.errors.authorId && <div className='alert alert-danger'>{props.errors.authorId} </div>}
      </div>
      <TextInput id='category' label='Category' error={props.errors.category} name='category' onChange={props.onChange} value={props.course.category} />

      <input type='submit' value='Save' className='btn btn-primary' />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropType.object.isRequired,
  onSubmit: PropType.func.isRequired,
  onChange: PropType.func.isRequired,
  errors: PropType.object.isRequired,
};

export default CourseForm;
