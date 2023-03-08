import { React, useEffect, useState } from 'react'
import NavigationBar from '../Shared-Components/Navbar'
import DashboardSidebar from '../Shared-Components/Dashboard-Sidebar';
import { toast } from "react-toastify";
import { API } from '../../Config/config'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import UnitModel from '../Modal/AddParkingSlots'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';


const BuildingUnits = ({buildingCode}) => {
  const [buildingUnits, setBuildingUnits] = useState([])
  const [showUnitsModel, setShowUnitsModel] = useState(false);
  const [showUnit, setShowUnit] = useState();
  const [unitsUpdated, setUnitsUpdated] = useState(false)
  const Role = localStorage.getItem("role")
  const [searchValue, setSearchValue] = useState("");
  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const updatedUnits = () => setUnitsUpdated(!unitsUpdated)
  const handleClose = () => setShowUnitsModel(false);
  const handleShowData = (data) => {
    setShowUnitsModel(true)
    setShowUnit(data)
  };

  useEffect(() => {
    axios.get(`${API}units/${buildingCode}`)
      .then((res) => {
        setBuildingUnits(res.data)
      })
  }, [unitsUpdated]);
  return (
    <>
      <Container fluid={true}>
        {/* <Row>
          <NavigationBar />
        </Row> */}
        <Row>
          {/* <Col md={2} ><DashboardSidebar /></Col> */}
          <Col>
            <Row style={{ padding: '12px' }}>
              <Col md={12} className="d-flex justify-content-end" id="" >
                <Col md={6}><h5 style={{ color: "brown", marginTop: '7px' }}>Building Units</h5></Col>
                <Form.Control id="searchBar"
                  type="search"
                  placeholder="Search By Building Unit Number..."
                  onChange={handleChangeSearch}
                  value={searchValue}
                  className="me-2"
                  aria-label="Search"
                />
              </Col>

            </Row>
            <Container>
              <Row className='d-flex justify-content-center align-items-center'>
                <Col>
                  <table className="table" >
                  <thead id='tHead'>
                      <tr>
                        <td >BUILDING UNIT NUMBER</td>
                        <td >PERMIT PER MONTH</td>
                        {Role === "Admin" ?
                          <td >ACTIONS</td> : ''}
                      </tr>
                    </thead>
                    <tbody>
                      {buildingUnits?.filter((value) => (
                        value.buildingUnits.toLowerCase().includes(searchValue)))
                        .map((data, index) => {
                          return <tr key={index} >
                            <td className='text-center'>{data.buildingUnits}</td>
                            <td className='text-center'>{data.parkingSlots}</td>
                            {Role === "Admin" ?
                              <td className='d-flex'>
                                <Button
                                  id='editButton' style={{ border: "none" }}
                                  onClick={() => handleShowData(data)}
                                >
                                  Allow More Permit
                                </Button>
                              </td> : ''}
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Modal show={showUnitsModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Parking Slots for Given building</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UnitModel data={showUnit} setShowUnitsModel={setShowUnitsModel} updatedUnits={updatedUnits} />
        </Modal.Body>
      </Modal>
    </>
  )
}
export default BuildingUnits;