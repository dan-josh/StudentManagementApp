import React, {useState, useEffect} from 'react'
import {Button, Table} from 'react-bootstrap'
import {IoMdAdd} from "react-icons/io"
import {BiSort} from "react-icons/bi"
import FacultyForm from '../FacultyForm/FacultyForm'
import EditFacultyForm from '../EditFacultyForm/EditFacultyForm'
import axios from 'axios'


const Faculty = () => {

    const [facultyData, setFacultyData] = useState([]);
    const [show, setShow] = useState(false)
    const [editShow, editSetShow] = useState(false);
    const [id, setId] = useState(null);

    const [facultyId, setFacultyId] = useState("");
    const [facultyName, setFacultyName] = useState("");
    const [facultyEmail, setFacultyEmail] = useState("");
    const [facultyContact, setFacultyContact] = useState("");
    const [facultyAddress, setFacultyAddress] = useState("");

    const [toggleSort, setToggleSort] = useState(false);

    const [facultySearch, setFacultySearch] = useState("");

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


    // To get course Data from api

    useEffect(() => {
        getFacultyData();
    }, [])

    const getFacultyData = async () => {

        try {
            let res = await fetch(`http://localhost:3030/faculty?_page=${page}&_limit=${pagelimit}`);
            let data = await res.json();
            setFacultyData(data);
        } catch (err) {
            console.log("course", err)
        }

    }

    // To add the data

    const handleFacultySave = () => {
        let payload = {
            facultyId: facultyId,
            facultyName: facultyName,
            facultyEmail: facultyEmail,
            facultyContact: facultyContact,
            facultyAddress: facultyAddress
        }

        axios.post(`http://localhost:3030/faculty`, payload).then(() => {
            getFacultyData();
        }).then(() => {
            setShow(false);
        })
    }

    // to sort the data

    const handleSort = () => {
        setToggleSort(!toggleSort);
        // console.log(toggleSort);

        axios.get(`http://localhost:3030/faculty?_sort=facultyName&_order=${
            toggleSort ? "desc" : "asc"
        }`).then((res) => {
            let data = res.data;
            setFacultyData(data);
        })
    }

    // to Edit the data

    const handleEditBtn = (id) => {
        setId(id);
        let data = facultyData.find((ele) => ele.id === id);

        setFacultyId(data.facultyId);
        setFacultyAddress(data.facultyAddress);
        setFacultyContact(data.facultyContact);
        setFacultyEmail(data.facultyEmail);
        setFacultyName(data.facultyName);

        handleEditOpen();

    }

    const handleEditFacultySave = () => {

        let payLoad = {
            facultyId: facultyId,
            facultyName: facultyName,
            facultyEmail: facultyEmail,
            facultyContact: facultyContact,
            facultyAddress: facultyAddress
        }

        axios.put(`http://localhost:3030/faculty/${id}`, payLoad).then(() => {
            getFacultyData();
        }).then(() => {
            editSetShow(false);
        })

    }


    // to delete the data
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3030/faculty/${id}`).then(() => {
            getFacultyData();
        });
    }

    // Search Function

    const facultySearchFun = (text) => {
        setFacultySearch(text);

        if (text.length > 0) {
            axios.get(`http://localhost:3030/faculty?q=${facultySearch}`).then((res) => { // console.log(res.data);
                setFacultyData(res.data);
            })
        } else {
            getFacultyData();
        }
    }

    // Pagination Function

    const facultyPaginate = (lim) => { // console.log(lim);
        setPageLimit(lim);
        axios.get(`http://localhost:3030/faculty?_page=${
            page - 1
        }&_limit=${lim}`).then((res) => {
            setFacultyData(res.data)
        })
    }

    const prePage = () => {
        if (page > 1) {
            setPage(page - 1);
            axios.get(`http://localhost:3030/faculty?_page=${
                page - 1
            }&_limit=${pagelimit}`).then((res) => {
                setFacultyData(res.data)
            })
        }
    }

    const nextPage = () => {
        if (facultyData.length >= 0) {
            setPage(page + 1);
            axios.get(`http://localhost:3030/faculty?_page=${
                page + 1
            }&_limit=${pagelimit}`).then((res) => {
                setFacultyData(res.data)
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
                    List of Faculty
                </div>
                <div>
                    <Button onClick={handleShow}
                        variant='primary'><IoMdAdd fill='#fff'/>New Faculty</Button>
                </div>
            </div>

            <div className='d-flex justify-content-between mt-3'>
                <div>
                    <span>Select</span>
                    <select onChange={
                            (e) => { // classsPaginate(e.target.value);
                            }
                        }
                        className='mx-1'
                        name=""
                        id="classsSelect">
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
                                facultySearchFun(e.target.value)
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
                            Faculty Name<BiSort onClick={handleSort}
                                fontSize={"0.8rem"}/></th>
                        <th className='col col-2'>Email</th>
                        <th className='col col-2'>Contact</th>
                        <th className='col col-2'>Address</th>
                        <th className='col col-2'>Action</th>
                    </tr>
                </thead>
                <tbody> {
                    facultyData.map((ele, index) => {
                        return (
                            <tr key={
                                ele.id
                            }>
                                <td>{
                                    index + 1
                                }</td>
                                <td>{
                                    ele.facultyId
                                }</td>
                                <td>{
                                    ele.facultyName
                                }</td>
                                <td>{
                                    ele.facultyEmail
                                }</td>
                                <td>{
                                    ele.facultyContact
                                }</td>
                                <td>{
                                    ele.facultyAddress
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

        <FacultyForm handleEditFacultySave={handleEditFacultySave}
            setFacultyAddress={setFacultyAddress}
            setFacultyContact={setFacultyContact}
            setFacultyEmail={setFacultyEmail}
            setFacultyName={setFacultyName}
            setFacultyId={setFacultyId}
            handleFacultySave={handleFacultySave}
            show={show}
            handleClose={handleClose}/>
        <EditFacultyForm facultyName={facultyName}
            facultyEmail={facultyEmail}
            facultyContact={facultyContact}
            facultyAddress={facultyAddress}
            facultyId={facultyId}
            handleEditFacultySave={handleEditFacultySave}
            setFacultyAddress={setFacultyAddress}
            setFacultyContact={setFacultyContact}
            setFacultyEmail={setFacultyEmail}
            setFacultyName={setFacultyName}
            setFacultyId={setFacultyId}
            handleFacultySave={handleFacultySave}
            editShow={editShow}
            handleClose={handleEditClose}/>
    </div>
    )
}

export default Faculty
