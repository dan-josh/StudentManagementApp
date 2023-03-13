import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const EditClasssForm = ({setToggle, editClasss, setEditClasss, editClasssLevel, setEditClasssLevel, editClasssSection, setEditClasssSection,handleClasssEditSubmit }) => {

    
  return (
    <div className=' mt-5 ms-5 p-3 bg-light' style={{width:"400px", height:"350px"}}>
                <div >
                    <h6>Edit Class Form</h6>
                </div>
                <hr />
                <div>
                    <Form onSubmit={handleClasssEditSubmit} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <select onChange={(e)=>{
                            setEditClasss(e.target.value)
                        }} class="form-select" aria-label="Default select example">
                            <option selected>Please select here</option>
                            <option value="Course 1">Course 1</option>
                            <option value="Course 2">Course 2</option>
                            <option value="Course 3">Course 3</option>
                            <option value="Course 4">Course 4</option>
                        </select>
                    </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Form.Label>Edit Class</Form.Label>
                            <Form.Control onChange={(e)=>{
                              setEditClasssLevel(e.target.value)
                            }} type="text" value={editClasssLevel} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Edit Description</Form.Label>
                            <Form.Control onChange={(e)=>{
                              setEditClasssSection(e.target.value)
                            }} as="textarea"
                                rows={3} value={editClasssSection} />
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

export default EditClasssForm