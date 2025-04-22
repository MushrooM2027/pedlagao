import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './HomeTopSection.css';
import home1 from '../../../assets/media/home1.png';

function HomeTopSection() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const saved = JSON.parse(localStorage.getItem("dailyQuote"));

    if (saved && saved.date === today) {
      setQuote(saved.quote);
    } else {
      fetch("/quotes.json")
        .then((res) => res.json())
        .then((data) => {
          const quotes = data.quotes;
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          setQuote(randomQuote);
          localStorage.setItem("dailyQuote", JSON.stringify({ date: today, quote: randomQuote }));
        });
    }
  }, []);

  return (
    <div
      className="homeTopSection"
      style={{ backgroundImage: `url(${home1})` }}
    >
      <Container className="text-container">
        <Row className="justify-content-center align-items-center text-center">
          <Col lg={8} md={10} sm={12}>
            <div className="home_quote1">
              {quote ? (
                <>
                  <h1 className="quote-text">“{quote.text}”</h1>
                  <p className="quote-author">— {quote.author}</p>
                </>
              ) : (
                <h1>Loading Quote...</h1>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeTopSection;