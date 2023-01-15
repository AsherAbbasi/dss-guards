import React from 'react'
import companyLogo from '../images/loginlogo.jpeg';
import {Col, Dropdown, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Gear} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/actions";


export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClickDashboard = () => {
        navigate('/app/dashboard')

    }
    const LogoutUser = () => {
        dispatch(logout());
        navigate('/')
    }
    return (
        <Row className='d-flex align-items-center' style={{height: "83px", backgroundColor: "white"}}>
            <Col lg={6} md={6} sm={6} xs={6}>
                <img src={companyLogo}
                     style={{width: "80px", height: "60px", float: "left", cursor: "pointer", marginLeft: "40px"}}
                     onClick={handleClickDashboard}/>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
                <Dropdown style={{float: "right", display: "flex"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{
                        background: "none",
                        border: "none",
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "400"
                    }}>
                        <Gear style={{marginRight: "5px", fontSize: "18px", fontWeight: "500"}}/>Setting
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item onClick={LogoutUser}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    )
}
