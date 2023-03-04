import { React, useEffect, useState } from 'react'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
// import DashboardSideBar from './Dashboard-Sidebar'
import NavigationBar from '../Shared-Components/Navbar'
import axios from 'axios';
import '../../style/style.css'
import { toast } from "react-toastify";
import { API } from '../../Config/config'
import Modal from 'react-bootstrap/Modal';
import AddTicket from './AddTicket'
import SideBar from '../../Components/Shared-Components/Dashboard-Sidebar'

export default function ViewTicket() {
    const [searchValue, setSearchValue] = useState("");
    const [ticketModal, setTicketModal] = useState(false);
    //   const [ticket, setTicket] = useState(false)

    const handleChangeSearch = (e) => {
        setSearchValue(e.target.value)
    }
    const [ticketData, setTicketData] = useState([])
    const accessToken = localStorage.getItem('Access token')
    const Role = localStorage.getItem("role")
    // const ticketShow = () => setTicket(!ticket);
    useEffect(() => {
        axios.get(`${API}ticket`, { headers: { "Authorization": `Bearer ${accessToken}` } })
            .then((res) => {
                setTicketData(res.data)
            })
    }, []);
    const handleClickRemove = async (_id) => {
        try {
            if (window.confirm("Delete Data Permanently?")) {
                const url = `${API}ticket/${_id}`;
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
    // const pdfMaker = async (id) => {
    // try {
    //       const url = `${API}getPDF/${id}`;
    //       await axios.get(url).data;
    //       toast.success("PDF Downloaded Successfully", {
    //         position: toast.POSITION.TOP_RIGHT,
    //         autoClose: 2500,

    //     })

    //   } catch (error) {
    //     toast.error(`Something went wrong! please try later`, {
    //       position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 2500,
    //     });
    //   }

    // }
    const handleClickAddTicket = () => {
        setTicketModal(true)
    }
    const handleClose = () => {
        setTicketModal(false)
    }
    return (
        <>
            <Container fluid={true}>
               
                <Row>
                    <NavigationBar />
                </Row>
                {ticketData?.length !==0 ?
                 <>
                <Row style={{  padding: '12px' }}>
                    <Col md={2} ><Button id="AddbtnModel" style={{ width: '100%', border: 'none', textDecoration: "underline" }} onClick={handleClickAddTicket} >Add New Ticket</Button>
                    </Col>
                    <Col md={10} className="d-flex justify-content-end" id="" >
                        <Form.Control id="searchBar"
                            type="search"
                            placeholder="Search Ticket By Licensed Plate Number OR Date"
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
                                <table className="table" id='tbl'>
                                    <thead id='tHeadReservation'>
                                        <tr>
                                            <td>Officer Name</td>
                                            <td>Officer ID</td>
                                            {/* <td className='headerStyle text-center'>Time From</td>
                                            <td className='headerStyle text-center'>Time To</td> */}
                                            <td >Plate Number</td>
                                            {/* <td className='headerStyle text-center'>Province </td> */}
                                            {/* <td className='headerStyle text-center'>Make</td> */}
                                            <td >City</td>
                                            {/* <td >Location</td> */}
                                            {/* <td>Voilation</td> */}
                                            {/* <td >Law</td> */}
                                            {/* <td>Penalty Amount</td> */}
                                            {/* <td className='headerStyle text-center'>Unit</td> */}
                                            <td >Date</td>
                                            {/* <td >Expire Date</td> */}
                             {Role==="Admin" ? 
                                            <td >DELETE</td>
                                            :""}
                                                    {Role==="Admin" ? 
                                            <td >DOWNLOAD</td>:""}
                                        </tr>
                                    </thead>
                                    <tbody id='tBody'>
                                        {ticketData?.filter((value) => (
                                            value.licensedPlateNumber.toLowerCase().includes(searchValue) ||
                                            value.date.toLowerCase().includes(searchValue)))
                                            .map((item, index) => {
                                                return <tr key={index}>
                                                    <td >{item.officerName}</td>
                                                    <td>{item.officerId}</td>
                                                    {/* <td className='font'>{item.timeFrom}</td>
                                                    <td className='font'>{item.timeTo}</td> */}
                                                    <td >{item.licensedPlateNumber}</td>
                                                    {/* <td className='font'>{item.province}</td> */}
                                                    {/* <td className='font'>{item.make}</td> */}
                                                    <td >{item.city}</td>
                                                    {/* <td >{item.location}</td> */}
                                                    {/* <td >{item.voilation}</td> */}
                                                    {/* <td >{item.law}</td> */}
                                                    {/* <td >{item.penaltyAmount}</td> */}
                                                    {/* <td className='font'>{item.unit}</td> */}
                                                    <td >{item.date}</td>
                                                    {/* <td >{item.expDate}</td> */}
                                                    {Role==="Admin" ? 
                                                    <td className='d-flex'>
                                                        <Button
                                                            id='btn'
                                                            onClick={() => {
                                                                handleClickRemove(item._id)
                                                            }}
                                                        >
                                                            DELETE
                                                        </Button>
                                                    </td>:""}
                                                    {Role==="Admin" ? 
                                                    <td>
                                                        <a href={`${API}getPDF/ticket/${item._id}`}
                                                            className="btn fontsizePDF" id='btnPdf'
                                                            target={"_blank"}

                                                        >
                                                            Generate PDF
                                                        </a>
                                                    </td>:""}
                                                </tr>
                                            })}
                                    </tbody>
                                </table>
                            </Col>
                        </Row>
                    </Container>
                </Row>
                </>
                :<><Row>
                <Col md={2} ><SideBar /></Col>
                <Col>
                  <h5 className="text-center" style={{ color: "red" }}>
                    There are currently no parking ticket to show
                  </h5>
                </Col>
              </Row>
    
              </>}
            </Container>
            <Modal show={ticketModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Add New Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddTicket setTicketModal={setTicketModal} />
                </Modal.Body>
            </Modal>
        </>
    )
}
