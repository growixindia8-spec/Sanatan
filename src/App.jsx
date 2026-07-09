import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CurrentActivities from './pages/activities/CurrentActivities';
import FutureMissionsPage from './pages/activities/FutureMissions';
import FestivalSevaCalendar from './pages/activities/FestivalSevaCalendar';
import DonationHub from './pages/donate/DonationHub';
import StartFundraiser from './pages/donate/StartFundraiser';
import ViewFundraisers from './pages/donate/ViewFundraisers';
import Media from './pages/Media';
import Portal from './pages/Portal';
import Partners from './pages/Partners';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/activities/current" element={<CurrentActivities />} />
        <Route path="/activities/future-missions" element={<FutureMissionsPage />} />
        <Route path="/activities/festival-seva-calendar" element={<FestivalSevaCalendar />} />
        <Route path="/donate" element={<DonationHub />} />
        <Route path="/donate/start-fundraiser" element={<StartFundraiser />} />
        <Route path="/donate/view-fundraisers" element={<ViewFundraisers />} />
        <Route path="/media" element={<Media />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
    </Router>
  );
}

export default App;
