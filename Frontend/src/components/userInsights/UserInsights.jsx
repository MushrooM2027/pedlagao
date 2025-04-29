import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './UserInsights.css'; // optional for extra styling
import profile from '../../assets/media/aditya.png';

const testimonials = [
    {
        name: "Anjali Mehra",
        feedback: "PedLagao made it super easy for me to sponsor tree plantations. It feels amazing to give back to the Earth without the hassle. Seeing the location and photo updates makes it feel real!",
        image: profile
    },
    {
        name: "Rahul Kapoor",
        feedback: "I used to feel helpless about climate change. Through PedLagao, I planted trees on my birthday. It’s now a tradition among my friends. Love this initiative!",
        image: profile
    },
    {
        name: "Meera Joshi",
        feedback: "This platform gave me a meaningful way to teach my kids about nature and responsibility. We even visited a plantation site together!",
        image: profile
    }
];

const UserInsights = () => {
    return (
        <Container className="user-insights-container">
            <h2 className="text-center user-insights-title" style={{ color: 'black', paddingTop: '3rem', fontSize: '40px' }}>What People Are Saying</h2>
            <Row className='row2 g-4'>
                {testimonials.map((user, index) => (
                    <Col md={6} lg={4} key={index}>
                        <Card className="mb-4 shadow-sm h-100">
                            <Card.Body>
                                <Card.Text>"{user.feedback}"</Card.Text>
                            </Card.Body>
                            <div className="horizontal-line"></div>
                            <div className='card-footer1'>
                                <img className='card-img1' src={user.image} alt={user.name} />
                                <strong className='card-name'> {user.name}</strong>
                            </div>

                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>

    );
};

export default UserInsights;
