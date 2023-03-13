import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const ClasssForm = ({
    handleClasssSubmit,
    setClasss,
    classs,
    handleCancel,
    classsLevel,
    classsSection,
    setClasssLevel,
    setClasssSection
}) => {
    return (
        <div className=' mt-5 ms-5 p-3 bg-light'
            style={
                {
                    width: "400px",
                    height: "350px"
                }
        }>
            <div>
                <h6>Class Form</h6>
            </div>
            <hr/>
            <div>
                <Form onSubmit={handleClasssSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <select onChange={(e)=>{
                            setClasss(e.target.value)
                        }} class="form-select" aria-label="Default select example">
                            <option selected>Please select here</option>
                            <option value="Course 1">Course 1</option>
                            <option value="Course 2">Course 2</option>
                            <option value="Course 3">Course 3</option>
                            <option value="Course 4">Course 4</option>
                        </select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Level</Form.Label>
                        <Form.Control onChange={
                                (e) => {
                                    setClasssLevel(e.target.value)
                                }
                            }
                            type="text"
                            value={classsLevel}/>
                    </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Section</Form.Label>
                    <Form.Control onChange={
                            (e) => {
                                setClasssSection(e.target.value)
                            }
                        }
                        type="text"
                        value={classsSection}/>
                </Form.Group>
            <div className='text-center'>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button onClick={handleCancel}
                    variant="light"
                    className='ms-2'>
                    Cancel
                </Button>
            </div>
        </Form>
    </div>
</div>
    )
}

export default ClasssForm
