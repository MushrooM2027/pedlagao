import { useState, useEffect } from "react";
import axios from "axios";
import { Nav } from 'react-bootstrap';
import FormInput from "../../inputField/InputField";
import { Link,useNavigate } from "react-router-dom";
import './LoginForm.css'
import { useAuth } from "../../../context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    identifier: '',
    Password: ''
  });

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/users/login', form);
      console.log('Login response:', res.data);
      setMessage("Login successful!");
      setIsSuccess(true);
      login(res.data.user);
      setUser(true)
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
      setIsSuccess(false);
    }
  };
  useEffect(() => {
    if (user) {
      // login();
      navigate('/home')
    }
  }, [user, navigate])

  return (
    <>
      <Container className="register-container">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={6}>
            <div className="login-form">
              <form onSubmit={handleSubmit} className="form">
                <FormInput
                  type="text"
                  name="identifier"
                  placeholder="Enter Email or Username"
                  onChange={handleChange}
                  value={form.Email}
                  required
                />
                <FormInput
                  type="password"
                  name="Password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  value={form.Password}
                  required
                />
                <div className="forgot-password">
                  <p> <a href="/forgot-password">Forgot your password?</a></p>
                </div>
                <button type="submit">Login</button>
                {message && (
                  <p style={{ color: isSuccess ? 'green' : 'red' }}>{message}</p>
                )}
                <p className="register-link">Don't have an account?<Nav.Link as={Link} to="/register">Register</Nav.Link></p>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;