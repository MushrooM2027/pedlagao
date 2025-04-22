import { useNavigate } from "react-router-dom";
import ContributeFeed from "../../components/contribute/contributeFeed/Contribute";
import FloatingPostButton from '../../components/floatingPostButton/FloatingPostButton'
import './ContributePage.css'
const ContributionPage = () => {
    const navigate = useNavigate();

    const handleSponsorClick = () => {
        navigate('/sponser'); // Navigate to your sponsor form page
    };

    return (
        
            <div>
                <FloatingPostButton onClick={handleSponsorClick} />
                <div className="main-layout">
                <ContributeFeed />
                </div>
            </div>
    );
};

export default ContributionPage;
