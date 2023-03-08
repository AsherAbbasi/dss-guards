import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from './Shared-Components/Dashboard-Sidebar';
import NavigationBar from './Shared-Components/Navbar'
import "../style/style.css";
import frontDesk from '../images/front.png';
import guard from '../images/pic2.jpeg';


export default function Dashboard() {

    return (
        <>
            <Container fluid={true}>
                <Row>
                    <NavigationBar />
                </Row>
                <Row>
                    <Col md={2}><SideBar /></Col>
                    <Col>
                        <Row className='d-flex justify-content-center align-items-center'>
                            <Col>
                                <div>
                                    <p id="text">Welcome to Digital Safeguard Security Inc Dashboard</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p id="dasboardPara">Digital Safeguard Security Inc. provides excellent security
                                    services to clients. To exceed the requirements and expectations of clients, our
                                    guards are highly trained, experienced and professional. It is our policy and
                                    highest priority to protect the safety of our employees, clients and their
                                    properties. We believe that our client’s satisfaction comes first.</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} sm={12} className='d-flex justify-content-center' id="col">
                                <div>
                                    <img src={frontDesk} id="dashboardImg"></img>
                                </div>
                                <div>
                                    <img id="dashboardImg" src={guard}></img>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            {/* </Container> */}
        </>
    )
}
