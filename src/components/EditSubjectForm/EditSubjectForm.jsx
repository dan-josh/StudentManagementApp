import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const EditSubjectForm = ({setToggle, editSubject, setEditSubject, editSubjectDesc, setEditSubjectDesc, handleSubjectEditSubmit }) => {

    
  return (
    <div className=' mt-5 ms-5 p-3 bg-light' style={{width:"400px", height:"350px"}}>
                <div >
                    <h6>Edit Subject Form</h6>
                </div>
                <hr />
                <div>
                    <Form onSubmit={handleSubjectEditSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Edit Subject</Form.Label>
                            <Form.Control onChange={(e)=>{
                              setEditSubject(e.target.value)
                            }} type="text" value={editSubject} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Edit Description</Form.Label>
                            <Form.Control onChange={(e)=>{
                              setEditSubjectDesc(e.target.value)
                            }} as="textarea"
                                rows={3} value={editSubjectDesc} />
                        </Form.Group>
                        <div className='text-center'>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                        <Button onClick={()=>{
                            setToggle(false)
                        }} variant="light" className='ms-2'>
                            Cancel
                        </Button>
                        </div>
                    </Form>
                </div>
            </div>
  )
}

export default EditSubjectForm