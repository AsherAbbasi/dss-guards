import React from 'react'
import {  Container } from 'react-bootstrap';
// import DashboardSideBar from '../Shared-Components/Dashboard-Sidebar'
// import NavigationBar from '../Shared-Components/Navbar'
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { API } from '../../Config/config'

export default function AddUser({setAddUserModal,employeeUpdated}) {
  const [validated, setValidated] = useState(false);
  
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
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
    }
    else if (form.checkValidity() === true) {
      e.preventDefault();
    try {
      const url = `${API}auth/user`;
      await axios.post(url, newUser);
      toast.success("User Added successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      setNewUser()
      employeeUpdated();
      setAddUserModal(false)
    } catch (error) {
      toast.error(`${error.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });

    }}
  }
  // const styles = {
  //   column: {
  //     boxShadow: "1px 2px 3px 1px #949188",
  //     backgroundColor: "white",
  //     borderRadius: 12,
  //     padding: "25px",
  //     width: "70%",
  //     marginTop: "20px"
  //   },
  // }
  // const { column } = styles;

  return (
    <Container fluid={true}>
      {/* <Row>
        <NavigationBar />
      </Row> */}
      {/* <Row> */}
        {/* <Col md={2}><DashboardSideBar /></Col> */}
        {/* <Col md={12}> */}
          {/* <Container> */}
            {/* <Row>
              <p id="text">Please Fill This Form!</p>
            </Row> */}
            {/* <Row className='d-flex justify-content-center align-items-center'>
              <Col style={column}  > */}

                <Form md={2}  noValidate validated={validated} onSubmit={handleSubmit}>
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
                    <Form.Select aria-label="Default select example" name="role" onChange={handleOnChange} required>
                      <option>Select Role Of User</option>
                      <option value="Admin" >Admin</option>
                      {/* <option value="Guard" >Guard</option> */}
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
              {/* </Col>
            </Row>
          </Container>
        </Col>
      </Row> */}
    </Container>
  )
}
