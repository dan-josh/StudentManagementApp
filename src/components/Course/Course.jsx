import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import {BiSort} from "react-icons/bi"
import CourseForm from '../CourseForm/CourseForm';
import EditCourseForm from '../EditCourseForm/EditCourseForm';
import axios  from 'axios';

const Course = ({alertFunc}) => {

  const [courseData, setCourseData] = useState([]);
  const [course, setCourse] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [toggle, setToggle] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editCourse, setEditCourse] = useState("");
  const [editCourseDesc, setEditCourseDesc] = useState("");

  const [toggleSort, setToggleSort] = useState(false);

  const [courseSearch, setCourseSearch] = useState("");

  const [pagelimit, setPageLimit] = useState(5);
  const [page, setPage] = useState(1);

  // To get course Data from api

  useEffect(()=>{
    getCourseData();
  },[])

  const getCourseData = async()=>{

    try{
      let res = await fetch(`http://localhost:3030/course?_page=${page}&_limit=${pagelimit}`);
      let data = await res.json();
      setCourseData(data);
    }catch(err){
      console.log("course",err)
    }
    
  }
  

  // Edit Functionality 

  const handleEditCourseForm = (id)=>{

    setToggle(true);

    setEditId(id);

    let editData = courseData.find((ele)=>{
      if(ele.id === id){
        return ele;
      }
    });

    console.log(editData);

    setEditCourse(editData.courseName);
    setEditCourseDesc(editData.courseDesc);

  }

  const handleCourseEditSubmit = (e)=>{

    e.preventDefault();

    let payload = {
      courseName : editCourse,
      courseDesc : editCourseDesc
    }

    // console.log(payload);

    // let editedData = courseData.map(ele => ele.id === editId ? {...ele, ...payload} : ele);

    // console.log(editedData);

    axios.put(`http://localhost:3030/course/${editId}/`, payload).then(()=>{
      getCourseData();
    })

    setToggle(false);

  }

  // To submit the form and add data

  const handleCourseSubmit = (e)=>{

    e.preventDefault();

    const payload = {
      courseName : course,
      courseDesc : courseDesc
    }

    axios.post("http://localhost:3030/course", payload).then(()=>{
      getCourseData();
    })

    setCourse("");
    setCourseDesc("");


  }

  // To cancel the details entered in form
  const handleCancel = ()=>{
    setCourse("");
    setCourseDesc("");
  }

  // Delete Function

  const handleDelete = (id)=>{
    axios.delete(`http://localhost:3030/course/${id}`).then(()=>{
      getCourseData();
    })

  }

  // Cancel function of Edit form

  const handleEditCancel = ()=>{
    setToggle(false);
  }


  // Sort functionality
  
  const handleSort = ()=>{

    setToggleSort(!toggleSort);
    // console.log(toggleSort);

   axios.get(`http://localhost:3030/course?_sort=courseName&_order=${toggleSort ? "desc" : "asc"}`).then((res)=>{
    let data = res.data;
    setCourseData(data);
   })
   
  }


  // Search Functionality

  const courseSearchFun = (text)=>{
    setCourseSearch(text);

    if(text.length>0){
      axios.get(`http://localhost:3030/course?q=${courseSearch}`).then((res)=>{
      // console.log(res.data);
      setCourseData(res.data);
    })
    }else{
      getCourseData();
    }
  }


  // Pagination Function

  const coursePaginate = (lim)=>{
    // console.log(lim);
    setPageLimit(lim);
    axios.get(`http://localhost:3030/course?_page=${page-1}&_limit=${lim}`).then((res)=>{
        setCourseData(res.data)
    })
  }

  const prePage = ()=>{
    if(page>1){
      setPage(page-1);
      axios.get(`http://localhost:3030/course?_page=${page-1}&_limit=${pagelimit}`).then((res)=>{
        setCourseData(res.data)
      })
    }
  }

  const nextPage = ()=>{
    if(courseData.length >=0){
      setPage(page+1);
    axios.get(`http://localhost:3030/course?_page=${page+1}&_limit=${pagelimit}`).then((res)=>{
        setCourseData(res.data)
      })
    }
  }


    return (
        <div className='d-flex'> 

          {/* Left Section */}

            {toggle ? <EditCourseForm handleCourseEditSubmit={handleCourseEditSubmit} setToggle={setToggle} editCourse={editCourse} setEditCourse={setEditCourse} editCourseDesc={editCourseDesc} setEditCourseDesc={setEditCourseDesc} /> : <CourseForm handleCourseSubmit={handleCourseSubmit} setCourse={setCourse} course={course} setCourseDesc={setCourseDesc} courseDesc={courseDesc} handleCancel={handleCancel} />}

            {/* Right Section */}
            <div className='mt-5 ms-5 p-3 bg-light' style={{width:"750px"}}>
              <div>
                <h6>Course List</h6>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <div>
                  <span>Select</span>
                  <select onChange={(e)=>{
                    coursePaginate(e.target.value);
                  }} className='mx-1' name="" id="courseSelect">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                  <span>entries</span>
                </div>
                <div>
                  <span className='me-2'>Search:</span>
                  <input onChange={(e)=>{
                    courseSearchFun(e.target.value)
                  }} type="text" />
                </div>
              </div>

              {/* Table Starts Here */}

              <div className='mt-4'>
                <Table  size='sm' striped bordered hover>
                  <thead>
                    <tr >
                      <th className='col col-1' >#</th>
                      <th className='col  d-flex justify-content-between align-items-center'>Course <BiSort onClick={handleSort} fontSize={"0.8rem"} /></th>
                      <th className='col col-3'>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      courseData.map((ele,index)=>{
                        return(
                          <tr key={ele.id}>
                            <td>{index+1}</td>
                            <td>
                              <p>{ele.courseName}</p>
                              <small className='mt-less'> <em>{ele.courseDesc}</em></small>
                            </td>
                            <td className='pt-3'>
                              <Button className='mx-2' onClick={()=>{
                                handleEditCourseForm(ele.id)
                              }}>Edit</Button>
                              <Button variant='danger' onClick={()=>{
                                handleDelete(ele.id)
                              }}>Delete</Button>
                            </td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </Table>
              </div>

              <div className="row mt-2 mb-4">
                        <div className="d-flex justify-content-between">
                            <p>Showing 1 to 2 of {pagelimit} entries</p>
                            <div className="d-flex justify-content-space-between">

                                <button onClick={prePage} id="back" className="me-1 btn btn-sm btn-primary px-3">Back</button>
                                <button id="pagenumber" className="fw-bold px-2 bg-light border border-1">{page}</button>
                                <button onClick={nextPage} id="next" className="ms-1 btn btn-sm btn-primary px-3">Next</button>
                            </div>

                        </div>

                    </div>

            </div>
        </div>
    )
}

export default Course
