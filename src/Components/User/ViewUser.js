import { React, useEffect, useState } from 'react'
import NavigationBar from '../Shared-Components/Navbar'
import SideBar from '../Shared-Components/Dashboard-Sidebar'
import { toast } from "react-toastify";
import { API } from '../../Config/config'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Row, Container, Col, Button } from 'react-bootstrap';
import UserEdit from '../Modal/EditUserModal'
import AddUser from '../User/AddUser'

export default function ViewUser() {
  const [employeeModal, setEmployeeModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false)
  const [showEmployeeData, setShowEmployeeData] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false)
  const [employeeData, setEmployeeData] = useState([])
  const employeeUpdated = () => setDataUpdated(!dataUpdated);
  const Role = localStorage.getItem("role")

  useEffect(() => {
    axios.get(`${API}auth/AllUsers`)
      .then((res) => {
        setEmployeeData(res.data)
      })
  }, [dataUpdated]);
  const handleClose = () => {
    setEmployeeModal(false);
    setAddUserModal(false);

  }
  const handleClickAdd = () => {
    setAddUserModal(true)
  }
  const handleShowData = (data) => {
    setEmployeeModal(true)
    setShowEmployeeData(data)
  };
  const handleClickRemove = async (_id) => {
    try {
      if (window.confirm("Delete Data Permanently?")) {
        const url = `${API}/auth/${_id}`;
        await axios.delete(url).data;
        toast.success("User Removed successfully", {
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
  return (
    <>
      <Container fluid={true}>
        <Row>
          <NavigationBar />
        </Row>
        <Row>
          <Col md={2} ><SideBar /></Col>
          <Col>
            <Row className='d-flex justify-content-end'>
              {Role === 'Admin' ?
                <Col md={2} ><Button id="AddbtnModel" style={{ width: '100%', marginBottom: '-12px', border: 'none', textDecoration: "underline" }} onClick={handleClickAdd}>Add New User</Button>
                </Col>
                : ''}
            </Row>
            <Container>
              {Role === 'Admin' ?
                <Row className='d-flex justify-content-center align-items-center mt-3'>
                  <Col>
                  {employeeData?.length !==0 ?
                    <table className="table" id='tbl'>
                      <thead id='tHead'>
                        <tr>
                          <td >NAME</td>
                          <td >EMAIL</td>
                          <td >PASSWORD</td>
                          <td >ROLE</td>
                          <td>ASSIGNED BUILDING</td>
                          <td >EDIT / DELETE</td>
                        </tr>
                      </thead>
                      <tbody id='tBody'>
                        {employeeData?.map((data, index) => {
                          return <tr key={index}>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.password}</td>
                            <td>{data.role}</td>
                            <td>{data.buildingCode}</td>
                            <td className='d-flex'>
                              <Button
                                id='editButton'
                                onClick={() => handleShowData(data)}
                              >
                                Edit
                              </Button>
                              &nbsp;
                              <Button
                                onClick={() => {
                                  handleClickRemove(data._id);
                                }}
                                id="deleteButton"
                              >
                                DELETE
                              </Button>
                            </td>
                          </tr>
                        })}

                      </tbody>
                    </table>
                    : <h5 className="text-center" style={{ color: "red" }}>
                    There are currently no user to show
                </h5>
                    }
                  </Col>
                </Row> :
                <Col md={12} style={{ color: 'red', backgroundColor: 'wheat' }} className="d-flex justify-content-center"> <h3>Please Login As Admin To See User Details</h3></Col>}
            </Container>
          </Col>
        </Row>
      </Container>
      <Modal show={employeeModal ? employeeModal : addUserModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {employeeModal ? <UserEdit data={showEmployeeData} setEmployeeModal={setEmployeeModal} employeeUpdated={employeeUpdated} /> : ''}
          {addUserModal ? <AddUser setAddUserModal={setAddUserModal} employeeUpdated={employeeUpdated} /> : ''}


        </Modal.Body>
      </Modal>
    </>
  )
}
