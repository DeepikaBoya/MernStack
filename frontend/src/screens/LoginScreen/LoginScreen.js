import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import MainScreen from '../../components/MainScreen';
import Button from 'react-bootstrap/Button';
import "./LoginScreen.css";
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login } from "../../actions/userActions";






const LoginScreen = () => {
  const navigate = useNavigate();


const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const dispatch = useDispatch();
const userLogin = useSelector((state) => state.userLogin);
const { loading, error, userInfo } = userLogin;

useEffect(()=>
{
  if(userInfo)
  {
    navigate('/mynotes');
    
  }
},[navigate,userInfo])

const submitHandler=async(e)=>
{
    e.preventDefault();
    console.log(email,password);
    dispatch(login(email, password));
   
}
  return (
    <MainScreen title='LOGIN'>
        <div className='loginContainer'>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {loading && <Loading/>}
         <Form onSubmit={submitHandler}>
    <Form.Group className="mb-3" controlId="formGroupEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" value={email} placeholder="Enter email" 
      onChange={(e)=>setEmail(e.target.value)}
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formGroupPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password"  value={password} placeholder="Password" 
      onChange={(e)=>setPassword(e.target.value)}
      />
    </Form.Group>
    <Button variant="primary" type="submit">
            Submit
          </Button>

    
  </Form>

  <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>

  
    </MainScreen>

   
  )
}

export default LoginScreen


