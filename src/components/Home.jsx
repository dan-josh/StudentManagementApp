import React, { useState } from 'react'
import AlertMsg from "./AlertMsg/AlertMsg"
import Header from './Header/Header'
import Routing from './Routing/Routing'
import SideNav from './SideNav/SideNav'

const Home = () => {

  const [amsg, setAmsg] = useState("");
  const [avar, setAvar] = useState("");
  const [dAlert, setDalert] = useState(false);

  const alertFunc = (obj)=>{

    setAmsg(obj.alertMsg);
    setAvar(obj.alertVar);

    setDalert(true);

    setTimeout(()=>{
      setDalert(false);
    },1000)

  }


  return (
    <div>
        <Header />
        <div className='d-flex'>
          <SideNav />
          <div>
            <AlertMsg amsg={amsg} avar={avar} dAlert={dAlert} />
            <Routing alertFunc={alertFunc} />
          </div>
        </div>
    </div>
  )
}

export default Home