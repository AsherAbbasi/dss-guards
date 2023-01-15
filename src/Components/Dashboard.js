import React from 'react'
import { Row, Container, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import SideBar from './Shared-Components/Dashboard-Sidebar';
import NavigationBar  from './Shared-Components/Navbar'
import "./css/responsive.css";
import frontDesk from './images/front.png';
import guard from './images/Mobile-security-Patrol.jpeg';




export default function Dashboard() {
  useEffect(() => {
    // change background color with a random color
    const color = "white";
    document.body.style.background = color;
  });

  return (
    <>
      {/* <Container fluid={true}>
        <Row>
       <NavigationBar/>
        </Row>
        <Row>
        <Col lg={6} md={6}>
            <SideBar />
          </Col>
        </Row>
        <Row>
       <Home/>
        </Row> */}
        <Container fluid={true}>
      <Row>
       <NavigationBar/>
        </Row>
    <Row>
      <Col md={2}><SideBar/></Col>
    <Col >
            <Row className='d-flex justify-content-center align-items-center'>
    <Col  >
      <div>
        <p  id="text">Welcome to Digital Safeguard Security Inc Dashboard</p>
      </div>
      </Col>
      </Row>
      <Row>
        <Col>
        <p id="dasboardPara">Digital Safeguard Security Inc. provides excellent security services to clients. To exceed the requirements and expectations of clients, our guards are highly trained, experienced and professional. It is our policy and highest priority to protect the safety of our employees, clients and their properties. We believe that our client’s satisfaction comes first.</p>
        </Col>
      </Row>
      <Row style={{margin:"23px", padding:"30px",borderRadius:"23px"}}>
        <Col>
        <img src={frontDesk}  style={{width:"400px",height:"250px"}}></img>
        </Col>
        <Col>
        <img src={guard} style={{width:"400px",height:"250px"}}></img>
        </Col>
        
      </Row>
     
</Col>
    </Row>
    </Container>
      {/* </Container> */}
    </>
  )
}
