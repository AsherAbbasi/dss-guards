import { React, useState } from 'react'
import { Row, Form, Col, Button } from 'react-bootstrap'; 
import { API } from '../../Config/config'
import axios from 'axios';
import { toast } from "react-toastify";
import '../css/style.css';



const EditDailyReportModel=({dailyReportData,setShowEditModel})=> {
    const dailyReport=dailyReportData; // {name, username, email, password} {createdAt, sss, ddd, gg}
  const [time, setTime] = useState('')
  const [remarks, setRemarks] = useState('')

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if(name === "time") {
            setTime(value);
        } else if (name === "remarks") {
            setRemarks(value)
        }
    }

    let id=dailyReport._id;
    console.log(id)
    const handleSubmit=async (e)=>{
       e.preventDefault();
  
       try {
        const url = `${API}dailyReport/${id}`;
        await axios.put(url, {remarks, time });
        toast.success("Data Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
        setShowEditModel(false)
      } catch (error) {
        toast.error(`${error.response.data}`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2500,
        });
  
      }
    }
  return (
    <Row className='d-flex justify-content-center align-items-center'>
    <Col id='addTicket' className='mt-3' lg={2} md={4} >
        <Form md={2} onSubmit={handleSubmit}>
            <div className='d-flex ' id='ticketSection'>
                <Form.Group className=" px-3 w-100" controlId="formBasicEmail">
                    <p className='mb-1'>Security Guard Name:</p>
                    <Form.Control className='mb-2' type="text" name="guardName" placeholder={dailyReport.guardName} onChange={handleOnChange} required disabled/>
                </Form.Group>
                <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                    <p className='mb-1'>Client Name:</p>
                    <Form.Control  type="text" name="clientName" placeholder={dailyReport.clientName} onChange={handleOnChange} required disabled/>
                </Form.Group>
            </div>
            <div className='d-flex ' id='ticketSection'>
                <Form.Group className="px-3 w-100" controlId="formBasicEmail">
                    <p className='mb-1'>Client Address:</p>
                    <Form.Control className='mb-2' type="text" name="clientAddress" placeholder={dailyReport.clientAddress} onChange={handleOnChange} required disabled/>
                </Form.Group>
                <Form.Group className=" px-3 w-75" controlId="formBasicEmail">
                    <p className='mb-1'>License Number</p>
                    <Form.Control className='mb-2' type="text" name="licenseNumber" placeholder={dailyReport.licenseNumber} onChange={handleOnChange} required disabled/>
                </Form.Group>
                <Form.Group className=" px-3 w-75" controlId="formBasicEmail" >
                    <p className='mb-1'>Date:</p>
                    <Form.Control  type="text" name="date" placeholder={dailyReport.date} onChange={handleOnChange} required disabled/>
                </Form.Group>
            </div>
            <div className='d-flex ' id='ticketSection'>
                <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                    <p className='mb-1'>City:</p>
                    <Form.Control className='mb-2' type="text" name="city" placeholder={dailyReport.city} onChange={handleOnChange} required disabled/>
                </Form.Group>
                <Form.Group className="px-3 w-100" controlId="formBasicEmail" >
                    <p className='mb-1'>Province:</p>
                    <Form.Control className='mb-2' type="text" name="province" placeholder={dailyReport.province} onChange={handleOnChange} required disabled/>
                </Form.Group>
                <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                    <p className='mb-1'>Postal Code:</p>
                    <Form.Control  type="text" name="postalCode" placeholder={dailyReport.postalCode} onChange={handleOnChange} required disabled/>
                </Form.Group>
            </div>
            <div className='d-flex ' id='ticketSection'>
                <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                    <p className='mb-1'>Weather Condition:</p>
                    <Form.Control className='mb-2' type="text" name="weatherCondition" placeholder={dailyReport.weatherCondition} onChange={handleOnChange} required disabled/>
                </Form.Group>
                <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                    <p className='mb-1'>Equipment Handedover:</p>
                    <Form.Control  type="text" name="equipment" placeholder={dailyReport.equipment} onChange={handleOnChange} required disabled/>
                </Form.Group>
            </div>
            <div className='d-flex ' id='ticketSection'>
                <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                    <p className='mb-1'>Relieved To:</p>
                    <Form.Control className='mb-2' type="text" name="relievedTo" placeholder={dailyReport.relievedTo} onChange={handleOnChange} required disabled/>
                </Form.Group>
                <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                    <p className='mb-1'>Relieved By:</p>
                    <Form.Control  type="text" name="relievedBy" placeholder={dailyReport.relievedBy} onChange={handleOnChange} required disabled/>
                </Form.Group>
            </div>
            <div className='d-flex ' id='ticketSection'>
                <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                    <p className='mb-1'>Shift Start Time:</p>
                    <Form.Control className='mb-2' type="text" name="shiftStartTime" placeholder={dailyReport.shiftStartTime} onChange={handleOnChange} required disabled/>
                </Form.Group>
                <Form.Group className=" px-3 w-100" controlId="formBasicEmail" >
                    <p className='mb-1'>Shift End Time:</p>
                    <Form.Control className='mb-2' type="text" name="shiftEndTime" placeholder={dailyReport.shiftEndTime} onChange={handleOnChange} required disabled/>
                </Form.Group>
                <Form.Group className="px-3 w-100" controlId="formBasicEmail">
                    <p className='mb-1'>Hours Of Shift:</p>
                    <Form.Control  type="text" name="hoursOfShift" placeholder={dailyReport.hoursOfShift} onChange={handleOnChange} required disabled/>
                </Form.Group>
            </div>
            <div className='d-flex ' id='ticketSection'>
                <Form.Group className="px-3 w-50" controlId="formBasicEmail" >
                    <p className='mb-1'>Time:</p>
                    <Form.Control className='mb-2' type="text" name="time" placeholder="Time.. " id='fullWidth' onChange={handleOnChange}  required />
                </Form.Group>
                <Form.Group className="px-3 w-100" controlId="formBasicEmail">
                    <p className='mb-1'>Remarks:</p>
                    <Form.Control className='mb-2' type="text" name="remarks" placeholder="Remarks.." onChange={handleOnChange} required />
                </Form.Group>
            </div>
            {/* {Array.from(Array(counter)).map((c, index) => {
                return (
                    <>
                <div className='d-flex w-100' id='ticketSection'>
                <Form.Group className="px-3 w-50" controlId="formBasicEmail">
                    <p className='mb-1' key={c}>Time:</p>
                    <Form.Control className='mb-2' type="text" name="time" placeholder="Time.. "  key={c} onChange={handleOnChange} required />
                </Form.Group>
                <Form.Group className="px-3 w-100" controlId="formBasicEmail">
                    <p className='mb-1' key={c}>Remarks:</p>
                    <Form.Control className='mb-2' type="text" name="remarks" placeholder="Remarks.." key={c} onChange={handleOnChange} required />
                </Form.Group>
            </div>
            </>
            )
            })} */}
            <div className='d-flex justify-content-center mb-4 mt-4'>
            {/* <Button variant="primary"  id='addMoreBtn' onClick={handleClick}>
                    Add More Remarks
                </Button> */}
                <Button variant="primary" type="submit" id='addticketBtn'>
                    SUBMIT
                </Button>
            </div>
        </Form>
    </Col>
</Row>
  )
}
export default EditDailyReportModel;