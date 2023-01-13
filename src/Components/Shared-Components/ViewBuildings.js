import { React, useEffect, useState } from 'react'
import { Row, Container, Col, Button } from 'react-bootstrap';
import DashboardSideBar from './Dashboard-Sidebar'
import NavigationBar from './Navbar'
import axios from 'axios';
import '../css/responsive.css'
import { toast } from "react-toastify";
import { API } from '../../Config/config'
import Modal from 'react-bootstrap/Modal';
import ModalForm from '../Shared-Components/Modal/EditBuildingModal'
import Units from '../Shared-Components/BuildingUnits'
import { useNavigate } from 'react-router-dom';

export default function ViewBuildings() {
  const navigate = useNavigate();

  const [showEditModel,setShowEditModel]=useState(false)
  const [showUnitModel,setShowUnitModel]=useState(false)
  const [showBuildings, setShowBuildings] = useState([]);
  const [buildingData, setBuildingData]=useState({})
  const [buildingCode, setBuildingCode]=useState([])
  const [dataUpdated, setDataUpdated]=useState(false)
  const [showUnit, setshowUnit]=useState(false)

  const buildingUpdated = () => setDataUpdated(!dataUpdated);

  const styles = {
    column: {
      // boxShadow: "1px 2px 3px 1px #949188",
      backgroundColor: "white",
      // borderRadius: 12,
      padding: "25px",
      width: "100%",
      marginTop: "20px"
    },
  }
  const { column } = styles;
  const accessToken=localStorage.getItem('Access token')
  useEffect(() => {
    
    axios.get(`${API}building`, { headers: {"Authorization" : `Bearer ${accessToken}`} })
      .then((res) => {
        setShowBuildings(res.data)
      })
    // change background color with a random color
    const color = "white";
    document.body.style.background = color;
  }, [dataUpdated]);
  const handleClickRemove = async (buildingCode) => {
    try {
      if (window.confirm("Delete Data Permanently?")) {
        const url = `${API}/building/` + buildingCode;
        await axios.delete(url).data;
        toast.success("Building Added successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        window.location.reload()
      }

    } catch (error) {
      toast.error(`${error.response.data}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
      });
    }
  }
 
 const handleClickViewAll=(item)=>{
  setshowUnit(true);
  setShowEditModel(false)
    setShowUnitModel(true)
    setBuildingCode(item.buildingCode);
    

 }
  const handleClickEdit=(item)=>{
    setShowEditModel(true)
    setShowUnitModel(false)
    setBuildingData(item);
  }
  const handleClose = () =>{
    setShowEditModel(false)
    setShowUnitModel(false)
  }

  return (
    <>
    {showUnit ? <Units buildingCode={buildingCode}/> :
    <>
      <Container fluid={true}>
        <Row>
          <NavigationBar />
        </Row>
        <Row>
          <Col md={2} ><DashboardSideBar /></Col>
          <Col>
            <Container>
              <Row className='d-flex justify-content-center align-items-center'>
                <Col style={column} lg={2} md={4} >
                  <table className="table table-bordered" id='tbl'>
                    <thead className=" text-white" style={{ backgroundColor: "brown" }}>
                      <tr>
                        <td>BUILDING CODE</td>
                        <td>BUILDING ADDRESS</td>
                        <td>TOTAL UNITS</td>
                        <td>PARKING SLOTS</td>
                        <td>ACTIONS</td>
                      </tr>
                    </thead>
                    <tbody>
                      {showBuildings?.map((item, index) => {
                        return <tr key={index}>
                          <td>{item.buildingCode ? item.buildingCode : 2}</td>
                          <td>{item.buildingAddress}</td>
                          <div className='d-flex justify-content-center'>
                            <td>{item.buildingUnits.length}</td>
                            <Button id='ViewUnits' onClick={()=>handleClickViewAll(item)}>
                              View All

                            </Button>
                          </div>
                          <td>{item.parkingSlots}</td>

                          <td className='d-flex'>
                            <Button
                              id='buildingEditBtn' onClick={()=>handleClickEdit(item)}
                            >
                              EDIT
                            </Button>
                            &nbsp;
                            <Button
                              onClick={() => {
                                handleClickRemove(item.buildingCode);
                              }}
                              id="buildingDeleteBtn"
                            >
                              DELETE
                            </Button>

                          </td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
      <Modal show={showEditModel ? showEditModel: showUnitModel} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Building Units</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        { showEditModel ? <ModalForm bData={buildingData} setShowEditModel={setShowEditModel} buildingUpdated={buildingUpdated} />: ''}
        {/* { showUnitModel ? <Units data={buildingUnits} /> : ''} */}
        </Modal.Body>
       
      </Modal>
    </>
  }
  </>
  )
}
