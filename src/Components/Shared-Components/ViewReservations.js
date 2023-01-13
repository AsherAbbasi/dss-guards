import { React, useEffect, useState } from 'react'
import NavigationBar from './Navbar'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import '../css/responsive.css'
import axios from 'axios';
import { API } from '../../Config/config'
import { toast } from "react-toastify";
import Pagination from '../Shared-Components/Pagination/PaginationViewReservation'
// import jsPDF from 'jspdf'



export default function ParkingReservations() {


  const [showData, setShowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(8);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    axios.get(`${API}reservation`)
      .then((res) => {
        setShowData(res.data)
      })
    // change background color with a random color
    const color = "white";
    document.body.style.background = color;
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
  // pdf //
  //   const onButtonClick = () => {

  //     var doc=new jsPDF('p','pt')
  //       doc.text(20,20,'Employee detail','center')
  //       doc.setFont("courier")
  //       doc.setFontSize(18)
  //       let data=doc.text(20,30,"showData")
  //       console.log(data)
  //     //   doc.save('generated.pdf')

  // }
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
          <Col md={12} className="d-flex justify-content-end" id="searchSection" >
            <Form.Control id="searchBar"
              type="search"
              placeholder="Search Parking Permit by Building Code, Licensed Plate Number or Date "
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
                <table className="table table-bordered" id='tbl'>
                  <thead className=" text-white" style={{ backgroundColor: "hsl(218, 41%, 15%)" }}>
                    <tr>
                      <td className='headerStyle'>BUILDING CODE</td>
                      <td className='headerStyle'>BUILDING ADDRESS</td>
                      <td className='headerStyle'>Name</td>
                      {/* <td className='headerStyle'>Email</td> */}
                      <td className='headerStyle'>CONTACT NUMBER</td>
                      <td className='headerStyle'>UNIT VISITING</td>
                      <td className='headerStyle'>VEHICLE DETAIL</td>
                      <td className='headerStyle'>DATE FROM</td>
                      <td className='headerStyle'>DATE TO</td>
                      <td className='headerStyle'>TIME FROM</td>
                      <td className='headerStyle'>TIME TO</td>
                      <td className='headerStyle'>ACTIONS</td>
                    </tr>
                  </thead>
                  <tbody className='tableBody'>
                    {currentPost?.filter((value) =>
                    (value.licensedPlateNumber.toLowerCase().includes(searchValue) ||
                      value.buildingCode.toLowerCase().includes(searchValue) ||
                      value.dateFrom.toLowerCase().includes(searchValue) ||
                      value.dateTo.toLowerCase().includes(searchValue))
                    ).map(item => {
                      return <tr >
                        <td className='font'>{item.buildingCode}</td>
                        <td className='font'>{item.buildingAddress}</td>
                        <td className='font'>{item.name}</td>
                        {/* <td className='font'>{item.email}</td> */}
                        <td className='font'>{item.contactNumber}</td>
                        <td className='font'>{item.buildingUnits}</td>
                        <td className='font'>
                          <p className='d-flex m-0 border-bottom'><p style={{ color: "brown", fontWeight: "600", margin: "0px" }}> Number:</p>{item.licensedPlateNumber}</p>
                          <p className='d-flex m-0 border-bottom'><p style={{ color: "brown", fontWeight: "600", margin: "0px" }}>Color:</p>{item.vehicleColor}</p>
                          <p className='d-flex m-0'><p style={{ color: "brown", fontWeight: "600", margin: "0px" }}> Make:</p>{item.Make}</p>
                        </td>
                        <td className='font'>{item.dateFrom}</td>
                        <td className='font'>{item.dateTo}</td>
                        <td className='font'>{item.timeFrom}</td>
                        <td className='font'>{item.timeTo}</td>

                        <td className='d-flex'>
                          {/* <Button
                                className="btn btn-success m-1"
                                 onClick={onButtonClick}>
                                Download
                              </Button> */}
                          <Button
                            className="btn " id='btn'
                            onClick={() => {
                              handleClickRemove(item._id);
                            }}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    })}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Container>
          {/* </Col> */}

          <Pagination dataPerPage={dataPerPage} totalData={showData.length} paginate={paginate} />
        </Row>
      </Container>
    </>
  )
}
