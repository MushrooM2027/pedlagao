import LoginForm from '../../components/forms/loginForm/LoginForm';
// import './LoginPage.css'
import image from '../../assets/media/loginBg.svg';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div
          style={{
            backgroundColor: '#f0f0f0',
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minWidth: '500px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <LoginForm />
        </div>
  );
};

export default LoginPage;