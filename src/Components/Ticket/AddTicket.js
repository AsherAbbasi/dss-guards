import React from 'react'
import { Container, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { API } from '../../Config/config'
// import NavigationBar from "../Shared-Components/Navbar"
// import DashboardSideBar from "../Shared-Components/Dashboard-Sidebar"

export default function Ticket({ setTicketModal }) {
    const [validated, setValidated] = useState(false);

    const initialData =
    {
        officerName: "",
        date: "",
        voilationTime: "",
        licensedPlateNumber: "",
        expDate: "",
        province: "",
        make: "",
        city: "",
        location: "",
        voilation: "",
        law: "",
        comments: "",
        penaltyAmount: "",
        officerNo: "",
        // unit:"",
    }
    const [data, setData] = useState(initialData);
    const accessToken = localStorage.getItem('Access token');

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
        e.preventDefault();
    }
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
        }
        else if (form.checkValidity() === true) {
            e.preventDefault();
            try {
                const url = `${API}ticket`;
                await axios.post(url, data, { headers: { "Authorization": `Bearer ${accessToken}` } });
                toast.success("Ticket Added successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                });
                setTicketModal(false)
            } catch (error) {
                toast.error(`${error.response.data}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                });
            }
        }
    }
    return (
        <Container fluid={true}>
            {/* <Row>
                <NavigationBar />
            </Row> */}
            {/* <Row> */}
            {/* <Col md={2}><DashboardSideBar /></Col> */}
            {/* <Col md={12}> */}
            {/* <Container> */}
            {/* <Row>
                            <p id="text">Please add Ticket here!</p>
                        </Row> */}
            {/* <Row className='d-flex justify-content-center align-items-center'>
                            <Col id='addTicket' className='mt-3' lg={2} md={4} > */}

            <Form md={2} noValidate validated={validated} onSubmit={handleSubmit}>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Officer Name:</p>
                        <Form.Control type="text" name="officerName" placeholder="Enter officer Name.." onChange={handleOnChange} required />
                    </Form.Group>

                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Officer ID:</p>
                        <Form.Control type="text" name="officerId" placeholder="Enter Officer ID.. " onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Date Of Voilation:</p>
                        <Form.Control type="text" name="date" placeholder="Enter Date.. " onChange={handleOnChange} required />
                    </Form.Group>

                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Voilation Time:</p>
                        <Form.Control type="text" name="voilationTime" placeholder="Enter Time.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Licensed Plate Number:</p>
                        <Form.Control type="text" name="licensedPlateNumber" placeholder="Enter plate number.. " onChange={handleOnChange} required />
                    </Form.Group>

                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>License Expire Date:</p>
                        <Form.Control type="text" name="expDate" placeholder="License Expire Date.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className="px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Province:</p>
                        <Form.Control type="text" name="province" placeholder="Enter Province.." onChange={handleOnChange} required />
                    </Form.Group>

                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Make:</p>
                        <Form.Control type="text" name="make" placeholder="Enter Make.. " onChange={handleOnChange} required />
                    </Form.Group>

                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>City:</p>
                        <Form.Control type="text" name="city" placeholder="Enter City.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Location:</p>
                        <Form.Control type="text" name="location" placeholder="Enter Location.." onChange={handleOnChange} required />
                    </Form.Group>

                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Voilation:</p>
                        <Form.Control type="text" name="voilation" placeholder="Enter Voilation.. " onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Law:</p>
                        <Form.Control type="text" name="law" placeholder="Enter Law.." onChange={handleOnChange} required />
                    </Form.Group>
                    {/* <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Unit:</p>
                        <Form.Control type="text" name="unit" placeholder="Enter unit.." onChange={handleOnChange} required />
                    </Form.Group> */}
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Comments:</p>
                        <Form.Control as="textarea" rows={3} type="text" name="comments" placeholder="Comments.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className="px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Penalty Amount:</p>
                        <Form.Control type="text" name="penaltyAmount" placeholder="Enter amount.. " onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex justify-content-center mb-2 mt-2'>
                    <Button variant="primary" type="submit" id='addticketBtn'>
                        SUBMIT
                    </Button>
                </div>
            </Form>
            {/* </Col>
                        </Row>
                    </Container> */}
            {/* </Col> */}
            {/* </Row> */}
        </Container>
    )
}
