import { React, useEffect, useState } from 'react'
import NavigationBar from '../Shared-Components/Navbar'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import '../../style/style.css'
import axios from 'axios';
import { API } from '../../Config/config'
import { toast } from "react-toastify";
import SideBar from "../../Components/Shared-Components/Dashboard-Sidebar";
import { Trash3, FilePdf } from "react-bootstrap-icons";

// import Pagination from '../Shared-Components/Pagination/PaginationViewReservation'
// import jsPDF from 'jspdf'
// import Companylogo from '../images/dssguardslogo.jpeg'



export default function ParkingReservations() {
  const [showData, setShowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(8);
  const [searchValue, setSearchValue] = useState("");
  const Role = localStorage.getItem("role")
  const accessToken = localStorage.getItem('Access token')

  useEffect(() => {
    axios.get(`${API}reservation`, { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then((res) => {
        setShowData(res.data)
      })
  }, []);

  const handleClickRemove = async (id) => {
    try {
      if (window.confirm("Delete Data Permanently?")) {
        const url = `${API}/reservation/${id}`;
        await axios.delete(url).data;
        toast.success(" Deleted successfully", {
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
  const indexOfLastPost = currentPage * dataPerPage
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  const currentPost = showData.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }


  return (
    <>
      <Container fluid={true} >
        <Row>
          <Col >
            <NavigationBar />
          </Col>
        </Row>
        <Row>
          <Col md={2}><SideBar /></Col>
          <Col md={10}>
            {showData?.length ?
              <>
                <Row style={{ padding: '12px' }}>
                  <Col md={12} className="d-flex justify-content-end" id="" >
                    <Col md={6}><h5 style={{ color: "Brown", marginTop: '7px' }}>Parking Permits</h5></Col>
                    <Form.Control id="searchBar"
                      type="search"
                      placeholder="Search by Building Code, Licensed Plate Number or Date... "
                      onChange={handleChangeSearch}
                      value={searchValue}
                      className="me-2"
                      aria-label="Search"
                    />
                  </Col>
                </Row>
                <Row>
                  {/* <Col> */}
                  <Container className='tableSection'>
                    <Row className='d-flex justify-content-center align-items-center table' >
                      <Col lg={12}  >
                        <table className="table " id='tblReservation' >
                          <thead id='tHeadReservation'>
                            <tr>
                              <td>BUILDING CODE</td>
                              <td>BUILDING ADDRESS</td>
                              <td>Name</td>
                              {/* <td className='headerStyle'>Email</td> */}
                              <td>CONTACT NUMBER</td>
                              {/* <td >UNIT VISITING</td> */}
                              <td>VEHICLE Number</td>
                              {/* <td>VEHICLE COLOR</td> */}
                              {/* <td >DATE FROM</td> */}
                              {/* <td>DATE TO</td> */}
                              {/* <td >TIME FROM</td> */}
                              {/* <td >TIME TO</td> */}
                              <td>PDF</td>
                              {Role === 'Admin' ?
                                <td >DELETE</td>
                                : ''}

                            </tr>
                          </thead>
                          <tbody id='tBody' >
                            {/* Currentpost array for pagination  */}
                            {showData?.filter((value) =>
                            (value.licensedPlateNumber.toLowerCase().includes(searchValue) ||
                              value.buildingCode.toLowerCase().includes(searchValue) ||
                              value.dateFrom.toLowerCase().includes(searchValue) ||
                              value.dateTo.toLowerCase().includes(searchValue))
                            ).map((item, index) => {
                              return <tr key={index} >
                                <td className='font'>{item.buildingCode}</td>
                                <td className='font'>{item.buildingAddress}</td>
                                <td className='font'>{item.name}</td>
                                {/* <td className='font'>{item.email}</td> */}
                                <td className='font'>{item.contactNumber}</td>
                                {/* <td className='font'>{item.buildingUnits}</td> */}
                                <td className='font'> {item.licensedPlateNumber}</td>
                                {/* <td className='font'> {item.vehicleColor}</td> */}
                                {/* <td className='font'>{item.dateFrom}</td> */}
                                {/* <td className='font'>{item.dateTo}</td> */}
                                {/* <td className='font'>{item.timeFrom}</td> */}
                                {/* <td className='font'>{item.timeTo}</td> */}
                                <td>
                                  <a href={`${API}getPDF/reservation/${item._id}`}
                                    className="btn fontsizePDF" id='btnPdf'
                                    target={"_blank"}

                                  >
                                    <FilePdf style={{ fontSize: "20px" }} />
                                  </a>
                                </td>
                                {Role === "Admin" ?
                                  <td >
                                    <Button
                                      className="btn fontsizePDF" id='btn'
                                      onClick={() => {
                                        handleClickRemove(item._id);
                                      }}>
                                      <Trash3 style={{ fontSize: "20px" }} />
                                    </Button>
                                  </td>
                                  : ''}
                              </tr>
                            })}
                          </tbody>
                        </table>
                      </Col>
                    </Row>
                  </Container>
                  {/* </Col> */}

                  {/* <Pagination dataPerPage={dataPerPage} totalData={showData.length} paginate={paginate} /> */}
                </Row>
              </>
              : <><Row>

                <Col>
                  <h5 className="text-center" style={{ color: "red" }}>
                    There are currently no parking permit to show
                  </h5>
                </Col>
              </Row>

              </>
              }
          </Col>
        </Row>
      </Container>
    </>
  )
}
