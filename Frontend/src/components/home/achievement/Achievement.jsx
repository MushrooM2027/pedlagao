import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./Achievement.css"; // Custom CSS file
import image1 from '../../../assets/media/treePlanted.png'
import image2 from '../../../assets/media/Contributors.png'
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
      <Container className="py-5">
        <h2 className="text-center text-white mb-5">Our Achievements</h2>
        <Row className="g-4 justify-content-center">
          {achievementsData.map((item, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card className="achievement-card text-center">
                <div className="image-container">
                  <img src={item.image} alt={item.text} className="card-image" />
                </div>
                <Card.Body>
                  <Card.Title className="count">{item.count}+</Card.Title>
                  <Card.Text className="text1">{item.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Achievements;