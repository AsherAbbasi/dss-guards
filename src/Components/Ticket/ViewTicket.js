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
                                    <thead className=" text-white" style={{ backgroundColor: "brown" }}>
                                        <tr>
                                            <td className='headerStyle text-center'>Officer Name</td>
                                            <td className='headerStyle text-center'>Officer ID</td>
                                            {/* <td className='headerStyle text-center'>Time From</td>
                                            <td className='headerStyle text-center'>Time To</td> */}
                                            <td className='headerStyle text-center'>Plate Number</td>
                                            {/* <td className='headerStyle text-center'>Province </td> */}
                                            {/* <td className='headerStyle text-center'>Make</td> */}
                                            <td className='headerStyle text-center'>City</td>
                                            <td className='headerStyle text-center'>Location</td>
                                            <td className='headerStyle text-center'>Voilation</td>
                                            <td className='headerStyle text-center'>Law</td>
                                            <td className='headerStyle text-center'>Penalty Amount</td>
                                            {/* <td className='headerStyle text-center'>Unit</td> */}
                                            <td className='headerStyle text-center'>Date</td>
                                            <td className='headerStyle text-center'>Expire Date</td>
                                            <td className='headerStyle text-center'>DELETE</td>
                                            <td className='headerStyle text-center'>DOWNLOAD</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ticketData?.filter((value) => (
                                            value.licensedPlateNumber.toLowerCase().includes(searchValue) ||
                                            value.date.toLowerCase().includes(searchValue)))
                                            .map((item, index) => {
                                                return <tr key={index}>
                                                    <td className='font'>{item.officerName}</td>
                                                    <td className='font'>{item.officerId}</td>
                                                    {/* <td className='font'>{item.timeFrom}</td>
                                                    <td className='font'>{item.timeTo}</td> */}
                                                    <td className='font'>{item.licensedPlateNumber}</td>
                                                    {/* <td className='font'>{item.province}</td> */}
                                                    {/* <td className='font'>{item.make}</td> */}
                                                    <td className='font'>{item.city}</td>
                                                    <td className='font'>{item.location}</td>
                                                    <td className='font'>{item.voilation}</td>
                                                    <td className='font'>{item.law}</td>
                                                    <td className='font'>{item.penaltyAmount}</td>
                                                    {/* <td className='font'>{item.unit}</td> */}
                                                    <td className='font'>{item.date}</td>
                                                    <td className='font'>{item.expDate}</td>

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
