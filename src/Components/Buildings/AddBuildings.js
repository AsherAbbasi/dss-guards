import React from 'react'
import { Row, Container } from 'react-bootstrap';
// import DashboardSideBar from '../Shared-Components/Dashboard-Sidebar'
// import NavigationBar from '../Shared-Components/Navbar'
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { API } from '../../Config/config'


const AddBuilding = ({ setAddBuildingModal, buildingUpdated }) => {
  const [units, setUnits] = useState([])
  const [error, setError] = useState(false);

  const formData = {
    buildingCode: '',
    buildingAddress: '',
    buildingUnits: [],
    parkingSlots: '',
  }
  const [data, setData] = useState(formData);
  const accessToken = localStorage.getItem('Access token');

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
    e.preventDefault();
  }
  let buildingCode = data?.buildingCode;
  let buildingUnitsData = units.map(buildingUnits => {
    return { buildingCode, buildingUnits }
  })

  let createUnits = async () => {
    const url = `${API}units`;
    await axios.post(url, buildingUnitsData, { headers: { "Authorization": `Bearer ${accessToken}` } });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.buildingCode || !data.buildingAddress || !data.buildingUnits || !data.parkingSlots) {
      setError(true)
    }
    else {
      try {
        const url = `${API}building`;
        await axios.post(url, data, { headers: { "Authorization": `Bearer ${accessToken}` } });
        toast.success("Building Added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        buildingUpdated();
        setAddBuildingModal(false)
      } catch (error) {
        toast.error(`${error.response.data}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });

      }
    }
    createUnits()

  }
  const handleAddClick = (e) => {
    const getUnits = [...units];
    getUnits.push(data.buildingUnits);
    setUnits(getUnits);
    data.buildingUnits = getUnits
    setData(data)
  }



  return (
    <Container fluid={true}>
      {/* <Row> */}
      {/* <NavigationBar /> */}
      {/* </Row> */}
      {/* <Row> */}
      {/* <Col md={2}><DashboardSideBar /></Col> */}
      {/* <Col md={12}> */}
      {/* <Container> */}
      {/* <Row> */}
      {/* <p id="text">Please add information of building here!</p> */}
      {/* </Row> */}
      {/* <Row className='d-flex justify-content-center align-items-center'>
              <Col id='addBuilding'  > */}

      <Form md={2} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <p className='mb-2'>Building Code:</p>
          <Form.Control type="text" name="buildingCode" placeholder="Enter Building Code" onChange={handleOnChange} />
          {error && data.buildingCode <= 0 ? <label id='left'>Please Add Building Code!</label> : ""}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <p className='mb-2'>Building Address:</p>
          <Form.Control type="text" name="buildingAddress" placeholder="Enter Building Address" onChange={handleOnChange} />
          {error && data.buildingAddress <= 0 ? <label id='left'>Please Add Building Address!</label> : ""}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <p className='mb-2'>Building Units:</p>
          <div className='d-flex'>
            <Form.Control type="text" name="buildingUnits" placeholder="Enter Units" onChange={handleOnChange} />
            <Button id='addButton' onClick={handleAddClick}>Add Unit</Button>
          </div>
          {error && data.buildingUnits <= 0 ? <label id='left'>Please Add Building Units!</label> : ""}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <p className='mb-2'>Parking Slots:</p>
          <Form.Control type="text" name="parkingSlots" placeholder="Parking Slots" onChange={handleOnChange} />
          {error && data.parkingSlots <= 0 ? <label id='left'>Please Add Parking Slots!</label> : ""}
        </Form.Group>

        <Button variant="primary" type="submit" id='submitBtn'>
          SUBMIT
        </Button>
      </Form>
      {/* </Col> */}
      {/* //         </Row> */}
      {/* //       </Container> */}
      {/* </Col> */}
      {/* //   </Row> */}
    </Container>
  )
}

export default AddBuilding;