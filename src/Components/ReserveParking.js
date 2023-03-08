import React, { useState } from 'react';
import '../App.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import '../style/reservationparking.css'
import { toast } from "react-toastify";
import axios from 'axios';
import { API } from '../Config/config'
// import moment from 'moment';
const moment = require('moment-timezone');

export default function ReserveParking() {
    const [validated, setValidated] = useState(false);
    const date = moment.tz("America/Toronto").format('YYYY-MM-DD');
    const time = moment.tz("America/Toronto").format('LTS');
    const initialData = {
        buildingCode: "",
        buildingAddress: "",
        name: "",
        email: "",
        contactNumber: "",
        buildingUnits: "",
        vehicleModel: "",
        licensedPlateNumber: "",
        vehicleColor: "",
        Make: "",
        dateFrom: date,
        dateTo: "",
        timeFrom: time,
        timeTo: ""
    }
    const [reservation, setReservation] = useState(initialData);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setReservation((prevState) => ({ ...prevState, [name]: value }));

    }
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
        } else if (form.checkValidity() === true) {
            e.preventDefault();
            reservation.timeTo = moment(reservation.timeTo, 'hh:mm').format('LT');
            try {
                const url = `${API}reservation`;
                const response = await axios.post(url, reservation);
                let bCode = (response.data.buildingCode)
                let unit = (response.data.buildingUnits)
                let licensedPlateNumber = (response.data.licensedPlateNumber)

                const Url = `${url}/email`;
                await axios.post(Url, reservation);

                toast.success(`You Reserve The Parking Against Building ${bCode} Unit ${unit}  Licensed Plate ${licensedPlateNumber} `, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                });

            } catch (error) {
                console.log(error)
                toast.error(`${error.response.data}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                });
            }
        }
        // setReservation(initialData);
    };
    const disablePastDate = () => {
        const today = reservation.dateFrom ? moment(reservation.dateFrom).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
        return today;
    };
    const disableDate = () => {
        const lastDate = moment(reservation.dateFrom).add(2, 'days').format('YYYY-MM-DD');
        return lastDate;
    };

    return (
        <>
            <div className='mt-2'>
                {/* <a href="#">Go Back To Website</a> */}
            </div>
            <Row className='d-flex justify-content-center '>
                <Col lg={10}>
                    <Card className='m-4 bg-transparent'  >
                        <Form className='m-3' noValidate validated={validated} onSubmit={handleSubmit}>
                            <Card.Header id='card' style={{ marginBottom: "16px" }}>Building Information</Card.Header>
                            <Row className='mb-3 responsive' >
                                <Form.Group className='input' as={Col} controlId="validationCustom" >
                                    <Form.Control name='buildingCode' type={"text"} value={reservation.buildingCode} placeholder="Building Code*" onChange={handleOnChange} required />
                                </Form.Group>

                                <Form.Group className='input' as={Col} controlId="validationCustom02">
                                    <Form.Control name='buildingAddress' type="text" value={reservation.buildingAddress} placeholder="Building Address*" onChange={handleOnChange} required />
                                </Form.Group>
                            </Row>
                            <Card.Header className='mb-3' id='card'>Personal Information</Card.Header>

                            <Row className='mb-3 responsive'>
                                <Form.Group className='input' as={Col} controlId="validationCustom03" >
                                    {/* <Form.Label>Name</Form.Label> */}
                                    <Form.Control name='name' type="text" value={reservation.name} placeholder="Enter name* " onChange={handleOnChange} required />
                                </Form.Group>

                                <Form.Group className='input' as={Col} controlId="formGridEmail">
                                    <Form.Control name='email' type="email" value={reservation.email} placeholder="Your Email" onChange={handleOnChange} />
                                </Form.Group>
                            </Row>
                            <Row className='mb-3 responsive' >
                                <Form.Group className='input' as={Col} controlId="validationCustom04" >
                                    <Form.Control name='contactNumber' type="text" value={reservation.contactNumber} placeholder=" Contact number* " onChange={handleOnChange} required />
                                </Form.Group>

                                <Form.Group className='input' as={Col} controlId="validationCustom05">
                                    <Form.Control name='buildingUnits' type="text" value={reservation.buildingUnits} placeholder="Unit visiting*" onChange={handleOnChange} required />
                                </Form.Group>
                            </Row>

                            <Card.Header className='mb-3' id='card' >Vehicle details</Card.Header>
                            <Row className='mb-3 responsive'>
                                <Form.Group className='input' as={Col} controlId="formGridText" >
                                    <Form.Control name='vehicleModel' type="text" value={reservation.vehicleModel} placeholder=" Vehicle model " onChange={handleOnChange} />
                                </Form.Group>

                                <Form.Group className='input' as={Col} controlId="validationCustom06">
                                    <Form.Control name='licensedPlateNumber' type="text" value={reservation.licensedPlateNumber} placeholder=" Licensed plate number* " onChange={handleOnChange} required />
                                </Form.Group>
                            </Row>
                            <Row className='mb-3 responsive'>
                                <Form.Group className='input' as={Col} controlId="formGridText" >
                                    <Form.Control name='vehicleColor' type="text" value={reservation.vehicleColor} placeholder=" Vehicle Color " onChange={handleOnChange} />
                                </Form.Group>

                                <Form.Group className='input' as={Col} controlId="formGridText">
                                    {/* <Form.Label>Email</Form.Label> */}
                                    <Form.Control name='Make' type="text" value={reservation.Make} placeholder="Make" onChange={handleOnChange} />
                                </Form.Group>
                            </Row>
                            <Card.Header className='mb-3' id='card' >Reservation Date</Card.Header>
                            <Row className='mb-3 responsive'>
                                <Form.Group className='input' as={Col} controlId="validationCustom07" >
                                    <Form.Label className='text-light text-dark'>From</Form.Label>
                                    <Form.Control name='dateFrom' type="" value={reservation.dateFrom} placeholder=" From " onChange={handleOnChange} min={disablePastDate()} required disabled/>

                                </Form.Group>

                                <Form.Group className='input' as={Col} controlId="validationCustom08">
                                    <Form.Label className='text-light text-dark'>To</Form.Label>
                                    <Form.Control name='dateTo' type="date" value={reservation.dateTo} placeholder="To" onChange={handleOnChange} min={disablePastDate()} max={disableDate()} required />

                                </Form.Group>

                            </Row>
                            <Card.Header className='mb-3' id='card' >Reservation Time</Card.Header>
                            <Row className='mb-3 responsive'>
                                <Form.Group className='input' as={Col} controlId="validationCustom09" >
                                    <Form.Label className='text-light text-dark'>From</Form.Label>
                                    <Form.Control name='timeFrom' type="" value={reservation.timeFrom} placeholder=" From " onChange={handleOnChange} required  disabled/>
                                </Form.Group>

                                <Form.Group className='input' as={Col} controlId="validationCustom10">
                                    <Form.Label className='text-light text-dark'>To</Form.Label>
                                    <Form.Control name='timeTo' type="Time" value={reservation.timeTo} placeholder="To" id="time" onChange={handleOnChange} />
                                </Form.Group>

                            </Row>

                            <Button variant="success" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
