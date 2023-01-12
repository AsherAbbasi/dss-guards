import { React, useEffect, useState } from 'react'
import NavigationBar from '../Shared-Components/Navbar'
import SideBar from '../Shared-Components/Dashboard-Sidebar'
import { toast } from "react-toastify";
import { API } from '../../Config/config'
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Row, Container, Col, Button } from 'react-bootstrap';
import { Sidebar } from 'react-pro-sidebar';

export default function ViewEmployees() {

  const [employeeData, setEmployeeData] = useState([])
  useEffect(() => {
    // change background color with a random color
    const color = "white";
    document.body.style.background = color;

    axios.get(`${API}employee`)
      .then((res) => {
        setEmployeeData(res.data)
      })
  }, []);
  const handleClickRemove = async (_id) => {
    try {
      if (window.confirm("Delete Data Permanently?")) {
        const url = `${API}/employee/${_id}`;
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
  return (
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
                      <td>Name</td>
                      <td>Email</td>
                      <td>Password</td>
                      <td>Assigned building</td>
                      <td>Role</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData?.map((data, index) => {
                      return <tr key={index}>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.password}</td>
                        <td>{data.buildingCode}</td>
                        <td>{data.role}</td>
                        <td className='d-flex'>
                          <Button
                            id='buildingEditBtn'
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
  )
}
