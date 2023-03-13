import React from 'react'
import Alert from "react-bootstrap/Alert";

const AlertMsg = ({amsg, avar, dAlert}) => {
  return (
    <div>
        <Alert className='mt-3 ms-5' show={dAlert} key={avar} variant={avar}>
          {amsg}
        </Alert>
    </div>
  )
}

export default AlertMsg