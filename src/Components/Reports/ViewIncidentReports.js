import { React, useEffect, useState } from 'react'
import NavigationBar from '../Shared-Components/Navbar'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import '../css/style.css'
import axios from 'axios';
import { API } from '../../Config/config'
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import IncidentReport from "./AddIncidentReport"


export default function ViewIncidentReports() {
    const [incidentReports, setIncidentReports] = useState([]);
    const [showIncidentReportModal, setShowIncidentReportModal] = useState(false);
    const [dataUpdated, setDataUpdated] = useState(false)
    const Updated = () => setDataUpdated(!dataUpdated);
    useEffect(() => {
        axios.get(`${API}incidentReport`)
            .then((res) => {
                setIncidentReports(res.data)
            })
    }, [dataUpdated]);
    const handleClickRemove = async (id) => {
        try {
            if (window.confirm("Delete Report Permanently?")) {
                const url = `${API}incidentReport/${id}`;
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
    const handleClickAddReport = () => {
        setShowIncidentReportModal(true)
    }
    const handleClose = () => {
        setShowIncidentReportModal(false)

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
                        <Col md={6}><p id='addReport' onClick={handleClickAddReport}>ADD SECURITY GUARD INCIDENT REPORT </p></Col>
                        <Form.Control id="searchBar"
                            type="search"
                            placeholder="Search Report By Client Name or Date"
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
                                            <td >Guard License Number</td>
                                            <td >Supervisor Name</td>
                                            <td >Supervisor License Number</td>
                                            <td >Client Address</td>
                                            <td >City</td>
                                            <td >Type Of Incident</td>
                                            <td >Date</td>
                                            <td >Remarks  &nbsp; Generate PDF  &nbsp;  Delete</td>
                                        </tr>
                                    </thead>
                                    <tbody id='tBody'>
                                        {incidentReports?.map((item, index) => {
                                            return <tr key={index}>
                                                <td>{item.guardName}</td>
                                                <td>{item.guardLicenseNumber}</td>
                                                <td>{item.supervisorName}</td>
                                                <td>{item.supervisorLicenseNumber}</td>
                                                <td>{item.clientAddress}</td>
                                                <td>{item.city}</td>
                                                <td>{item.incidentType}</td>
                                                <td>{item.date}</td>
                                                <td className='d-flex'>
                                                    <Button
                                                        id='buildingEditBtn'
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
                                                        id="buildingDeleteBtn"
                                                        onClick={() => {
                                                            handleClickRemove(item._id);
                                                        }}
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
            <Modal show={showIncidentReportModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>SECURITY GUARD INCIDENT REPORT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {showIncidentReportModal ? <IncidentReport setShowIncidentReportModal={setShowIncidentReportModal} Updated={Updated} /> : ''}
                </Modal.Body>

            </Modal>
        </>
    )
}
