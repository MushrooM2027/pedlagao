import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import logo from '../../assets/media/logo.png';
import ProfileImg from '../../assets/media/profile.jpg';
import coinImg from '../../assets/media/coin.png';
import './Header.css';
import axios from 'axios';

const Header = () => {
    const { isLoggedIn, logout, user } = useAuth();
    const navigate = useNavigate(); // ✅ initialize useNavigate
    const [coinBalance, setCoinBalance] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const closeDropdown = () => setShowDropdown(false);

    useEffect(() => {
        if (isLoggedIn && user?.UserId) {
            axios
                .get(`http://localhost:3000/api/users/coinBalance/${user.UserId}`)
                .then((response) => {
                    setCoinBalance(response.data.coinBalance);
                })
                .catch((error) => {
                    console.error('Error fetching coin balance:', error);
                });
        }
    }, [isLoggedIn, user?.UserId]);

    const handleLogout = () => {
        logout();             // clear auth state
        closeDropdown();      // close dropdown
        navigate('/home');    // ✅ redirect to /home
    };

    return (
        <Navbar className="navbar sticky-top" expand="lg" collapseOnSelect>
            <Container className='container'>
                <img src={logo} alt="PedLagao" className="logo" />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/contribute">Contribute</Nav.Link>
                        <Nav.Link as={Link} to="/feed">Feed</Nav.Link>
                        <Nav.Link as={Link} to="/aboutUs">About</Nav.Link>
                        <Nav.Link as={Link} to="/feedback">Feedback</Nav.Link>
                    </Nav>

                    <div className="merge d-flex align-items-center position-relative ms-auto">
                        <div className="coin-box d-flex align-items-center me-3">
                            <img src={coinImg} alt="Coins" className="coin-icon" />
                            <span className="coin-text">{coinBalance}</span>
                        </div>
                    </div>

                    {isLoggedIn ? (
                        <div className="profile-dropdown">
                            <img
                                src={ProfileImg}
                                alt="Profile"
                                className="profile-icon"
                                onClick={toggleDropdown}
                                style={{ cursor: 'pointer' }}
                            />
                            {showDropdown && (
                                <div className="dropdown-menu show">
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Nav.Link as={Link} to="/login">
                            <div className="login-icon">
                                <img src={ProfileImg} alt="Profile" className="profile-icon" />
                            </div>
                        </Nav.Link>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
