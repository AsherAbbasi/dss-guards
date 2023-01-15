import React, { useState } from 'react'
import { Row, Form, Col, Button } from 'react-bootstrap'; 
import { API } from '../../../Config/config'
import axios from 'axios';
import { toast } from "react-toastify";

export default function EditEmployeeModal({data,setEmployeeModal,employeeUpdated}) {
    const [empData,setEmpData]=useState(data)
    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setEmpData((prevState) => ({...prevState, [name]: value}));
        e.preventDefault();
    }
    let id=data._id
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const url = `${API}auth/${id}`;
      await axios.put(url, empData);
      toast.success("Data Updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
      employeeUpdated();
      setEmployeeModal(false)
    } catch (error) {
      toast.error(`${error.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });

    }
  }
  return (
    <>
    <Row className='d-flex justify-content-center align-items-center'>
          <Col>

          <Form md={2} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Name</p>
                    <Form.Control type="text" name="name" value={empData.name} onChange={handleOnChange} required />

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Email</p>
                    <Form.Control type="email" name="email" value={empData.email} onChange={handleOnChange} required />

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Password</p>
                    <div className='d-flex'>
                      <Form.Control type="password" name="password" value={empData.password} onChange={handleOnChange} required />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Add Building Code </p>
                    <Form.Control type="text" name="buildingCode" value={empData.buildingCode} onChange={handleOnChange} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <p className='mb-2'>Role</p>
                    <Form.Select aria-label="Default select example"name="role" onChange={handleOnChange}>
                      <option>{empData.role}</option>
                      <option value="Admin">Admin</option>
                      <option value="Guard">Guard</option>
                      <option value="User">User</option>
                    </Form.Select>
                  </Form.Group>

                  <Button variant="primary" type="submit" id='submitBtn'>
                    SUBMIT
                  </Button>
                </Form>
          </Col>
        </Row>
        </>
  )
}
