import React, {useState, useEffect} from 'react'
import {Button, Table} from 'react-bootstrap'
import {IoMdAdd} from "react-icons/io"
import {BiSort} from "react-icons/bi"
import UsersForm from '../UsersForm/UsersForm'
import EditUsersForm from '../EditUsersForm/EditUsersForm'
import axios from 'axios'


const Users = () => {

    const [usersData, setUsersData] = useState([]);
    const [show, setShow] = useState(false)
    const [editShow, editSetShow] = useState(false);
    const [id, setId] = useState(null);

    const [usersName, setUsersName] = useState("");
    const [usersUsername, setUsersUsername] = useState("");
    const [usersType, setUsersType] = useState("");

    const [toggleSort, setToggleSort] = useState(false);

    const [usersSearch, setUsersSearch] = useState("");

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
        getUsersData();
    }, [])

    const getUsersData = async () => {

        try {
            let res = await fetch(`http://localhost:3030/users?_page=${page}&_limit=${pagelimit}`);
            let data = await res.json();
            setUsersData(data);
        } catch (err) {
            console.log("users", err)
        }

    }

    // To add the data

    const handleUsersSave = () => {
        let payload = {
            usersName: usersName,
            usersUsername: usersUsername,
            usersType: usersType,
        }

        axios.post(`http://localhost:3030/users`, payload).then(() => {
            getUsersData();
        }).then(() => {
            setShow(false);
        })
    }

    // to sort the data

    const handleSort = () => {
        setToggleSort(!toggleSort);
        // console.log(toggleSort);

        axios.get(`http://localhost:3030/users?_sort=usersName&_order=${
            toggleSort ? "desc" : "asc"
        }`).then((res) => {
            let data = res.data;
            setUsersData(data);
        })
    }

    // to Edit the data

    const handleEditBtn = (id) => {
        setId(id);
        let data = usersData.find((ele) => ele.id === id);

        setUsersName(data.usersName);
        setUsersUsername(data.usersUsername);
        setUsersType(data.usersType);

        handleEditOpen();

    }

    const handleEditUsersSave = () => {

        let payload = {
            usersName: usersName,
            usersUsername: usersUsername,
            usersType: usersType,
        }

        axios.put(`http://localhost:3030/users/${id}`, payload).then(() => {
            getUsersData();
        }).then(() => {
            editSetShow(false);
        })

    }


    // to delete the data
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3030/users/${id}`).then(() => {
            getUsersData();
        });
    }

    // Search Function

    const usersSearchFun = (text) => {
        setUsersSearch(text);

        if (text.length > 0) {
            axios.get(`http://localhost:3030/users?q=${usersSearch}`).then((res) => { // console.log(res.data);
                setUsersData(res.data);
            })
        } else {
            getUsersData();
        }
    }

    // Pagination Function

    const usersPaginate = (lim) => { // console.log(lim);
        setPageLimit(lim);
        axios.get(`http://localhost:3030/users?_page=${
            page - 1
        }&_limit=${lim}`).then((res) => {
            setUsersData(res.data)
        })
    }

    const prePage = () => {
        if (page > 1) {
            setPage(page - 1);
            axios.get(`http://localhost:3030/users?_page=${
                page - 1
            }&_limit=${pagelimit}`).then((res) => {
                setUsersData(res.data)
            })
        }
    }

    const nextPage = () => {
        if (usersData.length >= 0) {
            setPage(page + 1);
            axios.get(`http://localhost:3030/users?_page=${
                page + 1
            }&_limit=${pagelimit}`).then((res) => {
                setUsersData(res.data)
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
                    Users
                </div>
                <div>
                    <Button onClick={handleShow}
                        variant='primary'><IoMdAdd fill='#fff'/>New User</Button>
                </div>
            </div>

            <div className='d-flex justify-content-between mt-3'>
                <div>
                    <span>Select</span>
                    <select onChange={
                            (e) => { 
                                usersPaginate(e.target.value);
                            }
                        }
                        className='mx-1'
                        name=""
                        id="usersSelect">
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
                                usersSearchFun(e.target.value)
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
                            Name<BiSort onClick={handleSort}
                                fontSize={"0.8rem"}/></th>
                        <th className='col col-2'>Username</th>
                        <th className='col col-2'>Type</th>
                        <th className='col col-2'>Action</th>
                    </tr>
                </thead>
                <tbody> {
                    usersData.map((ele, index) => {
                        return (
                            <tr key={
                                ele.id
                            }>
                                <td>{
                                    index + 1
                                }</td>
                                
                                <td>{
                                    ele.usersName
                                }</td>
                                
                                <td>{
                                    ele.usersUsername
                                }</td>
                                <td>{
                                    ele.usersType
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

        <UsersForm handleEditUsersSave={handleEditUsersSave}
            setUsersName={setUsersName}
            setUsersUsername={setUsersUsername}
            setUsersType={setUsersType}
            handleUsersSave={handleUsersSave}
            show={show}
            handleClose={handleClose}/>
        <EditUsersForm usersName={usersName}
            usersUsername={usersUsername}
            usersType={usersType}
            handleEditUsersSave={handleEditUsersSave}
            setUsersName={setUsersName}
            setUsersUsername={setUsersUsername}
            setUsersType={setUsersType}
            handleUsersSave={handleUsersSave}
            editShow={editShow}
            handleClose={handleEditClose}/>
    </div>
    )
}

export default Users;