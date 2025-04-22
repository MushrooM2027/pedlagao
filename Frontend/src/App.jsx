import './App.css'
import HomePage from '../src/pages/homePage/HomePage';
import LoginPage from './pages/loginPage/LoginPage'
import RegistrationPage from '../src/pages/registrationPage/RegistrationPage'
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import SponserPage from './pages/sponsershipPage/SponsershipPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import  Footer  from './components/footer/Footer';
import FeedPage from './pages/feedPage/FeedPage';
import ContributePage from './pages/contributePage/ContributePage'
import RisePage from './pages/risePage/RisePage';
import RoarPage from './pages/roarPage/RoarPage';
import RuinPage from './pages/ruinPage/RuinPage';
import PostPage from './pages/PostPage/PostPage';
import FeedbackFormPage from './pages/FeedbackFormPage/FeedbackPage';
import AboutUsPage from './pages/aboutUsPage/AboutUsPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sponser" element={<SponserPage />} />
        <Route path="/feed" element={<FeedPage/>}/>
        <Route path='/post' element = {<PostPage/>}/>
        <Route path='/rise' element = {<RisePage/>}/>
        <Route path='/roar' element = {<RoarPage/>}/>
        <Route path='/ruin' element = {<RuinPage/>}/>
        <Route path='/contribute' element={<ContributePage/>}/>
        <Route path='/feedback' element={<FeedbackFormPage/>}/>
        <Route path='/aboutUs' element={<AboutUsPage/>}/>

      </Routes>
      <Footer />
    </>
  )
}

export default App