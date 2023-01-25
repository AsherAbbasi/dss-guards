import React from 'react'
import { Row, Container, Col, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { API } from '../../Config/config'
import NavigationBar from "../Shared-Components/Navbar"
import DashboardSideBar from "../Shared-Components/Dashboard-Sidebar"

export default function Ticket() {
    const initialData =
    {
        name: "",
        date: "",
        timeFrom: "",
        timeTo: "",
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
        unit: "",
    }
    const [data, setData] = useState(initialData);
    console.log(data)
    const accessToken = localStorage.getItem('Access token');

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({ ...prevState, [name]: value }));
        e.preventDefault();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${API}ticket`;
            await axios.post(url, data, { headers: { "Authorization": `Bearer ${accessToken}` } });
            toast.success("Ticket Added successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });

        } catch (error) {
            toast.error(`${error.response.data}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
        }
    }
    return (
        <Container fluid={true}>
            <Row>
                <NavigationBar />
            </Row>
            <Row>
                <Col md={2}><DashboardSideBar /></Col>
                <Col md={10}>
                    <Container>
                        <Row>
                            <p id="ticketText">Please add Ticket here!</p>
                        </Row>
                        <Row className='d-flex justify-content-center align-items-center'>
                            <Col id='addTicket' lg={2} md={4} >

                                <Form md={2} onSubmit={handleSubmit}>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                                            <p className='mb-1'>Name:</p>
                                            <Form.Control type="text" name="name" placeholder="Enter Name.." onChange={handleOnChange} />

                                        </Form.Group>

                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Date:</p>
                                            <Form.Control type="text" name="date" placeholder="Enter Date.. " onChange={handleOnChange} />

                                        </Form.Group>

                                        <Form.Group className="px-3 w-100" controlId="formBasicEmail">
                                            <p className='mb-1'>Time From:</p>
                                            <Form.Control type="text" name="timeFrom" placeholder="Time From.." onChange={handleOnChange} />
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Time To:</p>
                                            <Form.Control type="text" name="timeTo" placeholder="Enter Time.." onChange={handleOnChange} />

                                        </Form.Group>

                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Licensed Plate Number:</p>
                                            <Form.Control type="text" name="licensedPlateNumber" placeholder="Enter plate number.. " onChange={handleOnChange} />

                                        </Form.Group>

                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Expire Date:</p>
                                            <Form.Control type="text" name="expDate" placeholder="Expire Date.." onChange={handleOnChange} />
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className="px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Province:</p>
                                            <Form.Control type="text" name="province" placeholder="Enter Province.." onChange={handleOnChange} />

                                        </Form.Group>

                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Make:</p>
                                            <Form.Control type="text" name="make" placeholder="Enter Make.. " onChange={handleOnChange} />

                                        </Form.Group>

                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>City:</p>
                                            <Form.Control type="text" name="city" placeholder="Enter City.." onChange={handleOnChange} />
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Location:</p>
                                            <Form.Control type="text" name="location" placeholder="Enter Location.." onChange={handleOnChange} />

                                        </Form.Group>

                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Voilation:</p>
                                            <Form.Control type="text" name="voilation" placeholder="Enter Voilation.. " onChange={handleOnChange} />

                                        </Form.Group>

                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Law:</p>
                                            <Form.Control type="text" name="law" placeholder="Enter Law.." onChange={handleOnChange} />

                                        </Form.Group>

                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                                            <p className='mb-1'>Officer Number:</p>
                                            <Form.Control type="text" name="officerNo" placeholder="Enter officer number.. " onChange={handleOnChange} />

                                        </Form.Group>

                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Unit:</p>
                                            <Form.Control type="text" name="unit" placeholder="Enter unit.." onChange={handleOnChange} />
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Comments:</p>
                                            <Form.Control as="textarea" rows={3} type="text" name="comments" placeholder="Comments.." onChange={handleOnChange} />

                                        </Form.Group>

                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className="px-3 w-100" controlId="formBasicEmail">
                                            <p className='mb-1'>Penalty Amount:</p>
                                            <Form.Control type="text" name="penaltyAmount" placeholder="Enter amount.. " onChange={handleOnChange} />

                                        </Form.Group>
                                    </div>
                                    <div className='d-flex justify-content-center mb-2 mt-2'>
                                        <Button variant="primary" type="submit" id='addticketBtn'>
                                            SUBMIT
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}
