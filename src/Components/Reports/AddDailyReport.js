import React from 'react'
import { Container, Form, Button } from 'react-bootstrap';
// import DashboardSideBar from '../Shared-Components/Dashboard-Sidebar'
// import NavigationBar from '../Shared-Components/Navbar'
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import { API } from '../../Config/config'

export default function AddDailyReport({Updated,setShowDailyReportModel}) {
    const [validated, setValidated] = useState(false);
    // const [counter, setCounter] = useState(0);
    const initialData = {
        guardName: "",
        licenseNumber: "",
        date: "",
        clientName: "",
        clientAddress: "",
        city: "",
        province: "",
        postalCode: "",
        weatherCondition: "",
        equipment: "",
        relievedTo: "",
        relievedBy: "",
        shiftStartTime: "",
        shiftEndTime: "",
        hoursOfShift: "",
        time:[],
        remarks:[]
    }
    const [dailyReport, setDailyReport] = useState(initialData);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setDailyReport((prevState) => ({ ...prevState, [name]: value }));
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
            const url = `${API}dailyReport`;
            await axios.post(url, dailyReport);
            toast.success("Report Added successfully", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
            Updated();
            setShowDailyReportModel(false)

          } catch (error) {
            toast.error(`${error.response.data}`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2500,
            });
      
          }
          setDailyReport(initialData)
        }
    }
    return (
        <Container fluid={true}>
            {/* <Row>
                <NavigationBar />
            </Row> */}
            {/* <Row> */}
                {/* <Col md={2}><DashboardSideBar /></Col> */}
                {/* <Col md={10}> */}
                    {/* <Container> */}
                        {/* <Row>
                            <p id="text">Please Add Daily Report here!</p>
                        </Row> */}
                        {/* <Row className='d-flex justify-content-center align-items-center'> */}
                            {/* <Col id='addTicket' className='mt-3' lg={2} md={4} > */}
                                <Form md={2} noValidate validated={validated} onSubmit={handleSubmit}>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                                            <p className='mb-1'>Security Guard Name:</p>
                                            <Form.Control className='mb-2' type="text" name="guardName" placeholder="Guard Name.." onChange={handleOnChange} required />
                                        </Form.Group>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Client Name:</p>
                                            <Form.Control  type="text" name="clientName" placeholder="Enter Client Nam.." onChange={handleOnChange} required />
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className="px-3 w-100" controlId="formBasicEmail">
                                            <p className='mb-1'>Client Address:</p>
                                            <Form.Control className='mb-2' type="text" name="clientAddress" placeholder="Enter Client Address.." onChange={handleOnChange} required />
                                        </Form.Group>
                                        <Form.Group className=" px-3 w-75" controlId="formBasicEmail">
                                            <p className='mb-1'>License Number</p>
                                            <Form.Control className='mb-2' type="text" name="licenseNumber" placeholder="Enter Plate Number" onChange={handleOnChange} required />
                                        </Form.Group>
                                        <Form.Group className=" px-3 w-75" controlId="formBasicEmail" >
                                            <p className='mb-1'>Date:</p>
                                            <Form.Control  type="text" name="date" placeholder="Enter Date.. " onChange={handleOnChange} required />
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>City:</p>
                                            <Form.Control className='mb-2' type="text" name="city" placeholder="Enter City.. " onChange={handleOnChange} required />
                                        </Form.Group>
                                        <Form.Group className="px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Province:</p>
                                            <Form.Control className='mb-2' type="text" name="province" placeholder="Enter Province.." onChange={handleOnChange} required />
                                        </Form.Group>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Postal Code:</p>
                                            <Form.Control  type="text" name="postalCode" placeholder="Enter Postal Code.. " onChange={handleOnChange} required />
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Weather Condition:</p>
                                            <Form.Control className='mb-2' type="text" name="weatherCondition" placeholder="Enter Weather Condition.." onChange={handleOnChange} required />
                                        </Form.Group>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Equipment Handedover:</p>
                                            <Form.Control  type="text" name="equipment" placeholder="Enter Equipment Handedover.." onChange={handleOnChange} required />
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Relieved To:</p>
                                            <Form.Control className='mb-2' type="text" name="relievedTo" placeholder="Relieved To.. " onChange={handleOnChange} required />
                                        </Form.Group>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Relieved By:</p>
                                            <Form.Control  type="text" name="relievedBy" placeholder="Enter Relieved By.." onChange={handleOnChange} required />
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex ' id='ticketSection'>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Shift Start Time:</p>
                                            <Form.Control className='mb-2' type="text" name="shiftStartTime" placeholder="Shift Start Time .." onChange={handleOnChange} required />
                                        </Form.Group>
                                        <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                                            <p className='mb-1'>Shift End Time:</p>
                                            <Form.Control className='mb-2' type="text" name="shiftEndTime" placeholder="Shift End Time.." onChange={handleOnChange} required />
                                        </Form.Group>
                                        <Form.Group className="px-3 w-100" controlId="formBasicEmail">
                                            <p className='mb-1'>Hours Of Shift:</p>
                                            <Form.Control  type="text" name="hoursOfShift" placeholder="Hours Of Shift.. " onChange={handleOnChange} required />
                                        </Form.Group>
                                    </div>
                                    <div className='d-flex justify-content-center mb-4 mt-4'>
                                        <Button variant="primary" type="submit" id='addticketBtn'>
                                            SUBMIT
                                        </Button>
                                    </div>
                                </Form>
                            {/* </Col> */}
                        {/* </Row> */}
                    {/* </Container>
               </Col>
             </Row> */}
         </Container>
    )
}
