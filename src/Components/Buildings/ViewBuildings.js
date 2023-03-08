import { React, useEffect, useState} from 'react'
import { Row, Container, Col, Button, Form, } from 'react-bootstrap';
import DashboardSideBar from '../Shared-Components/Dashboard-Sidebar'
import NavigationBar from '../Shared-Components/Navbar'
import axios from 'axios';
import '../../style/style.css'
import { toast } from "react-toastify";
import { API } from '../../Config/config'
import Modal from 'react-bootstrap/Modal';
import ModalForm from '../Modal/EditBuildingModal'
import BuildingUnits from './BuildingUnits'
import Buildings from './AddBuildings';
import { Trash3,PencilSquare } from "react-bootstrap-icons";
import {redirect, useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";


export default function ViewBuildings() {
  const navigate = useNavigate();
  const [showEditModel, setShowEditModel] = useState(false)
  const [showUnitModel, setShowUnitModel] = useState(false)
  const [addBuildingModal, setAddBuildingModal] = useState(false)
  const [showBuildings, setShowBuildings] = useState([]);
  const [buildingData, setBuildingData] = useState({})
  const [buildingCode, setBuildingCode] = useState('')
  const [dataUpdated, setDataUpdated] = useState(false)
  const [showUnit, setshowUnit] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  
  
  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }
  const buildingUpdated = () => setDataUpdated(!dataUpdated);
  const accessToken = localStorage.getItem('Access token')
  const Role = localStorage.getItem("role")

  useEffect(() => {
    axios.get(`${API}building`, { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then((res) => {
        setShowBuildings(res.data)
      })
  }, [dataUpdated]);
  const handleClickRemove = async (buildingCode) => {
    try {
      if (window.confirm("Delete Data Permanently?")) {
        const url = `${API}building/` + buildingCode;
        await axios.delete(url).data;
        toast.success("Building deleted successfully", {
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


  const handleClickViewAll = (code) => {
    setshowUnit(true);
    setShowEditModel(false)
    setShowUnitModel(true)
    setBuildingCode(code);    
  }

  const handleClickEdit = (item) => {
    setShowEditModel(true)
    setShowUnitModel(false)
    setBuildingData(item);
  }
  const handleClose = () => {
    setShowEditModel(false)
    setShowUnitModel(false)
    setAddBuildingModal(false)
  }
  const handleClickAdd = () => {
    setAddBuildingModal(true)
  }
  return (
    <>
        <>
          <Container fluid={true}>
            <Row>
              <NavigationBar />
            </Row>
            <Row>
              <Col md={2} ><DashboardSideBar /></Col>
              <Col >
              {showUnit ? <BuildingUnits buildingCode={buildingCode}/> : 
                <>
                <Row style={{ padding: '12px', marginBottom: '-12px' }}>
                  {showBuildings?.length !== 0 ?
                    <Col md={8} className="d-flex justify-content-end">
                      <Form.Control id="searchBar"
                        type="search"
                        placeholder="Search Building By Code OR Address"
                        onChange={handleChangeSearch}
                        value={searchValue}
                        className="me-2 w-75"
                        aria-label="Search"
                      /> </Col> : ""}
                  <Col md={4} className="d-flex justify-content-end" id="" >
                    {Role === 'Admin' ?
                      <Col md={6} ><p style={{ color: "black", marginTop: '' }}>
                        <Button id="AddbtnModel" onClick={handleClickAdd} style={{ width: '100%', marginBottom: '-12px', border: 'none', textDecoration: "underline" }} >Add New Building</Button></p>
                      </Col> : ''}
                  </Col>
                </Row>
                <Container>
                  <Row className='d-flex justify-content-center align-items-center'>
                    <Col id="table" lg={2} md={4}>
                      {showBuildings?.length ?
                        <table className="table table-bordered" id='tbl'>
                          <thead id='tHeadReservation'>
                            <tr>
                              <td >BUILDING CODE</td>
                              <td >BUILDING ADDRESS</td>
                              <td >TOTAL UNITS</td>
                              <td >PARKING SLOTS</td>
                              {Role === 'Admin' ? <td >EDIT / DELETE</td> : ''}
                            </tr>
                          </thead>
                          <tbody id='tBody'>
                            {showBuildings?.filter((value) => (
                              value.buildingCode.toLowerCase().includes(searchValue) ||
                              value.buildingAddress.toLowerCase().includes(searchValue)))
                              .map((item, index) => {
                                return <tr key={index}>
                                  <td className='font'>{item.buildingCode ? item.buildingCode : ""}</td>
                                  <td className='font'>{item.buildingAddress}</td>
                                  <div >
                                    <Button id='ViewUnits' href='app/buildingUnits' className='font' onClick={() => handleClickViewAll(item)}>
                                      View All
                                    </Button>
                             
                              </div>
                              <td className='font'>{item.parkingSlots}</td>

                              {Role === 'Admin' ?
                                <td className='d-flex'>
                                  <>
                                    <Button
                                      id='editButton' onClick={() => handleClickEdit(item)}
                                    >
                                      <PencilSquare style={{fontSize:"20px"}}/>
                                    </Button>
                                    &nbsp;
                                    <Button
                                      onClick={() => {
                                        handleClickRemove(item.buildingCode);
                                      }}
                                      id="deleteButton"
                                    >
                                      <Trash3 style={{fontSize:"20px"}}/>
                                    </Button>
                                  </>

                                </td> : ''
                              }
                            </tr>
                          })}
                      </tbody>
                    </table>
                    : <h5 className="text-center" style={{ color: "red" }}>
                      There are currently no building to show
                    </h5>
                  }
                </Col>
                </Row>   
                </Container> 
                </>
                            }           
              </Col>

            </Row>
          </Container>
          <Modal show={showEditModel ? showEditModel : addBuildingModal} onHide={handleClose} >
            <Modal.Header closeButton>
              <Modal.Title >Add New Building</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {showEditModel ? <ModalForm bData={buildingData} setShowEditModel={setShowEditModel} buildingUpdated={buildingUpdated} /> : ''}
              {addBuildingModal ? <Buildings setAddBuildingModal={setAddBuildingModal} buildingUpdated={buildingUpdated} /> : ''}
              
            </Modal.Body>

          </Modal>
        </>
      
    </>
  )
}
