import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal"
import {Button, Form} from 'react-bootstrap'


const UsersForm = ({show, handleClose, handleUsersSave, setUsersName, setUsersUsername, setUsersType}) => {  


    return (
        <div>
            <Modal show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group >
                    <Form.Label htmlFor="inputCpsClass">Name</Form.Label>
                    <Form.Control onChange={(e)=>{
                        setUsersName(e.target.value);
                    }} />

                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputCpsFaculty">Username</Form.Label>
                    <Form.Control onChange={(e)=>{
                        setUsersUsername(e.target.value);
                    }} />
                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputCpsSubject">Subject</Form.Label>
                    <Form.Select onChange={(e)=>{
                        setUsersType(e.target.value);
                    }}>
                        <option >Please Select Here</option>
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                    </Form.Select>
                  </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={handleUsersSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UsersForm;