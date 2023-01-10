import React from 'react'
import { Col,Row } from 'react-bootstrap';

const PaginationViewReservation=({totalData,dataPerPage,paginate})=> {
  
  const pageNumbers=[];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage ); i++) {
    pageNumbers.push(i)
  }
  return (
      <Row>
        <Col className='d-flex justify-content-center'>
   <nav>
    <ul className='pagination'>
    {pageNumbers?.map(number=> 
      {
    return(
        <li key={number} className="page-item">
          <a  onClick={() => paginate(number) } className='page-link'>{number}</a>
        </li>
    )
      })}
    
    </ul>
   </nav>
   </Col>
   </Row>
   )
}
export default PaginationViewReservation
