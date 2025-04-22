import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HomeRuin.css";
import ImgRule from "../../../assets/media/theruin.png";
import { useNavigate } from "react-router-dom";

const HomeRule = () => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate("/ruin");
  };
  return (
    <div className="home-section-ruin">
      <Container fluid>
        <Row className="align-items-center home-row">
          <Col md={6} className="home-text-container">
            <div className="home-overlay-ruin">
              <h1 className="home-title">The Ruin</h1>
              <h2 className="home-subtitle">We took more than we gave.</h2>
              <p className="home-description">
                But then things started to change. People wanted more — more buildings, more cars, more factories. Trees were cut down, and rivers became dirty. Smoke filled the skies. We started using too much plastic, and it ended up in our oceans...

              </p>
              <Button className="home-button" onClick={handleReadMore}>
                Read More
              </Button>
            </div>
          </Col>
          <Col md={6} className="home-image-container">
            <img
              src={ImgRule}
              alt="Nature"
              className="home-image1"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeRule;
