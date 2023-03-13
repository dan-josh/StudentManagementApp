import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Course from '../Course/Course'
import Subject from '../Subject/Subject'
import Class from "../Class/Class"
import Faculty from "../Faculty/Faculty"
import Student from "../Student/Student"
import ClassPerSubject from "../ClassPerSubject/ClassPerSubject"
import CheckAttendance from '../CheckAttendance/CheckAttendance'
import AttendanceRecord from '../AttendanceRecord/AttendanceRecord'
import Users from '../Users/Users'

const Routing = ({alertFunc}) => {
  return (
    <div>
        <Routes>
          <Route path='coursePage' element={<Course alertFunc={alertFunc} />} />
          <Route path="subjectPage" element={<Subject alertFunc={alertFunc}/>} />
          <Route path="classsPage" element={<Class alertFunc={alertFunc}/>} />
          <Route path="facultyPage" element={<Faculty alertFunc={alertFunc}/>} />
          <Route path="studentPage" element={<Student alertFunc={alertFunc}/>} />
          <Route path="cpsPage" element={<ClassPerSubject alertFunc={alertFunc}/>} />
          <Route path="checkAttendancePage" element={<CheckAttendance alertFunc={alertFunc}/>} />
          <Route path="attendanceRecordPage" element={<AttendanceRecord alertFunc={alertFunc}/>} />
          <Route path="usersPage" element={<Users alertFunc={alertFunc}/>} />
        </Routes>
    </div>
  )
}

export default Routing