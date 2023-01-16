import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import companyLogo from '../images/loginlogo.jpeg'
import '../css/login.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";
import {API} from '../../Config/config';
import {useDispatch} from "react-redux";
import {login} from "../../redux/actions";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const handleOnChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormValue((prevState) => ({...prevState, [name]: value}));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `${API}auth/login`;
            const response = await axios.post(url, formValue);
            const token = (response.data.token.access.token)
            const refreshToken = (response.data.token.refresh.token)
            const role = (response.data.response.role)
            localStorage.setItem("Access token", token)
            localStorage.setItem("Refresh token", refreshToken)
            localStorage.setItem("role", role);
            localStorage.setItem('authToken', token);
            dispatch(login(response.data))


            toast.success("Login successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
            navigate('/app/dashboard');
        } catch (error) {
            toast.error(`${error.response.data}`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2500,
            });
        }
    }


    return (
        <>
          <div id="login">
            <Container className='form-mid ' >
                <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                <Row className="d-flex justify-content-lg-center align-items-center vh-100 ">
                    <Col lg={4} md={6} sm={12}
                         className=' h-50 d-flex flex-column justify-content-lg-center  '>
                        <h1 className="my-3  fw-bold ls-tight px-3" style={{color: '#ab0510'}}>
                            Digital Safeguard<br/>
                            <span style={{color: 'white'}}>Security Inc</span>
                        </h1>
                        <p className='px-3 fw-bold' style={{color: 'white'}}>
                            Digital Safeguard Security is committed to secure property, people and information by
                            providing highly trained private security guards based on trust and confidence. Along with
                            generic security services we develop security programs according to the specific needs of
                            clients.
                        </p>
                    </Col>
                    <Col lg={4} md={6} sm={12} className='border border-2 rounded p-4 form-bg h-50'
                         style={{backgroundColor: "white"}}>
                        <Row>
                            <Col>
                                <Form onSubmit={handleSubmit}>
                                   <div className='d-flex justify-content-center'> <img src={companyLogo} alt="logo" style={{width: 80}}/></div>
                                    <div style={{height: '12px'}}></div>
                                    <div className="header-form">
                                        {/* <h4 className="text-dark text-center"><i className="fa fa-user-circle" style={{ fontSize: "80px" }}></i></h4> */}
                                        <div className="image">
                                        </div>
                                    </div>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <p style={{fontWeight: "600", fontSize: "17px", marginBottom: "3px"}}>Email:</p>
                                        <Form.Control name="email" type="email" placeholder="Enter email"
                                                      onChange={handleOnChange}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <p style={{
                                            fontWeight: "600",
                                            fontSize: "17px",
                                            marginBottom: "3px"
                                        }}>Password:</p>
                                        <Form.Control name="password" type="password" placeholder="Password"
                                                      onChange={handleOnChange}/>
                                    </Form.Group>

                                    <Button variant="primary" id='button' type="submit">
                                        Login
                                    </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            </Container>
            </div>
        </>
    );
}
