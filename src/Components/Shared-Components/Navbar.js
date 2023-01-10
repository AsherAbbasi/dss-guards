import React from 'react'
import companyLogo from '../images/dssguardslogo.jpeg';
import { Row, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const handleClickDashboard=()=>{
    navigate('/dashboard')
  }
  return (
    <Row className=' d-flex justify-content-center align-items-center  bg-light' style={{height:"83px",backgroundColor:"hsl(218, 41%, 15%)"}}>
        <img src={companyLogo} style={{ width: "303px", height: "63px",cursor:"pointer" }} onClick={handleClickDashboard}/>
      </Row>
  )
}
