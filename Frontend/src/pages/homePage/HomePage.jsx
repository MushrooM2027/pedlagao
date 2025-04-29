import HomeTopSection from '../../components/home/homeTopSection/HomeTopSection'
import HomeSecondSection from '../../components/home/homeSecondSection/HomeSecondSection'
import AchievementsSection from '../../components/home/achievement/Achievement';
import HomeRise from '../../components/home/homeRise/HomeRise'
import HomeRule from '../../components/home/homeRuin/HomeRuin'
import HomeRoar from '../../components/home/homeRoar/HomeRoar'
import UserInsights from '../../components/userInsights/UserInsights';
import HomeVisionMission from '../../components/home/homeVisionMission/HomeVisionMission'

const HomePage = () => {
  return (
    <>
      <div className='home-page'>
        <HomeTopSection />
        <HomeSecondSection />
        <HomeRise />
        <HomeRule />
        <HomeRoar />
        <HomeVisionMission />
        <AchievementsSection />
        <UserInsights />
      </div>
    </>
  );
};

export default HomePage;