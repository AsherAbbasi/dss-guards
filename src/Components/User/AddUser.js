import React from 'react'
import { Row, Container, Col } from 'react-bootstrap';
import DashboardSideBar from '../Shared-Components/Dashboard-Sidebar'
import NavigationBar from '../Shared-Components/Navbar'
import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { API } from '../../Config/config'

export default function AddGuards() {
  useEffect(() => {
    // change background color with a random color
    const color = "white";
    document.body.style.background = color;
  });
  const initialData = {
    name:"",
    email:"",
    password:"",
    buildingCode:"Not Assigned",
    role:""

  }
  const [newUser, setNewUser] = useState(initialData)
  const [showUnitInput,setShowUnitInput]=useState(true)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
    setShowUnitInput(value)
    e.preventDefault();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${API}auth/user`;
      await axios.post(url, newUser);
      toast.success("User Added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      setNewUser()
    } catch (error) {
      toast.error(`${error.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });

    }
  }
  const styles = {
    column: {
      boxShadow: "1px 2px 3px 1px #949188",
      backgroundColor: "white",
      borderRadius: 12,
      padding: "25px",
      width: "70%",
      marginTop: "20px"
    },
  }
  const { column } = styles;

  return (
    <Container fluid={true}>
      <Row>
        <NavigationBar />
      </Row>
      <Row>
        <Col md={2}><DashboardSideBar /></Col>
        <Col md={10}>
          <Container>
            <Row>
              <p id="text">Please Fill This Form!</p>
            </Row>
            <Row className='d-flex justify-content-center align-items-center'>
              <Col style={column} lg={2} md={4} >

                <Form md={2} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Name</p>
                    <Form.Control type="text" name="name" placeholder="Enter Name" onChange={handleOnChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Email</p>
                    <Form.Control type="email" name="email" placeholder="Enter Email " onChange={handleOnChange} required />

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Password</p>
                    <div className='d-flex'>
                      <Form.Control type="password" name="password" placeholder="Enter password" onChange={handleOnChange} required />
                    </div>
                  </Form.Group>


                  <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <p className='mb-2'>Role</p>
                    <Form.Select aria-label="Default select example" name="role" onChange={handleOnChange} >
                      <option>Select Role Of User</option>
                      <option value="Admin" >Admin</option>
                      <option value="Guard" >Guard</option>
                      <option value="User" >User</option>
                    </Form.Select>
                  </Form.Group>
                
                 {showUnitInput === 'Admin' ? '':
                 <>
                 <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <p className='mb-2'>Add Building Code </p>
                    <Form.Control type="text" name="buildingCode" placeholder="Enter Code Of Building" onChange={handleOnChange} required  />
                  </Form.Group>
                 </>
                  
                   }

                  <Button variant="primary" type="submit" id='submitBtn'>
                    SUBMIT
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}
