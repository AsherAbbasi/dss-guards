import { React, useEffect, useState } from 'react'
import NavigationBar from '../Shared-Components/Navbar'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import '../css/style.css'
import axios from 'axios';
import { API } from '../../Config/config'
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import EditDailyReportModel from '../Modal/EditDailyReportModal';
import DailyReportModel from './AddDailyReport'

export default function ViewDailyReport() {
  const [searchValue, setSearchValue] = useState("");
  const [dailyReports, setDailyReports] = useState([]);
  const [showEditModel,setShowEditModel]=useState(false);
  const [showDailyReportModel,setShowDailyReportModel]=useState(false);
  const [dailyReportData, setDailyReportData]=useState({});
  const [dataUpdated, setDataUpdated] = useState(false)
  const Updated = () => setDataUpdated(!dataUpdated);

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value)
  }
  useEffect(() => {
    axios.get(`${API}dailyReport`)
      .then((res) => {
        setDailyReports(res.data)
      })
  }, [dataUpdated]);
  const handleClickRemarks=(item)=>{
    setShowEditModel(true)
    setShowDailyReportModel(false)
    setDailyReportData(item);
  }
  const handleClose = () =>{
    setShowEditModel(false)
    setShowDailyReportModel(false)
  }
  const handleClickAddReport=()=>{
    setShowDailyReportModel(true)
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
            <Col md={6}><p id='addReport' onClick={handleClickAddReport}>ADD SECURITY GUARD DAILY OCCURENCE REPORT </p></Col>
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
                  <thead id='tHead'>
                    <tr>
                      <td >Guard Name</td>
                      <td >License Number</td>
                      <td >Client Name</td>
                      <td >Client Address</td>
                      <td >City</td>
                      <td >Date</td>
                      <td >Remarks  &nbsp; Generate PDF  &nbsp;  Delete</td>
                    </tr>
                  </thead>
                  <tbody id='tBody'>
                    {dailyReports?.filter((value)=>(
                     value.clientName.toLowerCase().includes(searchValue) ||
                     value.date.toLowerCase().includes(searchValue)))
                    .map((item, index) => {
                      return <tr key={index}>
                        <td >{item.guardName}</td>
                        <td>{item.licenseNumber}</td>
                        <td >{item.clientName}</td>
                        <td >{item.clientAddress}</td>
                        <td>{item.city}</td>
                        <td >{item.date}</td>
                        <td className='d-flex'>
                                <Button
                                  id='buildingEditBtn'  
                                  onClick={() => handleClickRemarks(item)}
                                >
                                  Remarks
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
      <Modal show={showEditModel ? showEditModel : showDailyReportModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Daily Occurance Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {showEditModel ? <EditDailyReportModel dailyReportData={dailyReportData} setShowEditModel={setShowEditModel}/>:''}
        {showDailyReportModel ? <DailyReportModel  setShowDailyReportModel={setShowDailyReportModel} Updated={Updated}/>:''}

        </Modal.Body>
       
      </Modal>
    </>
  )
}
