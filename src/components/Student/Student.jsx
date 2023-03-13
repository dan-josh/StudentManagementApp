import React, {useState, useEffect} from 'react'
import {Button, Table} from 'react-bootstrap'
import {IoMdAdd} from "react-icons/io"
import {BiSort} from "react-icons/bi"
import StudentForm from '../StudentForm/StudentForm'
import EditStudentForm from '../EditStudentForm/EditStudentForm'
import axios from 'axios'


const Student = () => {

    const [studentData, setStudentData] = useState([]);
    const [show, setShow] = useState(false)
    const [editShow, editSetShow] = useState(false);
    const [id, setId] = useState(null);

    const [studentId, setStudentId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [studentClass, setStudentClass] = useState("");

    const [toggleSort, setToggleSort] = useState(false);

    const [studentSearch, setStudentSearch] = useState("");

    const [pagelimit, setPageLimit] = useState(5);
    const [page, setPage] = useState(1);


    // close the form
    const handleClose = () => {
        setShow(false);
    }
    // To open the form
    const handleShow = () => {
        setShow(true);
    }

    // close Edit Form
    const handleEditClose = () => {
        editSetShow(false);
    }

    // open edit form
    const handleEditOpen = () => {
        editSetShow(true);
    }


    // To get student Data from api

    useEffect(() => {
        getStudentData();
    }, [])

    const getStudentData = async () => {

        try {
            let res = await fetch(`http://localhost:3030/student?_page=${page}&_limit=${pagelimit}`);
            let data = await res.json();
            setStudentData(data);
        } catch (err) {
            console.log("student", err)
        }

    }

    // To add the data

    const handleStudentSave = () => {
        let payload = {
            studentId: studentId,
            studentName: studentName,
            studentClass: studentClass,
        }

        axios.post(`http://localhost:3030/student`, payload).then(() => {
            getStudentData();
        }).then(() => {
            setShow(false);
        })
    }

    // to sort the data

    const handleSort = () => {
        setToggleSort(!toggleSort);
        // console.log(toggleSort);

        axios.get(`http://localhost:3030/student?_sort=studentName&_order=${
            toggleSort ? "desc" : "asc"
        }`).then((res) => {
            let data = res.data;
            setStudentData(data);
        })
    }

    // to Edit the data

    const handleEditBtn = (id) => {
        setId(id);
        let data = studentData.find((ele) => ele.id === id);

        setStudentId(data.studentId);
        setStudentClass(data.studentClass);
        setStudentName(data.studentName);

        handleEditOpen();

    }

    const handleEditStudentSave = () => {

        let payLoad = {
            studentId: studentId,
            studentName: studentName,
            studentClass: studentClass,
        }

        axios.put(`http://localhost:3030/student/${id}`, payLoad).then(() => {
            getStudentData();
        }).then(() => {
            editSetShow(false);
        })

    }


    // to delete the data
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3030/student/${id}`).then(() => {
            getStudentData();
        });
    }

    // Search Function

    const studentSearchFun = (text) => {
        setStudentSearch(text);

        if (text.length > 0) {
            axios.get(`http://localhost:3030/student?q=${studentSearch}`).then((res) => { // console.log(res.data);
                setStudentData(res.data);
            })
        } else {
            getStudentData();
        }
    }

    // Pagination Function

    const studentPaginate = (lim) => { // console.log(lim);
        setPageLimit(lim);
        axios.get(`http://localhost:3030/student?_page=${
            page - 1
        }&_limit=${lim}`).then((res) => {
            setStudentData(res.data)
        })
    }

    const prePage = () => {
        if (page > 1) {
            setPage(page - 1);
            axios.get(`http://localhost:3030/student?_page=${
                page - 1
            }&_limit=${pagelimit}`).then((res) => {
                setStudentData(res.data)
            })
        }
    }

    const nextPage = () => {
        if (studentData.length >= 0) {
            setPage(page + 1);
            axios.get(`http://localhost:3030/student?_page=${
                page + 1
            }&_limit=${pagelimit}`).then((res) => {
                setStudentData(res.data)
            })
        }
    }

    return (
        <div className='ms-5 mt-5'
            style={
                {width: "1200px"}
        }>
            <div className='d-flex justify-content-between bg-light p-2 align-items-center'>
                <div className='h6'>
                    List of Student
                </div>
                <div>
                    <Button onClick={handleShow}
                        variant='primary'><IoMdAdd fill='#fff'/>New Student</Button>
                </div>
            </div>

            <div className='d-flex justify-content-between mt-3'>
                <div>
                    <span>Select</span>
                    <select onChange={
                            (e) => { 
                                studentPaginate(e.target.value);
                            }
                        }
                        className='mx-1'
                        name=""
                        id="studentSelect">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                    <span>entries</span>
                </div>
                <div>
                    <span className='me-2'>Search:</span>
                    <input onChange={
                            (e) => {
                                studentSearchFun(e.target.value)
                            }
                        }
                        type="text"/>
                </div>
        </div>

        {/* Table Starts Here */}

        <div className='mt-4'>
            <Table size='sm' striped bordered hover>
                <thead>
                    <tr>
                        <th className='col col-1'>#</th>
                        <th className='col col-1'>ID</th>
                        <th className='col d-flex align-items-center justify-content-between'>
                            Student Name<BiSort onClick={handleSort}
                                fontSize={"0.8rem"}/></th>
                        <th className='col col-2'>Class</th>
                        <th className='col col-2'>Action</th>
                    </tr>
                </thead>
                <tbody> {
                    studentData.map((ele, index) => {
                        return (
                            <tr key={
                                ele.id
                            }>
                                <td>{
                                    index + 1
                                }</td>
                                <td>{
                                    ele.studentId
                                }</td>
                                <td>{
                                    ele.studentName
                                }</td>
                                
                                <td>{
                                    ele.studentClass
                                }</td>
                                
                                <td className='pt-3'>
                                    <Button className='mx-2'
                                        onClick={
                                            () => {
                                                handleEditBtn(ele.id);
                                            }
                                    }>Edit</Button>
                                    <Button variant='danger'
                                        onClick={
                                            () => {
                                                handleDelete(ele.id)
                                            }
                                    }>Delete</Button>
                                </td>
                            </tr>
                        )
                    })
                } </tbody>
            </Table>
        </div>

        <div className="row mt-2 mb-4">
            <div className="d-flex justify-content-between">
                <p>Showing 1 to 2 of {pagelimit}
                    entries</p>
                <div className="d-flex justify-content-space-between">

                    <button onClick={prePage}
                        id="back"
                        className="me-1 btn btn-sm btn-primary px-3">Back</button>
                    <button id="pagenumber" className="fw-bold px-2 bg-light border border-1">
                        {page}</button>
                    <button onClick={nextPage}
                        id="next"
                        className="ms-1 btn btn-sm btn-primary px-3">Next</button>
                </div>

            </div>

        </div>

        <StudentForm handleEditStudentSave={handleEditStudentSave}
            setStudentClass={setStudentClass}
            setStudentName={setStudentName}
            setStudentId={setStudentId}
            handleStudentSave={handleStudentSave}
            show={show}
            handleClose={handleClose}/>
        <EditStudentForm studentName={studentName}
            studentClass={studentClass}
            studentId={studentId}
            handleEditStudentSave={handleEditStudentSave}
            setStudentClass={setStudentClass}
            setStudentName={setStudentName}
            setStudentId={setStudentId}
            handleStdentSave={handleStudentSave}
            editShow={editShow}
            handleClose={handleEditClose}/>
    </div>
    )
}

export default Student