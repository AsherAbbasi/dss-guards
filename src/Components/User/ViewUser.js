import { React, useEffect, useState } from 'react'
import NavigationBar from '../Shared-Components/Navbar'
import SideBar from '../Shared-Components/Dashboard-Sidebar'
import { toast } from "react-toastify";
import { API } from '../../Config/config'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Row, Container, Col, Button } from 'react-bootstrap';
import UserEdit from '../Modal/EditUserModal'

export default function ViewEmployees() {
  const [employeeModal, setEmployeeModal] = useState(false);
  const [showEmployeeData, setShowEmployeeData] = useState(false);
  const [dataUpdated, setDataUpdated]=useState(false)
  const [employeeData, setEmployeeData] = useState([])
  const employeeUpdated = () => setDataUpdated(!dataUpdated);
  useEffect(() => {
    axios.get(`${API}auth/AllUsers`)
      .then((res) => {
        setEmployeeData(res.data)
      })
  }, [dataUpdated]);
  const handleClose = () => setEmployeeModal(false);
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
          <Container>
            <Row className='d-flex justify-content-center align-items-center mt-3'>
              <Col>
                <table className="table table-bordered" id='tbl'>
                  <thead className=" text-white" style={{ backgroundColor: "brown" }}>
                    <tr>
                      <td className='text-center headerUser'>NAME</td>
                      <td className='text-center headerUser'>EMAIL</td>
                      <td className='text-center headerUser'>PASSWORD</td>
                      <td className='text-center headerUser'>ROLE</td>
                      <td className='text-center headerUser'>ASSIGNED BUILDING</td>
                      <td className='text-center headerUser'>EDIT / DELETE</td>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData?.map((data, index) => {
                      return <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.password}</td>
                        <td>{data.role}</td>
                        <td>{data.buildingCode}</td>
                        <td className='d-flex'>
                          <Button
                            id='buildingEditBtn'
                            onClick={()=>handleShowData(data)}
                          >
                            Edit
                          </Button>
                          &nbsp;
                          <Button
                            onClick={() => {
                              handleClickRemove(data._id);
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
    <Modal show={employeeModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Update Employee Data</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <UserEdit data={showEmployeeData} setEmployeeModal={setEmployeeModal} employeeUpdated={employeeUpdated}/>
    </Modal.Body>
         </Modal>
         </>
  )
}
