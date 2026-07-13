import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CurrentActivities from './pages/activities/CurrentActivities';
import FutureMissionsPage from './pages/activities/FutureMissions';
import FestivalSevaCalendar from './pages/activities/FestivalSevaCalendar';
import DonationHub from './pages/donate/DonationHub';
import StartFundraiser from './pages/donate/StartFundraiser';
import ViewFundraisers from './pages/donate/ViewFundraisers';
import EmergencyFundraiser from './pages/donate/EmergencyFundraiser';
import Media from './pages/Media';
import Partners from './pages/Partners';
import CsrPartnership from './pages/partners/CsrPartnership';
import FaqPage from './pages/more/FaqPage';
import RaiseComplaint from './pages/more/RaiseComplaint';
import CommunityVoices from './pages/more/CommunityVoices';
import LegalDocuments from './pages/more/LegalDocuments';
import ContactUs from './pages/more/ContactUs';
import SplashScreen from './components/shared/SplashScreen';
import ChatbotWidget from './components/shared/ChatbotWidget';
import JoinTheMission from './pages/JoinTheMission';
import { PortalAuthProvider } from './context/PortalAuthContext';
import Admin from './pages/Admin';
function App() {
  return (
    <>
      <SplashScreen />
      <PortalAuthProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/join-the-mission" element={<JoinTheMission />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/activities/current" element={<CurrentActivities />} />
            <Route path="/activities/future-missions" element={<FutureMissionsPage />} />
            <Route path="/activities/festival-seva-calendar" element={<FestivalSevaCalendar />} />
            <Route path="/donate" element={<DonationHub />} />
            <Route path="/donate/start-fundraiser" element={<StartFundraiser />} />
            <Route path="/donate/view-fundraisers" element={<ViewFundraisers />} />
            <Route path="/donate/emergency-fundraiser" element={<EmergencyFundraiser />} />
            <Route path="/media" element={<Media />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/partners/csr" element={<CsrPartnership />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/raise-a-complaint" element={<RaiseComplaint />} />
            <Route path="/community-voices" element={<CommunityVoices />} />
            <Route path="/legal-documents" element={<LegalDocuments />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
          <ChatbotWidget />
        </Router>
      </PortalAuthProvider>
    </>
  );
}

export default App;
