import image from '../../assets/media/logo.png';
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer">
      <Container fluid className="footer-container">
        <Row>
          <Col md={3} sm={6} className="footer-section">
            <img src={image} alt="PedLagao" className="logo_footer" />
            <h3>Contact</h3>
            <p>Email: pedlagao.official@gmail.com</p>
            <p>Phone: +91-9771657739</p>
          </Col>

          <Col md={3} sm={6} className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/home">Home</a></li>
              <li><a href="/sponser">Plant a Tree</a></li>
              <li><a href="/contribute">Sponser a Tree</a></li>
              <li><a href="/login">Login/Register</a></li>
              <li><a href="/login">Login/Register</a></li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="footer-section">
            <h3>About Us</h3>
            <p>PedLagao is dedicated to making the planet greener, one tree at a time.</p>
          </Col>

          <Col md={3} sm={6} className="footer-section">
            <h3>Follow Us</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </Col>
        </Row>
      </Container>

      <div className="footer-bottom">
        <p className='copyrt'>&copy; {new Date().getFullYear()} PedLagao.com | All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;