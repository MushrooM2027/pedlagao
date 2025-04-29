import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './HomeVisionMission.css';

const HomeVisionMission = () => {
  return (
    <div className="vision-mission-section">
      <Container className='container1'>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center">
            <h1 className="section-title">Our Vision & Mission</h1>
            <p className="section-subtitle">What drives us forward and keeps us rooted.</p>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-4 d-flex justify-content-center">
            <Card className="vision-card">
              <Card.Body>
                <h2 className="card-title">Our Vision</h2>
                <p className="card-text">
                  We envision a future where nature and humanity thrive in harmony — a world where every individual feels empowered to take part in environmental change, and every small effort contributes to a larger, greener purpose.<br></br>

                  Our platform exists to bridge the gap between awareness and action, making environmental contribution accessible to everyone — from a schoolchild planting their first sapling to organizations launching large-scale afforestation efforts. We believe that technology, when used with purpose, can be a powerful force for ecological restoration.<br></br>

                  In this future, every tree planted tells a story — of love, of memory, of hope — and leaves behind a legacy that will breathe life into our planet for generations. Whether you are planting in honor of someone, sponsoring a greener neighborhood, or documenting environmental journeys, our ecosystem celebrates your impact.<br></br>
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4 d-flex justify-content-center">
            <Card className="mission-card">
              <Card.Body>
                <h2 className="card-title">Our Mission</h2>
                <p className="card-text">
                  Enable Environmental Action: Provide a platform for people to sponsor and request tree plantations, turning intentions into real impact on the ground.<br></br>

                  Build a Connected Community: Foster a strong community of contributors, planters, and nature lovers who care about sustainability and environmental well-being.<br></br>

                  Promote Transparency & Trust: Ensure every contribution — whether it's a planted tree or shared story — is visible, traceable, and celebrated.<br></br>

                  Educate & Inspire: Raise awareness about climate change, sustainability, and the importance of green cover, especially for younger generations.<br></br>

                  Encourage Local Involvement: Support grassroots efforts by making it easy for local heroes to request help for greening their spaces.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeVisionMission;
