import RegistrationForm from '../../components/forms/registrationForm/RegistrationForm';
import image from '../../assets/media/regbg.svg';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
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
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;