import { React, useEffect, useState } from 'react'
import { Row, Form, Col, Card, Button } from 'react-bootstrap'; 
import { API } from '../../../Config/config'
import axios from 'axios';
import { toast } from "react-toastify";

 
 const BuildingModal =({bCode}) =>{
const initialData={
  buildingCode:"",
  buildingAddress:"",
  buildingUnits:"",
  parkingPermits:"",
}   
  const [buildingData,setBuildingData]=useState(initialData);

  useEffect(() => {
    const res = axios.get(`${API}building/${bCode}`)
      .then((res) => {
        console.log(res)
        setBuildingData(res.data)
      })
  }, []);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const url = `${API}building/${bCode}`;
      console.log(url)
      await axios.put(url, buildingData);
      toast.success("Data Updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });

    } catch (error) {
      toast.error(`${error.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });

    }
  }
  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setBuildingData((prevState) => ({...prevState, [name]: value}));
    e.preventDefault();
}
    return (
       <>
        <Row className='d-flex justify-content-center align-items-center'>
              <Col>

                <Form md={2}  onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Building Code:</p>
                    <Form.Control type="text" name="buildingCode"  value={buildingData.buildingCode} onChange={handleOnChange} disabled />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Building Address:</p>
                    <Form.Control type="text" name="buildingAddress" value={buildingData.buildingAddress}  onChange={handleOnChange} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Building Units:</p>
                      <Form.Control type="text" name="buildingUnits" value={buildingData.buildingUnits.length}  onChange={handleOnChange}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <p className='mb-2'>Parking Slots:</p>
                    <Form.Control type="text" name="parkingSlots" value={buildingData.parkingSlots}  onChange={handleOnChange}/>
                  </Form.Group>

                  <Button variant="primary" type="submit" id='submitBtn'>
                    Update
                  </Button>
                </Form>
              </Col>
            </Row>
            </>
    )   
 }
 
 export default BuildingModal