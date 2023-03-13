import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal"
import {Button, Form} from 'react-bootstrap'


const StudentForm = ({show, handleClose, handleStudentSave, setStudentId, setStudentName, setStudentClass}) => {  

  const [classData, setClassData] = useState([]);

  useEffect(()=>{
    getClassData();
  },[])

  const getClassData = async()=>{
    try{
      let res = await fetch ("http://localhost:3030/classs");
      let data = await res.json();
      console.log(data);
      setClassData(data);
    }catch(err){
      console.log("StudentForm:",err);
    }
  }

    return (
        <div>
            <Modal show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group >
                    <Form.Label htmlFor="inputStudentId">ID #</Form.Label>
                    <Form.Control onChange={(e)=>{
                      setStudentId(e.target.value)
                    }} type="text" id="inputStudentId"/>
                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputStudentName">Name</Form.Label>
                    <Form.Control onChange={(e)=>{
                      setStudentName(e.target.value);
                    }} type="text" id="inputStudentName"/>
                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputStudentContact">Class</Form.Label>
                    <Form.Select onChange={(e)=>{
                      setStudentClass(e.target.value);
                    }}>
                      <option>Please Select Here</option>
                      {
                        classData.map((ele)=>{
                         return <option key={ele.id} value={`${ele.classsName} ${ele.classsLevel}-${ele.classsSection}`}>{ele.classsName} {ele.classsLevel}-{ele.classsSection}</option>
                        })
                      }
                    </Form.Select>
                  </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={handleStudentSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default StudentForm;
