import { React, useEffect, useState } from 'react'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import DashboardSideBar from '../Shared-Components/Dashboard-Sidebar'
import NavigationBar from '../Shared-Components/Navbar'
import axios from 'axios';
import '../css/style.css'
import { toast } from "react-toastify";
import { API } from '../../Config/config'
import Modal from 'react-bootstrap/Modal';
import ModalForm from '../Modal/EditBuildingModal'
import Units from './BuildingUnits'
import Buildings from './AddBuildings';

export default function ViewBuildings() {

  const [showEditModel, setShowEditModel] = useState(false)
  const [showUnitModel, setShowUnitModel] = useState(false)
  const [addBuildingModal, setAddBuildingModal] = useState(false)

  const [showBuildings, setShowBuildings] = useState();
  const [buildingData, setBuildingData] = useState({})
  const [buildingCode, setBuildingCode] = useState([])
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

  const handleClickViewAll = (item) => {
    setshowUnit(true);
    setShowEditModel(false)
    setShowUnitModel(true)
    setBuildingCode(item.buildingCode);


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
      {showUnit ? <Units buildingCode={buildingCode} /> :
        <>
          <Container fluid={true}>
            <Row>
              <NavigationBar />
            </Row>
            <Row>
              <Col md={2} ><DashboardSideBar /></Col>
              <Col >
                <Row style={{ backgroundColor: '#fbfbfb', padding: '12px', marginBottom: '-12px' }}>
                  <Col md={12} className="d-flex justify-content-end" id="" >
                    {Role === 'Admin' ?
                      <Col md={6}><p style={{ color: "black", marginTop: '17px' }}><Button id="AddbtnModel" onClick={handleClickAdd}>Add New Building</Button></p>
                      </Col> : ''}
                    <Form.Control id="searchBar"
                      type="search"
                      placeholder="Search Building By Code OR Address"
                      onChange={handleChangeSearch}
                      value={searchValue}
                      className="me-2"
                      aria-label="Search"
                    />
                  </Col>

                </Row>
                <Container>
                  <Row className='d-flex justify-content-center align-items-center'>
                    <Col id="buildingTable" lg={2} md={4} >
                      <table className="table table-bordered" id='tbl'>
                        <thead id='tHead'>
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
                                <td>{item.buildingCode ? item.buildingCode : ""}</td>
                                <td>{item.buildingAddress}</td>
                                <div >
                                  <Button id='ViewUnits' onClick={() => handleClickViewAll(item)}>
                                    View All

                                  </Button>
                                </div>
                                <td className='text-center'>{item.parkingSlots}</td>

                                {Role === 'Admin' ?
                                  <td className='d-flex'>
                                    <>
                                      <Button
                                        id='buildingEditBtn' onClick={() => handleClickEdit(item)}
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
                                    </>

                                  </td> : ''
                                }
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
      }
    </>
  )
}
