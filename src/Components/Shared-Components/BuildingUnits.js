import {React,useEffect, useState} from 'react'
import NavigationBar from './Navbar'
import DashboardSidebar from './Dashboard-Sidebar';
import { toast } from "react-toastify";
import { API } from '../../Config/config'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import UnitModel from './Modal/AddParkingSlots'
import { Row, Container, Col,Button } from 'react-bootstrap';


export default function BuildingUnits({buildingCode}) {
  const [buildingUnits,setBuildingUnits]=useState([])
  const [showUnitsModel, setShowUnitsModel] = useState(false);
  const [showUnit, setShowUnit] = useState();
  const [unitsUpdated, setUnitsUpdated]=useState(false)
  const Role = localStorage.getItem("role")

  
const updatedUnits=()=>setUnitsUpdated(!unitsUpdated)
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
    <Row>
        <NavigationBar />
      </Row>
          <Row>
          <Col md={2} ><DashboardSidebar /></Col>
            <Col>
          <p id="text">Building Units of building {buildingCode} </p>
          <Container>
              <Row className='d-flex justify-content-center align-items-center'>
                <Col>
                  <table className="table table-bordered" id='bunitTable'>
                    <thead className=" text-white" style={{backgroundColor: "hsl(218, 41%, 15%)" }}>
                      <tr>
                        <td className='text-center'>BUILDING UNIT Number</td>
                        <td className='text-center'>PERMIT PER MONTH</td>
                        { Role==="Admin"?
                        <td className='text-center'>ACTIONS</td>:''}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        buildingUnits.map((data,index)=>{
                          return <tr key={index} >
                          <td className='text-center'>{data.buildingUnits}</td>
                          <td className='text-center'>{data.parkingSlots}</td> 
                          { Role==="Admin"?
                          <td className='d-flex'>
                            <Button
                              id='buildingEditBtn' style={{border:"none"}}
                              onClick={()=>handleShowData(data)}
                            >
                              Allow More Permit
                            </Button>
                          </td>:''}
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
          <UnitModel data={showUnit} setShowUnitsModel={setShowUnitsModel} updatedUnits={updatedUnits}/>
        </Modal.Body>
             </Modal>
    </>
  )
}
