import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    review: '',
    suggestion: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', review: '', suggestion: '' }); // Clear form
  };

  return (
    <Container>
      <h2 className="mb-4 text-center">Feedback Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter your name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group controlId="formEmail" >
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter your email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group controlId="formReview" >
          <Form.Label>Review</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Your review..." 
            name="review"
            value={formData.review}
            onChange={handleChange}
            required 
          />
        </Form.Group>

        <Form.Group controlId="formSuggestion" >
          <Form.Label>Suggestion</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Your suggestions..." 
            name="suggestion"
            value={formData.suggestion}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mt-3">
          Submit Feedback
        </Button>
      </Form>

      {submitted && <Alert variant="success" className="mt-3">Thank you for your valuable feedback!</Alert>}
    </Container>
  );
};

export default FeedbackForm;
