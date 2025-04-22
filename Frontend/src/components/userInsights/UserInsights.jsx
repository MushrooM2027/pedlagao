import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './UserInsights.css'; // optional for extra styling
import profile from '../../assets/media/profile.jpg';

const testimonials = [
    {
        name: "Anjali Mehra",
        role: "Eco-Activist, Delhi",
        feedback: "PedLagao made it super easy for me to sponsor tree plantations. It feels amazing to give back to the Earth without the hassle. Seeing the location and photo updates makes it feel real!",
        image: profile
    },
    {
        name: "Rahul Kapoor",
        role: "College Student, Pune",
        feedback: "I used to feel helpless about climate change. Through PedLagao, I planted trees on my birthday. It’s now a tradition among my friends. Love this initiative!",
        image: profile
    },
    {
        name: "Meera Joshi",
        role: "Working Mom, Bangalore",
        feedback: "This platform gave me a meaningful way to teach my kids about nature and responsibility. We even visited a plantation site together!",
        image: profile
    }
];

const UserInsights = () => {
    return (
        <Container className="user-insights-container">
            <h2 className="text-center user-insights-title">What People Are Saying</h2>
            <Row>
                {testimonials.map((user, index) => (
                    <Col md={6} lg={4} key={index}>
                        <Card className="mb-4 shadow-sm h-100">
                            <Card.Img variant="top" src={user.image} alt={user.name} />
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{user.role}</Card.Subtitle>
                                <Card.Text>"{user.feedback}"</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>

    );
};

export default UserInsights;
