import {React,useEffect, useState} from 'react'
import NavigationBar from './Navbar'
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
    // change background color with a random color
    const color = "white";
    document.body.style.background = color;
  }, [unitsUpdated]);
  return (
    <>
    <Container fluid={true}>
    <Row>
        <NavigationBar />
      </Row>
          <Row>
          <p id="text">Building Units of building {buildingCode} </p>
          <Container>
              <Row className='d-flex justify-content-center align-items-center'>
                <Col>
                  <table className="table table-bordered" id='tbl'>
                    <thead className=" text-white" style={{ backgroundColor: "brown" }}>
                      <tr>
                        <td>BUILDING UNIT Number</td>
                        <td>PARKING SLOTS</td>
                        <td>ACTIONS</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        buildingUnits.map((data,index)=>{
                          return <tr key={index} >
                          <td>{data.buildingUnits}</td>
                          <td>{data.parkingSlots}</td>

                          <td className='d-flex'>
                            <Button
                              id='buildingEditBtn' style={{border:"none"}}
                              onClick={()=>handleShowData(data)}
                            >
                              Allow More Parking Slots
                            </Button>
                          </td>
                        </tr>
                        })
                      }
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Container>
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
