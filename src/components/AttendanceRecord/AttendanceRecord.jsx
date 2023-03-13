import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';

const AttendanceRecord = () => {

  const [cpsData, setCpsData] = useState([]);

  useEffect(()=>{
    getCpsData();
  },[])

  const getCpsData  = async()=>{
    try{
      let res  = await fetch ("http://localhost:3030/cps");
      let data = await res.json();
      setCpsData(data);
    }catch(err){
      console.log("Attendancerecord:",err);
    }
  }

  return (
    <div className=' border ms-5 mt-5' style={{width:"1200px"}}>
      <h6 className='p-3 bg-light'>Attendance Record's</h6>
     <div className='d-flex justify-content-center gap-3 align-items-center pt-2'>
      <p className='pt-2'>Class per Subjects</p>
      <Form className='d-flex gap-3'>
        <Form.Group>
      <Form.Select>
        <option >Please Select Here</option>
        {
          cpsData.map((ele,index)=>{
            return <option key={ele.id} value={`${ele.cpsClass} ${ele.cpsSubject} ${ele.cpsFaculty}`}>{ele.cpsClass} {ele.cpsSubject} {ele.cpsFaculty}</option>
          })
        }
      </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Control type='date' />
        </Form.Group>

        <Form.Group>
          <Button variant='primary' >Filter</Button>
        </Form.Group>

      </Form>

      
      
     </div>
      <hr />
      <h2 className='text-center'>Please Select Class First</h2>
    </div>
  )
}

export default AttendanceRecord