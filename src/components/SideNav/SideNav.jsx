import React from 'react'
import {AiFillDashboard} from "react-icons/ai"
import {FaList, FaBook, FaListAlt, FaUserTie} from "react-icons/fa"
import {MdPeople} from "react-icons/md"
import {BsListCheck} from "react-icons/bs"
import {IoIosPeople} from "react-icons/io"
import { Link } from 'react-router-dom'

const SideNav = () => {
    return (
        <div className='text-center bg-dark'
            style={
                {
                    width: "15%",
                }
        }>
            <div className='bg-white'>
                <div className='d-flex align-items-center py-2 ps-4  bg-dark text-light' >
                    <AiFillDashboard fontSize={"1rem"}/>
                    <h5 className='ms-2 mt-2'>Dashboard</h5>
                </div>
                <Link to={"coursePage"} className='d-flex align-items-center text-dark linkBtn py-2 ps-4 bg-light hover-dark'>
                    <FaList fontSize={"0.8rem"}/>
                    <h6 className='ms-2 mt-1'>Course</h6>
                </Link>
                <Link to={"subjectPage"} className='d-flex linkBtn text-dark align-items-center py-2 ps-4 bg-light hover-dark'>
                    <FaBook fontSize={"0.8rem"}/>
                    <h6 className='ms-2 mt-1'>Subject</h6>
                </Link>
                <Link to={"classsPage"} className='d-flex text-dark linkBtn align-items-center py-2 ps-4 bg-light mt-1 hover-dark'>
                    <FaListAlt fontSize={"0.8rem"}/>
                    <h6 className='ms-2 mt-1'>Class</h6>
                </Link>
                <Link to={"facultyPage"} className='d-flex text-dark linkBtn align-items-center py-2 ps-4 bg-light hover-dark'>
                    <FaUserTie fontSize={"0.8rem"}/>
                    <h6 className='ms-2 mt-1'>Faculty</h6>
                </Link>
                <Link to={"studentPage"} className='d-flex text-dark linkBtn align-items-center py-2 ps-4 bg-light hover-dark'>
                    <MdPeople fontSize={"1rem"}/>
                    <h6 className='ms-2 mt-1'>Student</h6>
                </Link>
                <Link to={"cpsPage"} className='d-flex text-dark linkBtn align-items-center py-2 ps-4 bg-light hover-dark'>
                    <MdPeople fontSize={"1rem"}/>
                    <h6 className='ms-2 mt-1'>Class per Subject</h6>
                </Link>
                <Link to={"checkAttendancePage"} className='d-flex text-dark linkBtn align-items-center py-2 ps-4 bg-light mt-1 hover-dark'>
                    <BsListCheck fontSize={"1rem"}/>
                    <h6 className='ms-2 mt-1'>Check Attendance</h6>
                </Link>
                <Link to={"attendanceRecordPage"} className='d-flex text-dark linkBtn align-items-center py-2 ps-4 bg-light hover-dark'>
                    <BsListCheck fontSize={"1rem"}/>
                    <h6 className='ms-2 mt-1'>Attendance Record</h6>
                </Link>
                <div className='d-flex text-dark linkBtn align-items-center py-2 ps-4 bg-light hover-dark'>
                    <BsListCheck fontSize={"1rem"}/>
                    <h6 className='ms-2 mt-1'>Attendance Report</h6>
                </div>
                <Link to={"usersPage"} className='d-flex text-dark linkBtn align-items-center py-2 ps-4 bg-light hover-dark'>
                    <IoIosPeople fontSize={"1rem"}/>
                    <h6 className='ms-2 mt-1'>Users</h6>
                </Link>
            </div>
        </div>
    )
}

export default SideNav
