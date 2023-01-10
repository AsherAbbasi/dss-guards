import React from 'react'
import { Row, Container, Col } from 'react-bootstrap';


const  BuildingUnitsModal=({data}) =>{
  return (
    <Container>
      <Row className='d-flex text-center'>
        {console.log(data)}
        <Col>
           <Row className='d-flex justify-content-center'>
           {data.map((item , index)=>{
            return<Col lg={3} key={index} className='border m-1 p-0'>Unit No : {item} </Col>
          })}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
export default BuildingUnitsModal
