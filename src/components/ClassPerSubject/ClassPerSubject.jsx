import React, {useState, useEffect} from 'react'
import {Button, Table} from 'react-bootstrap'
import {IoMdAdd} from "react-icons/io"
import {BiSort} from "react-icons/bi"
import ClassPerSubjectForm from '../ClassPerSubjectForm/ClassPerSubjectForm'
import EditClassPerSubjectForm from '../EditClassPerSubjectForm/EditClassPerSubjectForm'
import axios from 'axios'


const ClassPerSubject = () => {

    const [cpsData, setCpsData] = useState([]);
    const [show, setShow] = useState(false)
    const [editShow, editSetShow] = useState(false);
    const [id, setId] = useState(null);

    const [cpsFaculty, setCpsFaculty] = useState("");
    const [cpsSubject, setCpsSubject] = useState("");
    const [cpsClass, setCpsClass] = useState("");

    const [toggleSort, setToggleSort] = useState(false);

    const [cpsSearch, setCpsSearch] = useState("");

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


    // To get cps Data from api

    useEffect(() => {
        getCpsData();
    }, [])

    const getCpsData = async () => {

        try {
            let res = await fetch(`http://localhost:3030/cps?_page=${page}&_limit=${pagelimit}`);
            let data = await res.json();
            setCpsData(data);
        } catch (err) {
            console.log("cps", err)
        }

    }

    // To add the data

    const handleCpsSave = () => {
        let payload = {
            cpsFaculty: cpsFaculty,
            cpsSubject: cpsSubject,
            cpsClass: cpsClass,
        }

        axios.post(`http://localhost:3030/cps`, payload).then(() => {
            getCpsData();
        }).then(() => {
            setShow(false);
        })
    }

    // to sort the data

    const handleSort = () => {
        setToggleSort(!toggleSort);
        // console.log(toggleSort);

        axios.get(`http://localhost:3030/cps?_sort=cpsClass&_order=${
            toggleSort ? "desc" : "asc"
        }`).then((res) => {
            let data = res.data;
            setCpsData(data);
        })
    }

    // to Edit the data

    const handleEditBtn = (id) => {
        setId(id);
        let data = cpsData.find((ele) => ele.id === id);

        setCpsFaculty(data.cpsFaculty);
        setCpsClass(data.cpsClass);
        setCpsSubject(data.cpsSubject);

        handleEditOpen();

    }

    const handleEditCpsSave = () => {

        let payLoad = {
            cpsFaculty: cpsFaculty,
            cpsSubject: cpsSubject,
            cpsClass: cpsClass,
        }

        axios.put(`http://localhost:3030/cps/${id}`, payLoad).then(() => {
            getCpsData();
        }).then(() => {
            editSetShow(false);
        })

    }


    // to delete the data
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3030/cps/${id}`).then(() => {
            getCpsData();
        });
    }

    // Search Function

    const cpsSearchFun = (text) => {
        setCpsSearch(text);

        if (text.length > 0) {
            axios.get(`http://localhost:3030/cps?q=${cpsSearch}`).then((res) => { // console.log(res.data);
                setCpsData(res.data);
            })
        } else {
            getCpsData();
        }
    }

    // Pagination Function

    const cpsPaginate = (lim) => { // console.log(lim);
        setPageLimit(lim);
        axios.get(`http://localhost:3030/cps?_page=${
            page - 1
        }&_limit=${lim}`).then((res) => {
            setCpsData(res.data)
        })
    }

    const prePage = () => {
        if (page > 1) {
            setPage(page - 1);
            axios.get(`http://localhost:3030/cps?_page=${
                page - 1
            }&_limit=${pagelimit}`).then((res) => {
                setCpsData(res.data)
            })
        }
    }

    const nextPage = () => {
        if (cpsData.length >= 0) {
            setPage(page + 1);
            axios.get(`http://localhost:3030/cps?_page=${
                page + 1
            }&_limit=${pagelimit}`).then((res) => {
                setCpsData(res.data)
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
                    List of Class per Subject
                </div>
                <div>
                    <Button onClick={handleShow}
                        variant='primary'><IoMdAdd fill='#fff'/>New Entry</Button>
                </div>
            </div>

            <div className='d-flex justify-content-between mt-3'>
                <div>
                    <span>Select</span>
                    <select onChange={
                            (e) => { 
                                cpsPaginate(e.target.value);
                            }
                        }
                        className='mx-1'
                        name=""
                        id="cpsSelect">
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
                                cpsSearchFun(e.target.value)
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
                        <th className='col d-flex align-items-center justify-content-between'>
                            Class<BiSort onClick={handleSort}
                                fontSize={"0.8rem"}/></th>
                        <th className='col col-2'>Subject</th>
                        <th className='col col-2'>Faculty</th>
                        <th className='col col-2'>Action</th>
                    </tr>
                </thead>
                <tbody> {
                    cpsData.map((ele, index) => {
                        return (
                            <tr key={
                                ele.id
                            }>
                                <td>{
                                    index + 1
                                }</td>
                                
                                <td>{
                                    ele.cpsClass
                                }</td>
                                
                                <td>{
                                    ele.cpsSubject
                                }</td>
                                <td>{
                                    ele.cpsFaculty
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

        <ClassPerSubjectForm handleEditCpsSave={handleEditCpsSave}
            setCpsClass={setCpsClass}
            setCpsFaculty={setCpsFaculty}
            setCpsSubject={setCpsSubject}
            handleCpsSave={handleCpsSave}
            show={show}
            handleClose={handleClose}/>
        <EditClassPerSubjectForm cpsFaculty={cpsFaculty}
            cpsClass={cpsClass}
            cpsSubject={cpsSubject}
            handleEditCpsSave={handleEditCpsSave}
            setCpsClass={setCpsClass}
            setCpsFaculty={setCpsFaculty}
            setCpsSubject={setCpsSubject}
            handleCpsSave={handleCpsSave}
            editShow={editShow}
            handleClose={handleEditClose}/>
    </div>
    )
}

export default ClassPerSubject