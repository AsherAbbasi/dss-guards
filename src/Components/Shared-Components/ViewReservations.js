import { React, useEffect, useState } from 'react'
import NavigationBar from './Navbar'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import '../css/style.css'
import axios from 'axios';
import { API } from '../../Config/config'
import { toast } from "react-toastify";
// import Pagination from '../Shared-Components/Pagination/PaginationViewReservation'
import jsPDF from 'jspdf'
import Companylogo from '../images/dssguardslogo.jpeg'



export default function ParkingReservations() {


  const [showData, setShowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(8);
  const [searchValue, setSearchValue] = useState("");
  const Role = localStorage.getItem("role")
  const accessToken=localStorage.getItem('Access token')

  useEffect(() => {
    axios.get(`${API}reservation` , { headers: {"Authorization" : `Bearer ${accessToken}`} })
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

  const exportPDF = async (index) => {
    const pdfData = showData.filter(item => item._id === index);
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    const loadImage = () => {
      return new Promise((resolve) => {
        let img = new Image();
        img.src = Companylogo;
        img.onload = () => resolve(img);
      })
    };
    function footer(){ 
      doc.text(300,580, 'https://dssguards.com/');
    };
    const logo = await loadImage();
    doc.addImage(logo, 'jpeg', 290, 20, 0, 50);
    doc.setFontSize(15);
    const title = "Parking Reservation Report";
    const headers = [["NAME", "Email", "BUILDING CODE", "BUILDING ADDRESS", "CONTACT", "UNIT VISITING", "LICENSE PLATE", "VEHICLE COLOR", "DATE FROM", "DATE TO", "TIME FORM", "TIME TO"]];
    const data = pdfData.map(pdf => [pdf.name, pdf.email, pdf.buildingCode, pdf.buildingAddress, pdf.contactNumber, pdf.buildingUnits, pdf.licensedPlateNumber, pdf.vehicleColor, pdf.dateFrom, pdf.dateTo, pdf.timeFrom, pdf.timeTo]);
    let content = {
      startY: 160,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 120);
    doc.autoTable(content);
    footer();
    doc.save("Parking Reservation Report.pdf")
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
                      <td className='headerStyle text-center'>BUILDING CODE</td>
                      <td className='headerStyle text-center'>BUILDING ADDRESS</td>
                      <td className='headerStyle text-center'>Name</td>
                      {/* <td className='headerStyle'>Email</td> */}
                      <td className='headerStyle text-center'>CONTACT NUMBER</td>
                      <td className='headerStyle text-center'>UNIT VISITING</td>
                      <td className='headerStyle text-center'>VEHICLE DETAIL</td>
                      <td className='headerStyle text-center'>DATE FROM</td>
                      <td className='headerStyle text-center'>DATE TO</td>
                      <td className='headerStyle text-center'>TIME FROM</td>
                      <td className='headerStyle text-center'>TIME TO</td>
                      {Role === 'Admin' ?
                        <td className='headerStyle text-center'>DELETE</td>
                        : ''}
                      <td className='headerStyle text-center'>DOWNLOAD</td>
                    </tr>
                  </thead>
                  <tbody className='tableBody'>
                    {/* Currentpost array for pagination  */}
                    {showData?.filter((value) =>
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
                          <p className='d-flex m-0 '><p style={{ color: "gray", fontWeight: "600", margin: "0px" }}> Number:</p>{item.licensedPlateNumber}</p>
                          <p className='d-flex m-0'><p style={{ color: "gray", fontWeight: "600", margin: "0px" }}>Color:</p>{item.vehicleColor}</p>
                          <p className='d-flex m-0'><p style={{ color: "gray", fontWeight: "600", margin: "0px" }}> Make:</p>{item.Make}</p>
                        </td>
                        <td className='font'>{item.dateFrom}</td>
                        <td className='font'>{item.dateTo}</td>
                        <td className='font'>{item.timeFrom}</td>
                        <td className='font'>{item.timeTo}</td>
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
                          <Button
                            className="btn fontsizePDF" id='btnPdf'
                            onClick={() => exportPDF(item._id)}
                          >
                            Generate PDF
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

          {/* <Pagination dataPerPage={dataPerPage} totalData={showData.length} paginate={paginate} /> */}
        </Row>
      </Container>
    </>
  )
}
