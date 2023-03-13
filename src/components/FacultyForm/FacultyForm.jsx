import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal"
import {Button, Form} from 'react-bootstrap'


const FacultyForm = ({show, handleClose, handleFacultySave, setFacultyId, setFacultyName, setFacultyEmail, setFacultyContact, setFacultyAddress}) => {

  

    return (
        <div>
            <Modal show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Faculty</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group >
                    <Form.Label htmlFor="inputFacultyId">ID #</Form.Label>
                    <Form.Control onChange={(e)=>{
                      setFacultyId(e.target.value)
                    }} type="text" id="inputFacultyId"/>
                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputFacultyName">Name</Form.Label>
                    <Form.Control onChange={(e)=>{
                      setFacultyName(e.target.value);
                    }} type="text" id="inputFacultyName"/>
                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputFacultyEmail">Email</Form.Label>
                    <Form.Control onChange={(e)=>{
                      setFacultyEmail(e.target.value);
                    }} type="email" id="inputFacultyEmail"/>
                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputFacultyContact">Contact</Form.Label>
                    <Form.Control onChange={(e)=>{
                      setFacultyContact(e.target.value);
                    }} type="number" id="inputFacultyContact"/>
                  </Form.Group>

                    <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control onChange={(e)=>{
                          setFacultyAddress(e.target.value);
                        }}  as="textarea"
                            rows={3}/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={handleFacultySave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default FacultyForm
