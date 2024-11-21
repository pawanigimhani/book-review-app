import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import { useAuth } from '../AuthProvider';

const Login = () => {

  const navigate = useNavigate(); 
  const { login } = useAuth(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', formData);
      console.log('User logged in successfully:', response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      login(decoded.id); 
      navigate('/');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
        <Container>
          <Row className="justify-content-center align-items-center vh-100">
            <Col xs={12} sm={8} md={6} lg={4}>
              <div className="shadow-lg p-4 rounded bg-white">
                <h2 className="text-center mb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
    
                  <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
    
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    style={{
                      backgroundColor: '#007bff',
                      borderColor: '#007bff',
                    }}
                  >
                    Login
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
  );
};

export default Login;
