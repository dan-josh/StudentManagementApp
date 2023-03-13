import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import {BiSort} from "react-icons/bi"
import SubjectForm from '../SubjectForm/SubjectForm';
import EditSubjectForm from '../EditSubjectForm/EditSubjectForm';
import axios  from 'axios';

const Subject = ({alertFunc}) => {

  const [subjectData, setSubjectData] = useState([]);
  const [subject, setSubject] = useState("");
  const [subjectDesc, setSubjectDesc] = useState("");
  const [toggle, setToggle] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editSubjectDesc, setEditSubjectDesc] = useState("");

  const [toggleSort, setToggleSort] = useState(false);

  const [subjectSearch, setSubjectSearch] = useState("");

  const [pagelimit, setPageLimit] = useState(5);
  const [page, setPage] = useState(1);

  // To get Subject Data from api

  useEffect(()=>{
    getSubjectData();
  },[])

  const getSubjectData = async()=>{

    try{
      let res = await fetch(`http://localhost:3030/subject?_page=${page}&_limit=${pagelimit}`);
      let data = await res.json();
      setSubjectData(data);
    }catch(err){
      console.log("subject",err)
    }
    
  }
  

  // Edit Functionality 

  const handleEditSubjectForm = (id)=>{

    setToggle(true);

    setEditId(id);

    let editData = subjectData.find((ele)=>{
      if(ele.id === id){
        return ele;
      }
    });

    console.log(editData);

    setEditSubject(editData.subjectName);
    setEditSubjectDesc(editData.subjectDesc);

  }

  const handleSubjectEditSubmit = (e)=>{

    e.preventDefault();

    let payload = {
      subjectName : editSubject,
      subjectDesc : editSubjectDesc
    }

    axios.put(`http://localhost:3030/subject/${editId}/`, payload).then(()=>{
      getSubjectData();
    })

    setToggle(false);

  }

  // To submit the form and add data

  const handleSubjectSubmit = (e)=>{

    e.preventDefault();

    const payload = {
      subjectName : subject,
      subjectDesc : subjectDesc
    }

    axios.post("http://localhost:3030/subject", payload).then(()=>{
      getSubjectData();
    })

    setSubject("");
    setSubjectDesc("");


  }

  // To cancel the details entered in form
  const handleCancel = ()=>{
    setSubject("");
    setSubjectDesc("");
  }

  // Delete Function

  const handleDelete = (id)=>{
    axios.delete(`http://localhost:3030/subject/${id}`).then(()=>{
      getSubjectData();
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

   axios.get(`http://localhost:3030/subject?_sort=subjectName&_order=${toggleSort ? "desc" : "asc"}`).then((res)=>{
    let data = res.data;
    setSubjectData(data);
   })
   
  }


  // Search Functionality

  const subjectSearchFun = (text)=>{
    setSubjectSearch(text);

    if(text.length>0){
      axios.get(`http://localhost:3030/subject?q=${subjectSearch}`).then((res)=>{
      // console.log(res.data);
      setSubjectData(res.data);
    })
    }else{
      getSubjectData();
    }
  }


  // Pagination Function

  const subjectPaginate = (lim)=>{
    // console.log(lim);
    setPageLimit(lim);
    axios.get(`http://localhost:3030/subject?_page=${page-1}&_limit=${lim}`).then((res)=>{
        setSubjectData(res.data)
    })
  }

  const prePage = ()=>{
    if(page>1){
      setPage(page-1);
      axios.get(`http://localhost:3030/subject?_page=${page-1}&_limit=${pagelimit}`).then((res)=>{
        setSubjectData(res.data)
      })
    }
  }

  const nextPage = ()=>{
    if(subjectData.length >=0){
      setPage(page+1);
    axios.get(`http://localhost:3030/subject?_page=${page+1}&_limit=${pagelimit}`).then((res)=>{
        setSubjectData(res.data)
      })
    }
  }


    return (
        <div className='d-flex'> 

          {/* Left Section */}

            {toggle ? <EditSubjectForm handleSubjectEditSubmit={handleSubjectEditSubmit} setToggle={setToggle} editSubject={editSubject} setEditSubject={setEditSubject} editSubjectDesc={editSubjectDesc} setEditSubjectDesc={setEditSubjectDesc} /> : <SubjectForm handleSubjectSubmit={handleSubjectSubmit} setSubject={setSubject} subject={subject} setSubjectDesc={setSubjectDesc} subjectDesc={subjectDesc} handleCancel={handleCancel} />}

            {/* Right Section */}
            <div className='mt-5 ms-5 p-3 bg-light' style={{width:"750px"}}>
              <div>
                <h6>Subject List</h6>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <div>
                  <span>Select</span>
                  <select onChange={(e)=>{
                    subjectPaginate(e.target.value);
                  }} className='mx-1' name="" id="subjectSelect">
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
                    subjectSearchFun(e.target.value)
                  }} type="text" />
                </div>
              </div>

              {/* Table Starts Here */}

              <div className='mt-4'>
                <Table  size='sm' striped bordered hover>
                  <thead>
                    <tr >
                      <th className='col col-1' >#</th>
                      <th className='col  d-flex justify-content-between align-items-center'>Subject <BiSort onClick={handleSort} fontSize={"0.8rem"} /></th>
                      <th className='col col-3'>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      subjectData.map((ele,index)=>{
                        return(
                          <tr key={ele.id}>
                            <td>{index+1}</td>
                            <td>
                              <p>{ele.subjectName}</p>
                              <small className='mt-less'> <em>{ele.subjectDesc}</em></small>
                            </td>
                            <td className='pt-3'>
                              <Button className='mx-2' onClick={()=>{
                                handleEditSubjectForm(ele.id)
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

export default Subject
