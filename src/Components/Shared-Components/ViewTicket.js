import { React, useEffect, useState } from 'react'
import { Row, Container, Col, Button } from 'react-bootstrap';
// import DashboardSideBar from './Dashboard-Sidebar'
import NavigationBar from './Navbar'
import axios from 'axios';
import '../css/style.css'
import { toast } from "react-toastify";
import { API } from '../../Config/config'

export default function ViewTicket() {

    const [ticketData, setTicketData] = useState([])

    const accessToken = localStorage.getItem('Access token')
    // const Role = localStorage.getItem("role")

    useEffect(() => {
        axios.get(`${API}ticket`, { headers: { "Authorization": `Bearer ${accessToken}` } })
            .then((res) => {
                console.log(res.data);
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
    return (
        <>
            <Container fluid={true}>
                <Row>
                    <NavigationBar />
                </Row>
                <Row>
                    {/* <Col md={2} ><DashboardSideBar /></Col> */}
                    <Row className='ticketRow'><Col><p id="text">List Of Tickets </p></Col></Row>
                        <Container>
                            <Row className='d-flex justify-content-center align-items-center'>
                                <Col id="TicketTable" lg={2} md={4} >
                                    <table className="table table-bordered" id='tbl'>
                                        <thead className=" text-white" style={{ backgroundColor: "hsl(218, 41%, 15%)" }}>
                                            <tr>
                                                <td className='headerStyle text-center'>Name</td>
                                                <td className='headerStyle text-center'>Date</td>
                                                <td className='headerStyle text-center'>Time From</td>
                                                <td className='headerStyle text-center'>Time To</td>
                                                <td className='headerStyle text-center'>Plate Number</td>
                                                <td className='headerStyle text-center'>Expire Date</td>
                                                <td className='headerStyle text-center'>Province </td>
                                                <td className='headerStyle text-center'>Make</td>
                                                <td className='headerStyle text-center'>City</td>
                                                <td className='headerStyle text-center'>Location</td>
                                                <td className='headerStyle text-center'>Voilation</td>
                                                <td className='headerStyle text-center'>Law</td>
                                                <td className='headerStyle text-center'>Comments</td>
                                                <td className='headerStyle text-center'>Penalty Amount</td>
                                                <td className='headerStyle text-center'>Officer Number</td>
                                                <td className='headerStyle text-center'>Unit</td>
                                                <td className='headerStyle text-center'>DELETE</td>
                                                <td className='headerStyle text-center'>DOWNLOAD</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ticketData?.map((item, index) => {
                                                return <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.timeFrom}</td>
                                                    <td>{item.timeTo}</td>
                                                    <td>{item.licensedPlateNumber}</td>
                                                    <td>{item.expDate}</td>
                                                    <td>{item.province}</td>
                                                    <td>{item.make}</td>
                                                    <td>{item.city}</td>
                                                    <td>{item.location}</td>
                                                    <td>{item.voilation}</td>
                                                    <td>{item.law}</td>
                                                    <td>{item.comments}</td>
                                                    <td>{item.penaltyAmount}</td>
                                                    <td>{item.officerNo}</td>
                                                    <td>{item.unit}</td>
                                                    <td className='d-flex'>
                                                        <Button
                                                        id='btn'
                                                        onClick={() => {
                                                            handleClickRemove(item._id)}}
                                                        >
                                                            DELETE
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            className="btn fontsizePDF" id='btnPdf'
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
                </Row>
            </Container>
        </>
    )
}
