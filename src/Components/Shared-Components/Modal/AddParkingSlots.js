import React, { useState,useEffect } from 'react'
import { Row, Form,Button, Col } from 'react-bootstrap';
import { API } from '../../../Config/config'
import axios from 'axios';
import { toast } from "react-toastify";


const  AddParkingSlots=({data,setShowUnitsModel,updatedUnits}) =>{
const [updatedSlots,setUpdatedSlots]=useState(data)
let id=(updatedSlots._id)

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setUpdatedSlots((prevState) => ({...prevState, [name]: value}));
    e.preventDefault();

}
const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
    const url = `${API}units/${id}`;
    await axios.put(url, updatedSlots);
    toast.success("Data Updated successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2500,
    }
    );
    setShowUnitsModel(false)
    updatedUnits();
  } catch (error) {
    toast.error(`${error.response.data}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2500,
    });
  }
}


  return (
    <Row className='d-flex justify-content-center align-items-center'>
    <Col>

      <Form md={2} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <p className='mb-2'>Building Unit Number:</p>
          <Form.Control type="text" name="buildingUnits" value={updatedSlots.buildingUnits} onChange={handleOnChange} disabled />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <p className='mb-2'>  parking Slots </p>
          <Form.Control type="text" name="parkingSlots" value={updatedSlots.parkingSlots} onChange={handleOnChange} />
        </Form.Group>

        <Button variant="primary" type="submit" id='submitBtn'>
          Update
        </Button>
      </Form>
    </Col>
  </Row>
  )
}
export default AddParkingSlots;
