import React from 'react'
// import companyLogo from '../images/loginlogo.jpeg';
import Logo from '../images/dssguardslogo.jpeg';

import {Col, Container, Dropdown, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {Gear} from "react-bootstrap-icons";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/actions";
import '../css/style.css'


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
        // <div style={{position:"fixed",width:"100%"}}>
        <Row className='d-flex align-items-center' style={{height: "83px", backgroundColor: "white",margin:"8px"}}>
            <Col lg={6} md={6} sm={6} xs={6}>
                <img src={Logo}
                     style={{width: "240px", float: "left", cursor: "pointer", marginLeft: "-10px"}}
                     onClick={handleClickDashboard}/>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
                <Dropdown style={{float: "right", display: "flex",marginRight:"12px"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{
                        background: "none",
                        border: "none",
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "400",
                        
                    }}>
                        <Gear style={{marginRight: "5px", fontSize: "18px", fontWeight: "600"}}/>Settings
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleClickDashboard}>Dashboard</Dropdown.Item>
                        <Dropdown.Item onClick={LogoutUser}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
        // </div>
    )
}
