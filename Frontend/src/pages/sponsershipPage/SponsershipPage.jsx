import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SponsorPlantForm from '../../components/forms/sponsershipPlantForm/SponsershipPlantForm';

function SponsershipPage() {
    const { isLoggedIn } = useAuth();

        if (!isLoggedIn) {
            return (
              <div className="login-prompt">
                <h3 style={{textAlign:"center"}}>You need to be logged in to view this page.</h3>
                <p style={{textAlign:"center"}}>Please log in to view the feed.</p>
              </div>
            );
          }

    return (
        <>
            <div className="min-h-screen bg-green-50 flex items-center justify-center">
                {isLoggedIn && <SponsorPlantForm />}
            </div>
        </>
    );
}

export default SponsershipPage;
