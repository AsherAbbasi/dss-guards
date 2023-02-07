import { React, useEffect, useState } from 'react'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
// import DashboardSideBar from './Dashboard-Sidebar'
import NavigationBar from '../Shared-Components/Navbar'
import axios from 'axios';
import '../css/style.css'
import { toast } from "react-toastify";
import { API } from '../../Config/config'

export default function ViewTicket() {
    const [searchValue, setSearchValue] = useState("");
    const handleChangeSearch = (e) => {
        setSearchValue(e.target.value)
    }
    const [ticketData, setTicketData] = useState([])

    const accessToken = localStorage.getItem('Access token')
    // const Role = localStorage.getItem("role")

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
    const pdfMaker = async (id) => {
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

    }
    return (
        <>
            <Container fluid={true}>
                <Row>
                    <NavigationBar />
                </Row>

                <Row style={{ backgroundColor: '#f0f1f2', padding: '12px' }}>
                    <Col md={12} className="d-flex justify-content-end" id="" >
                        <Col md={6}><h5 style={{color:"#325661",marginTop:'7px'}}>Tickets</h5></Col>
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
                                <table className="table table-bordered" id='tbl'>
                                    <thead  id='tHead'>
                                        <tr>
                                            <td>Officer Name</td>
                                            <td>Officer ID</td>
                                            {/* <td className='headerStyle text-center'>Time From</td>
                                            <td className='headerStyle text-center'>Time To</td> */}
                                            <td >Plate Number</td>
                                            {/* <td className='headerStyle text-center'>Province </td> */}
                                            {/* <td className='headerStyle text-center'>Make</td> */}
                                            <td >City</td>
                                            <td >Location</td>
                                            <td>Voilation</td>
                                            <td >Law</td>
                                            <td>Penalty Amount</td>
                                            {/* <td className='headerStyle text-center'>Unit</td> */}
                                            <td >Date</td>
                                            <td >Expire Date</td>
                                            <td >DELETE</td>
                                            <td >DOWNLOAD</td>
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
                                                    <td >{item.location}</td>
                                                    <td >{item.voilation}</td>
                                                    <td >{item.law}</td>
                                                    <td >{item.penaltyAmount}</td>
                                                    {/* <td className='font'>{item.unit}</td> */}
                                                    <td >{item.date}</td>
                                                    <td >{item.expDate}</td>

                                                    <td className='d-flex'>
                                                        <Button
                                                            id='btn'
                                                            onClick={() => {
                                                                handleClickRemove(item._id)
                                                            }}
                                                        >
                                                            DELETE
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <a href={`${API}getPDF/ticket/${item._id}`}
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
                </Row>
            </Container>
        </>
    )
}
