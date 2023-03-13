import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal"
import {Button, Form} from 'react-bootstrap'


const ClassPerSubjectForm = ({show, handleClose, handleCpsSave, setCpsSubject, setCpsFaculty, setCpsClass}) => {  

  const [cpsClassData, setCpsClassData] = useState([]);
  const [cpsSubjectData, setCpsSubjectData] = useState([]);
  const [cpsFacultyData, setCpsFacultyData] = useState([]);

  useEffect(()=>{
    getCpsClassData();
    getCpsSubjectData();
    getCpsFacultyData();
  },[])

  // to get class Data

  const getCpsClassData = async()=>{
    try{
      let res = await fetch ("http://localhost:3030/classs");
      let data = await res.json();
      setCpsClassData(data);
    }catch(err){
      console.log("CPSEForm:",err);
    }
  }

  // to get subject Data

  const getCpsSubjectData = async()=>{
    try{
      let res = await fetch ("http://localhost:3030/subject");
      let data = await res.json();
      setCpsSubjectData(data);
    }catch(err){
      console.log("CPSEForm:",err);
    }
  }

  // to get Faculty Data

  const getCpsFacultyData = async()=>{
    try{
      let res = await fetch ("http://localhost:3030/faculty");
      let data = await res.json();
      setCpsFacultyData(data);
    }catch(err){
      console.log("CPSEForm:",err);
    }
  }

    return (
        <div>
            <Modal show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group >
                    <Form.Label htmlFor="inputCpsClass">Class</Form.Label>
                    <Form.Select onChange={(e)=>{
                      setCpsClass(e.target.value);
                    }}>
                      <option>Please Select Here</option>
                      {
                        cpsClassData.map((ele)=>{
                          return <option key={ele.id} value={`${ele.classsName} ${ele.classsLevel}-${ele.classsSection}`}>{ele.classsName} {ele.classsLevel}-{ele.classsSection}</option>
                        })
                      }
                    </Form.Select>

                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputCpsFaculty">Faculty</Form.Label>
                    <Form.Select onChange={(e)=>{
                      setCpsFaculty(e.target.value);
                    }}>
                      <option>Please Select Here</option>
                      {
                        cpsFacultyData.map((ele)=>{
                          return <option key={ele.id} value={`${ele.facultyName}`}>{ele.facultyName}</option>
                        })
                      }
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputCpsSubject">Subject</Form.Label>
                    <Form.Select onChange={(e)=>{
                      setCpsSubject(e.target.value);
                    }}>
                      <option>Please Select Here</option>
                      {
                        cpsSubjectData.map((ele)=>{
                          return <option key={ele.id} value={`${ele.subjectName}`}>{ele.subjectName}</option>
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
                        onClick={handleCpsSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ClassPerSubjectForm;
