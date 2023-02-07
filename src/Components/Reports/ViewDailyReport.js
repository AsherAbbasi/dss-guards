import { React, useEffect, useState } from 'react'
import NavigationBar from '../Shared-Components/Navbar'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import '../css/style.css'
import axios from 'axios';
import { API } from '../../Config/config'
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import DailyReportModel from '../Modal/dailyReportModal';


export default function ViewDailyReport() {
  const [searchValue, setSearchValue] = useState("");
  const [dailyReports, setDailyReports] = useState([]);
  const [showEditModel,setShowEditModel]=useState(false);
  const [showDailyReportModel,setShowDailyReportModel]=useState(false);
  const [dailyReportData, setDailyReportData]=useState({})
  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }
  useEffect(() => {
    axios.get(`${API}dailyReport`)
      .then((res) => {
        setDailyReports(res.data)
      })
  }, []);
  const handleClickEdit=(item)=>{
    setShowEditModel(true)
    setShowDailyReportModel(false)
    setDailyReportData(item);
  }
  const handleClose = () =>{
    setShowEditModel(false)
    setShowDailyReportModel(false)
  }
  const handleClickRemove = async (id) => {
    try {
      if (window.confirm("Delete Report Permanently?")) {
        const url = `${API}dailyReport/${id}`;
        await axios.delete(url).data;
        toast.success("Report Deleted Successfully", {
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
      <Container fluid={true} >
        <Row>
          <Col >
            <NavigationBar />
          </Col>
        </Row>
        <Row style={{ backgroundColor: '#f0f1f2', padding: '12px' }}>
          <Col md={12} className="d-flex justify-content-end" id="" >
            <Col md={6}><h5>SECURITY GUARD DAILY OCCURENCE REPORT </h5></Col>
            <Form.Control id="searchBar"
              type="search"
              placeholder="Search Report By Client Name or Date"
              onChange={handleChangeSearch}
              value={searchValue}
              className="me-2"
              aria-label="Search"
            />
          </Col>

        </Row>
        <Row>
          <Container>
            <Row className='d-flex justify-content-center align-items-center'>
              <Col id="TicketTable" lg={2} md={4} >
                <table className="table table-bordered" id='tbl'>
                  <thead className=" text-white" style={{ backgroundColor: "brown" }}>
                    <tr>
                      <td className='headerStyle text-center'>Guard Name</td>
                      <td className='headerStyle text-center'>License Number</td>
                      <td className='headerStyle text-center'>Client Name</td>
                      <td className='headerStyle text-center'>Client Address</td>
                      <td className='headerStyle text-center'>City</td>
                      <td className='headerStyle text-center'>Date</td>
                      <td className='headerStyle text-center'>Edit/Generate PDF/Delete</td>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyReports?.filter((value)=>(
                     value.clientName.toLowerCase().includes(searchValue) ||
                     value.date.toLowerCase().includes(searchValue)))
                    .map((item, index) => {
                      return <tr key={index}>
                        <td className='font'>{item.guardName}</td>
                        <td className='font'>{item.licenseNumber}</td>
                        <td className='font'>{item.clientName}</td>
                        <td className='font'>{item.clientAddress}</td>
                        <td className='font'>{item.city}</td>
                        <td className='font'>{item.date}</td>
                        <td className='d-flex'>
                                <Button
                                  id='buildingEditBtn'  
                                  onClick={() => handleClickEdit(item)}
                                >
                                  EDIT
                                </Button>
                                &nbsp;
                                <a
                            // href={`${API}getPDF/ticket/${item._id}`}
                            //     className="btn fontsizePDF" 
                            //     target={"_blank"}
                           id="pdfReports"
                          >
                            Generate PDF
                          </a>
                                &nbsp;
                                <Button
                                onClick={() => {
                                  handleClickRemove(item._id);
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
        </Row>
      </Container>
      <Modal show={showEditModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Daily Occurance Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {showEditModel ? <DailyReportModel dailyReportData={dailyReportData} setShowEditModel={setShowEditModel}/>:''}
        </Modal.Body>
       
      </Modal>
    </>
  )
}
