import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import image from '../../../assets/media/home2.svg';
import { useAuth } from '../../../context/AuthContext';
import './HomeSecondSection.css';

function HomeSecondSection() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const handleClick = () => {
        if (isLoggedIn) {
            navigate('/sponser');
        } else {
            alert('Access Denied: You must be logged in to sponsor a tree.');
        }
    };

    return (
        <div className='homeSecondSection'
            style={{ backgroundImage: `url(${image})` }}>
            <Container>
                <Row className="justify-content-start align-items-center h-100">
                    <Col lg={6} md={8} sm={12}>
                        <div className='home_quote2'>
                            <h1 className='home-title'>Heal the Planet - One Tree at a Time</h1>
                            <p>Join us in our mission — plant a tree, revive forests, protect wildlife and take a stand against climate change. Let’s grow a greener tomorrow together!</p>
                            <button className='btn1' onClick={handleClick}>
                                Sponsor a tree
                            </button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomeSecondSection;
