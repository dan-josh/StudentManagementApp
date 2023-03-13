import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const SubjectForm = ({handleSubjectSubmit, setSubject, subject, setSubjectDesc, subjectDesc, handleCancel }) => {
  return (
    <div className=' mt-5 ms-5 p-3 bg-light' style={{width:"400px", height:"350px"}}>
                <div >
                    <h6>Subject Form</h6>
                </div>
                <hr />
                <div>
                    <Form onSubmit={handleSubjectSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Subject</Form.Label>
                            <Form.Control onChange={(e)=>{
                              setSubject(e.target.value)
                            }} type="text" value={subject} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control onChange={(e)=>{
                              setSubjectDesc(e.target.value)
                            }} as="textarea"
                                rows={3} value={subjectDesc} />
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

export default SubjectForm