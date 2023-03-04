import { React, useEffect, useState } from 'react'
import NavigationBar from '../Shared-Components/Navbar'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import '../../style/style.css'
import axios from 'axios';
import { API } from '../../Config/config'
import { toast } from "react-toastify";
import SideBar from "../../Components/Shared-Components/Dashboard-Sidebar"
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

  // const exportPDF = async (index) => {
  //   const pdfData = showData.filter(item => item._id === index);
  //   const unit = "pt";
  //   const size = "A4";
  //   const orientation = "landscape";
  //   const marginLeft = 40;
  //   const doc = new jsPDF(orientation, unit, size);
  //   const loadImage = () => {
  //     return new Promise((resolve) => {
  //       let img = new Image();
  //       img.src = Companylogo;
  //       img.onload = () => resolve(img);
  //     })
  //   };
  //   function footer(){ 
  //     doc.text(300,580, 'https://dssguards.com/');
  //   };
  //   const logo = await loadImage();
  //   doc.addImage(logo, 'jpeg', 290, 20, 0, 50);
  //   doc.setFontSize(15);
  //   const title = "Parking Reservation Report";
  //   const headers = [["NAME", "Email", "BUILDING CODE", "BUILDING ADDRESS", "CONTACT", "UNIT VISITING", "LICENSE PLATE", "VEHICLE COLOR", "DATE FROM", "DATE TO", "TIME FORM", "TIME TO"]];
  //   const data = pdfData.map(pdf => [pdf.name, pdf.email, pdf.buildingCode, pdf.buildingAddress, pdf.contactNumber, pdf.buildingUnits, pdf.licensedPlateNumber, pdf.vehicleColor, pdf.dateFrom, pdf.dateTo, pdf.timeFrom, pdf.timeTo]);
  //   let content = {
  //     startY: 160,
  //     head: headers,
  //     body: data,
  //   };

  //   doc.text(title, marginLeft, 120);
  //   doc.autoTable(content);
  //   footer();
  //   doc.save("Parking Reservation Report.pdf")
  // }
  return (
    <>
      <Container fluid={true} >
        <Row>
          <Col >
            <NavigationBar />
          </Col>
        </Row>
        {showData?.length !== 0 ?
          <>
            <Row style={{ padding: '12px' }}>
              <Col md={12} className="d-flex justify-content-end" id="" >
                <Col md={6}><h5 style={{ color: "Brown", marginTop: '7px' }}>Parking Permits</h5></Col>
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
                          {Role === 'Admin' ?
                            <td >DELETE</td>
                            : ''}
                          <td>DOWNLOAD</td>
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
                            {Role === "Admin" ?
                              <td >
                                <Button
                                  className="btn fontsizePDF" id='btn'
                                  onClick={() => {
                                    handleClickRemove(item._id);
                                  }}>
                                  Delete
                                </Button>
                              </td>
                              : ''}
                            <td>
                              <a href={`${API}getPDF/reservation/${item._id}`}
                                className="btn fontsizePDF" id='btnPdf'
                                target={"_blank"}

                              >
                                Generate PDF
                              </a>
                            </td>
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
            <Col md={2} ><SideBar /></Col>
            <Col>
              <h5 className="text-center" style={{ color: "red" }}>
                There are currently no parking permit to show
              </h5>
            </Col>
          </Row>

          </>}
      </Container>
    </>
  )
}
