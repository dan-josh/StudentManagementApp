import React from 'react'
import {Image, Dropdown} from "react-bootstrap"
import logo from "../../images/logo.png"
import {AiTwotoneSetting} from "react-icons/ai"
import {BiLogOut} from "react-icons/bi"

const Header = () => {
  return (
    <div className='bg-dark p-3 px-5 d-flex justify-content-between align-items-center'>
      <Image src={logo} width={"10%"} alt="logo" />

      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          Administrator 
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item href="#/action-1" > <span> <AiTwotoneSetting /></span> Manage Account</Dropdown.Item>
        <Dropdown.Item href="#/action-2"> <span> <BiLogOut /> </span> Logout</Dropdown.Item>
      </Dropdown.Menu>

      </Dropdown>
    </div>
  )
}

export default Header