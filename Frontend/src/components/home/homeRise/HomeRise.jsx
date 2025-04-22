import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HomeRise.css";
import ImgRise from "../../../assets/media/therise.png"; 
import { useNavigate } from "react-router-dom";

const HomeRise = () => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate("/rise");
  };

  return (
    <div className="home-section-rise">
      <Container fluid>
        <Row className="align-items-center home-row">
          <Col md={6} className="home-image-container">
            <img
              src={ImgRise}
              alt="Nature"
              className="home-image"
            />
          </Col>

          <Col md={6} className="home-text-container">
            <div className="home-overlay">
              <h1 className="home-title">The Rise</h1>
              <h2 className="home-subtitle">When Earth was whole. Pure. Alive.</h2>
              <p className="home-description">
                Once upon a time, the Earth was full of life. There were thick green forests, clean rivers, and peaceful animals living together in harmony. The sun rose over mountains, and birds filled the skies. Everything was calm and beautiful...
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

export default HomeRise;
