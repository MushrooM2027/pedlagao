import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import image2 from "../../assets/media/logo.png";
import "./AboutUs.css";
import anjali from '../../assets/media/anjali.jpg'
import aditya from '../../assets/media/aditya.png'
import utsaw from '../../assets/media/utsaw.png'
import rajan from '../../assets/media/rajan.png'

const teamMembers = [
  {
    name: "Aditya Prakash",
    img: aditya,
  },
  {
    name: "Anjali Kumari",
    img: anjali,
  },
  {
    name: "Rajan Kumar",
    img: rajan,
  },
  {
    name: "Suhani Singh",
    img: (image2),
  },
  {
    name: "Utsaw Kumar",
    img: utsaw,
  },
];

const AboutUs = () => {
  return (
    <div className="about-section">
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col md={10}>
            <h1 className="about-title">About PedLagao</h1>
            <h2 className="about-subtitle">Let’s Grow Together</h2>
            <p className="about-description">
            Our platform empowers individuals to make a difference by sponsoring a tree in memory of someone special or for a noble cause.
            Each tree represents hope, healing, and sustainability. Whether you're celebrating a birthday, honoring a loved one,
            or simply contributing to a greener future — our service allows you to do so meaningfully. With a user-friendly sponsorship form, plant selection, personalized dedications, and donation options,
            we make the process heartfelt and impactful. Together, we grow forests of remembrance, love, and environmental commitment.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center mt-5">
          <Col md={12}>
            <h2 className="team-heading text-center mb-4">Meet Our Team</h2>
            <Row className="g-4 justify-content-center">
              {teamMembers.map((member, index) => (
                <Col key={index}sm={12} md={6} lg={3}>
                  <Card className="team-card text-center p-3">
                    <Card.Img variant="top" src={member.img} className="team-image" />
                    <Card.Body>
                      <Card.Title className="team-name">{member.name}</Card.Title>
                      <Card.Text className="team-role">{member.role}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;