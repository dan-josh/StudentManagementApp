import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const CourseForm = ({handleCourseSubmit, setCourse, course, setCourseDesc, courseDesc, handleCancel }) => {
  return (
    <div className=' mt-5 ms-5 p-3 bg-light' style={{width:"400px", height:"350px"}}>
                <div >
                    <h6>Course Form</h6>
                </div>
                <hr />
                <div>
                    <Form onSubmit={handleCourseSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Course</Form.Label>
                            <Form.Control onChange={(e)=>{
                              setCourse(e.target.value)
                            }} type="text" value={course} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={(e)=>{
                              setCourseDesc(e.target.value)
                            }} as="textarea"
                                rows={3} value={courseDesc} />
                        </Form.Group>
                        <div className='text-center'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button onClick={handleCancel} variant="light" className='ms-2'>
                            Cancel
                        </Button>
                        </div>
                    </Form>
                </div>
            </div>
  )
}

export default CourseForm