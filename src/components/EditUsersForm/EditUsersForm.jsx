import React, { useState, useEffect } from 'react'
import Modal from "react-bootstrap/Modal"
import {Button, Form} from 'react-bootstrap'


const EditUsersForm = ({usersName, usersUsername, usersType, editShow, handleClose, handleEditUsersSave, setUsersName, setUsersUsername,  setUsersType}) => {

    return (
        <div>
            <Modal show={editShow}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group >
                    <Form.Label htmlFor="inputCpsClass">Name</Form.Label>
                    <Form.Control value={usersName} onChange={(e)=>{
                        setUsersName(e.target.value);
                    }} />
                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputCpsFaculty">Username</Form.Label>
                    <Form.Control value={usersUsername} onChange={(e)=>{
                        setUsersUsername(e.target.value);
                    }} />
                  </Form.Group>

                  <Form.Group className='mt-3'>
                    <Form.Label htmlFor="inputCpsSubject">Type</Form.Label>
                    <Form.Select value={usersType} onChange={(e)=>{
                        setUsersType(e.target.value);
                    }}>
                        <option>Please select Here</option>
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
                        onClick={handleEditUsersSave}>
                        Update Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditUsersForm;