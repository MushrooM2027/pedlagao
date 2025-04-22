import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HomeRoar.css";
import ImgRoar from "../../../assets/media/theroar.png";
import { useNavigate } from "react-router-dom";

const HomeRoar = () => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate("/roar");
  };
  return (
    <div className="home-section-roar">
      <Container fluid>
        <Row className="align-items-center home-row">
          <Col md={6} className="home-image-container">
            <img
              src={ImgRoar}
              alt="Nature"
              className="home-image"
            />
          </Col>

          <Col md={6} className="home-text-container">
            <div className="home-overlay">
              <h1 className="home-title">The Roar</h1>
              <h2 className="home-subtitle">A movement begins. Led by you.</h2>
              <p className="home-description">
                But there is still hope. People around the world are waking up. Young people are speaking out. Families, schools, and communities are coming together to protect our planet. More people are planting trees. They are cleaning rivers and beaches...
              </p>
              <Button className="home-button" onClick={handleReadMore}>
                Read More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeRoar;
