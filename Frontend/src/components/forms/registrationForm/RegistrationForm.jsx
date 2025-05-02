import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "../../../context/AuthContext";
import './RegistrationForm.css';
import API_URL from '../../../config/api';

const RegistrationForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Name: '',
    Username: '',
    Email: '',
    Password: '',
    City: '',
    Phone: '',
    profilePicture: null
  });
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('Name', form.Name);
      formData.append('Username', form.Username);
      formData.append('Email', form.Email);
      formData.append('Password', form.Password);
      formData.append('City', form.City || '');
      formData.append('Phone', form.Phone || '');
      if (form.profilePicture) {
        formData.append('profilePicture', form.profilePicture);
      }

      const res = await axios.post(`${API_URL}/api/users/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage('Registered Successfully');
      setIsSuccess(true);
      setForm({ Name: '', Username: '', Email: '', Password: '', City: '', Phone: '', profilePicture: null });
      setUser(res.data.user); // Capture user from response
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    if (user) {
      login(user); // pass user to login
      navigate('/home');
    }
  }, [user, navigate, login]);

  return (
    <Container className="register-container">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={6}>
          <Form className="register-form shadow-lg p-4" onSubmit={handleSubmit}>
            <h3 className="text-center mb-4 form-title">Register</h3>

            <Form.Group className="mb-3">
              <Form.Label>Name*</Form.Label>
              <Form.Control type="text" name="Name" placeholder="Enter Name" className="custom-input" required value={form.Name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username*</Form.Label>
              <Form.Control type="text" name="Username" placeholder="Enter Username" className="custom-input" required value={form.Username} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email*</Form.Label>
              <Form.Control type="email" name="Email" placeholder="Enter Email" className="custom-input" required value={form.Email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password*</Form.Label>
              <Form.Control type="password" name="Password" placeholder="Enter Password" className="custom-input" required value={form.Password} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="City" placeholder="Enter City" className="custom-input" value={form.City} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" name="profilePicture" className="custom-input" accept="image/*" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="Phone" placeholder="Enter Phone" className="custom-input" value={form.Phone} onChange={handleChange} />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 custom-btn">Register</Button>

            {message && (
              <p className={`text-center mt-3 ${isSuccess ? 'text-success' : 'text-danger'}`}>{message}</p>
            )}
            <p className="login-link mt-3 text-center">
              Already have an account? <a href="/login">Login</a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
