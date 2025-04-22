import HomeTopSection from '../../components/home/homeTopSection/HomeTopSection'
import HomeSecondSection from '../../components/home/homeSecondSection/HomeSecondSection'
import AchievementsSection from '../../components/home/achievement/Achievement';
import HomeRise from '../../components/home/homeRise/HomeRise'
import HomeRule from '../../components/home/homeRuin/HomeRuin'
import HomeRoar from '../../components/home/homeRoar/HomeRoar'
import UserInsights from '../../components/userInsights/UserInsights';

const HomePage = () => {
  return (
    <>
      <HomeTopSection/>
      <HomeSecondSection/>
      <HomeRise/>
      <HomeRule/>
      <HomeRoar/>
      <AchievementsSection/>
      <UserInsights/>
    </>
  );
};

export default HomePage;