import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import {BiSort} from "react-icons/bi"
import ClasssForm from '../ClasssForm/ClasssForm';
import EditClasssForm from '../EditClasssForm/EditClasssForm';
import axios  from 'axios';

const Class = ({alertFunc}) => {

  const [classsData, setClasssData] = useState([]);
  const [classs, setClasss] = useState("");
  const [classsLevel, setClasssLevel] = useState("");
  const [classsSection, setClasssSection] = useState("");
  const [toggle, setToggle] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editClasss, setEditClasss] = useState("");
  const [editClasssLevel, setEditClasssLevel] = useState("");
  const [editClasssSection, setEditClasssSection] = useState("");

  const [toggleSort, setToggleSort] = useState(false);

  const [classsSearch, setClasssSearch] = useState("");

  const [pagelimit, setPageLimit] = useState(5);
  const [page, setPage] = useState(1);

  // To get Classs Data from api

  useEffect(()=>{
    getClasssData();
  },[])

  const getClasssData = async()=>{

    try{
      let res = await fetch(`http://localhost:3030/classs?_page=${page}&_limit=${pagelimit}`);
      let data = await res.json();
      setClasssData(data);
    }catch(err){
      console.log("classs",err)
    }
    
  }
  

  // Edit Functionality 

  const handleEditClasssForm = (id)=>{

    setToggle(true);

    setEditId(id);

    let editData = classsData.find((ele)=>{
      if(ele.id === id){
        return ele;
      }
    });

    console.log(editData);

    setEditClasss(editData.classsName);
    setEditClasssLevel(editData.classsLevel);
    setEditClasssSection(editData.classsSection);

  }

  const handleClasssEditSubmit = (e)=>{

    e.preventDefault();

    let payload = {
      classsName : editClasss,
      classsLevel : editClasssLevel,
      classsSection : editClasssSection
    }

    
    axios.put(`http://localhost:3030/classs/${editId}/`, payload).then(()=>{
      getClasssData();
    })

    setToggle(false);

  }

  // To submit the form and add data

  const handleClasssSubmit = (e)=>{

    e.preventDefault();

    const payload = {
      classsName : classs,
      classsLevel : classsLevel,
      classsSection : classsSection
    }

    axios.post("http://localhost:3030/classs", payload).then(()=>{
      getClasssData();
    })

    setClasss("");
    setClasssLevel("");
    setClasssSection("");

  }

  // To cancel the details entered in form
  const handleCancel = ()=>{
    setClasss("");
    setClasssLevel("");
    setClasssSection("");
  }

  // Delete Function

  const handleDelete = (id)=>{
    axios.delete(`http://localhost:3030/classs/${id}`).then(()=>{
      getClasssData();
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

   axios.get(`http://localhost:3030/course?_sort=classsName&_order=${toggleSort ? "desc" : "asc"}`).then((res)=>{
    let data = res.data;
    setClasssData(data);
   })
   
  }


  // Search Functionality

  const classsSearchFun = (text)=>{
    setClasssSearch(text);

    if(text.length>0){
      axios.get(`http://localhost:3030/classs?q=${classsSearch}`).then((res)=>{
      // console.log(res.data);
      setClasssData(res.data);
    })
    }else{
      getClasssData();
    }
  }


  // Pagination Function

  const classsPaginate = (lim)=>{
    // console.log(lim);
    setPageLimit(lim);
    axios.get(`http://localhost:3030/classs?_page=${page-1}&_limit=${lim}`).then((res)=>{
        setClasssData(res.data)
    })
  }

  const prePage = ()=>{
    if(page>1){
      setPage(page-1);
      axios.get(`http://localhost:3030/classs?_page=${page-1}&_limit=${pagelimit}`).then((res)=>{
        setClasssData(res.data)
      })
    }
  }

  const nextPage = ()=>{
    if(classsData.length >=0){
      setPage(page+1);
    axios.get(`http://localhost:3030/classs?_page=${page+1}&_limit=${pagelimit}`).then((res)=>{
        setClasssData(res.data)
      })
    }
  }


    return (
        <div className='d-flex'> 

          {/* Left Section */}

            {toggle ? <EditClasssForm handleClasssEditSubmit={handleClasssEditSubmit} setToggle={setToggle} editClasss={editClasss} setEditClasss={setEditClasss} editClasssSection={editClasssSection} setEditClasssSection={setEditClasssSection} editClasssLevel={editClasssLevel} setEditClasssLevel={setEditClasssLevel} /> : <ClasssForm handleClasssSubmit={handleClasssSubmit} setClasss={setClasss} classs={classs} setClasssLevel={setClasssLevel} classsLevel={classsLevel} setClasssSection={setClasssSection} classsSection={classsSection} handleCancel={handleCancel} />}

            {/* Right Section */}
            <div className='mt-5 ms-5 p-3 bg-light' style={{width:"750px"}}>
              <div>
                <h6>Class List</h6>
              </div>
              <hr />
              <div className='d-flex justify-content-between'>
                <div>
                  <span>Select</span>
                  <select onChange={(e)=>{
                    classsPaginate(e.target.value);
                  }} className='mx-1' name="" id="classsSelect">  
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
                    classsSearchFun(e.target.value)
                  }} type="text" />
                </div>
              </div>

              {/* Table Starts Here */}

              <div className='mt-4'>
                <Table  size='sm' striped bordered hover>
                  <thead>
                    <tr >
                      <th className='col col-1' >#</th>
                      <th className='col  d-flex justify-content-between align-items-center'>Class <BiSort onClick={handleSort} fontSize={"0.8rem"} /></th>
                      <th className='col col-3'>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      classsData.map((ele,index)=>{
                        return(
                          <tr key={ele.id}>
                            <td>{index+1}</td>
                            <td>
                              <p>{ele.classsName} {ele.classsLevel}-{ele.classsSection}</p>
                            </td>
                            <td className='pt-3'>
                              <Button className='mx-2' onClick={()=>{
                                handleEditClasssForm(ele.id)
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

export default Class
