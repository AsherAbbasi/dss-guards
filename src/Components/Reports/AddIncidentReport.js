import React from 'react'
import { Row, Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { API } from '../../Config/config'

const AddIncidentReport = ({ Updated, setShowIncidentReportModel }) => {
    const [validated, setValidated] = useState(false);
    const initialData = {
        guardName: "",
        guardLicenseNumber: "",
        date: "",
        clientAddress: "",
        city: "",
        province: "",
        postalCode: "",
        incidentType: "",
        supervisorName: "",
        supervisorLicenseNumber: "",
        officerName: "",
        officerId: "",
        division: "",
        officerArrivalTime: "",
        officerDepartureTime: "",
        peramedicsOfficerName: "",
        peramedicsOfficerId: "",
        embulanceNumber: "",
        embulanceArrivalTime: "",
        embulanceDepartureTime: "",
        time: [],
        remarks: []
    }
    const [incidentReport, setIncidentReport] = useState(initialData);
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
                const url = `${API}incidentReport`;
                await axios.post(url, incidentReport);
                toast.success("Report Added successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                });
                Updated();
                setShowIncidentReportModel(false)

            } catch (error) {
                toast.error(`${error.response.data}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2500,
                });
            }
            setIncidentReport(initialData)
        }
    }
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setIncidentReport((prevState) => ({ ...prevState, [name]: value }));
    }
    return (
        <Container fluid={true}>
            <Form md={2} noValidate validated={validated} onSubmit={handleSubmit} >
                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Security Guard Name:</p>
                        <Form.Control className='mb-2' type="text" name="guardName" placeholder="Enter Security Guard Name.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Security Guard License Number:</p>
                        <Form.Control type="text" name="guardLicenseNumber" placeholder="Enter Guard License Number.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Client Address:</p>
                        <Form.Control className='mb-2' type="text" name="clientAddress" placeholder="Enter Client Address.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>City:</p>
                        <Form.Control type="text" name="city" placeholder="Enter City.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Province:</p>
                        <Form.Control className='mb-2' type="text" name="province" placeholder="Enter Province.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Postal Code:</p>
                        <Form.Control type="text" name="postalCode" placeholder="Enter Postal Code.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Date:</p>
                        <Form.Control type="text" name="date" placeholder="Date.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" w>
                        <p className='mb-2'>Type Of Incident:</p>
                        <Form.Select aria-label="Default select example" className='mb-2' name="incidentType" onChange={handleOnChange} required>
                            <option>Select Incident Type</option>
                            <option value="Power-Outage" >Power Outage</option>
                            <option value="Fire-Alarm" >Fire Alarm</option>
                            <option value="Theft" >Theft</option>
                            <option value="Water-Leakge" >Water Leakge</option>
                            <option value="Property-Damage" >Property Damage</option>
                            <option value="Trespassing" >Trespassing</option>
                            <option value="Medical-Emergency" >Medical Emergency</option>
                            <option value="Fire-Hazard" >Fire Hazard</option>
                            <option value="Other" >Other</option>
                        </Form.Select>
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Supervisor Name:</p>
                        <Form.Control className='mb-2' type="text" name="supervisorName" placeholder="Enter Supervisor Name.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Supervisor License Number:</p>
                        <Form.Control type="text" name="supervisorLicenseNumber" placeholder="Enter Supervisor License Number.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Officer Name:</p>
                        <Form.Control className='mb-2' type="text" name="officerName" placeholder="Enter Officer Name.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Officer ID:</p>
                        <Form.Control type="text" name="officerId" placeholder="Enter officer ID.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Division:</p>
                        <Form.Control type="text" name="division" placeholder="Enter Division.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Officer Arrival Time:</p>
                        <Form.Control className='mb-2' type="text" name="officerArrivalTime" placeholder="Enter Officer Arrival Time.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Officer Departure Time:</p>
                        <Form.Control type="text" name="officerDepartureTime" placeholder="Officer Departure Time.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Peramedics Officer Name:</p>
                        <Form.Control className='mb-2' type="text" name="peramedicsOfficerName" placeholder="Peramedics Officer Name.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Peramedics Officer Id:</p>
                        <Form.Control type="text" name="peramedicsOfficerId" placeholder="Peramedics Officer Id.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex ' id='ticketSection'>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                        <p className='mb-1'>Ambulance Number:</p>
                        <Form.Control className='mb-2' type="text" name="embulanceNumber" placeholder="Embulance Number.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Embulance Arrival Time:</p>
                        <Form.Control type="text" name="embulanceArrivalTime" placeholder="Embulance Arrival Tim.." onChange={handleOnChange} required />
                    </Form.Group>
                    <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                        <p className='mb-1'>Embulance Departure Time:</p>
                        <Form.Control type="text" name="embulanceDepartureTime" placeholder="Embulance Departure Tim.." onChange={handleOnChange} required />
                    </Form.Group>
                </div>

                <div className='d-flex justify-content-center mb-4 mt-4'>
                    <Button variant="primary" type="submit" id='addticketBtn'>
                        SUBMIT
                    </Button>
                </div>
            </Form>
        </Container>
    )
}
export default AddIncidentReport;