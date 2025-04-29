import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Achievement.css"; // Custom CSS file
import image1 from '../../../assets/media/treePlanted.png'
import image2 from '../../../assets/media/contributors.png'
import image3 from '../../../assets/media/events.png'
import image4 from '../../../assets/media/cityReached.png'

const achievementsData = [
  {
    text: "Trees Planted",
    image: (image1),
    count: 1200,
  },
  {
    text: "Contributors",
    image: (image2),
    count: 300,
  },
  {
    text: "Events Hosted",
    image: (image3),
    count: 25,
  },
  {
    text: "Cities Reached",
    image: (image4),
    count: 17,
  },
];

const Achievements = () => {
  return (
    <div className="achievements-section">
      <Container className="container2">
        <div className="text-center mb-4">
        <h1 className="section-title1">Our Achievements</h1>
        </div>
        <Row className="g-4 justify-content-center row1">
          {achievementsData.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <div className="image-background">
              <Card className="achievement-card text-center">
                <div className="image-container">
                  <img src={item.image} alt={item.text} className="card-image" />
                </div>
                <Card.Body>
                  <Card.Title className="count1">{item.count}+</Card.Title>
                  <Card.Text className="text1">{item.text}</Card.Text>
                </Card.Body>
              </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Achievements;