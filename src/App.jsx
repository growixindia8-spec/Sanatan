import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import CategoryJoinPage from './pages/CategoryJoinPage';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsConditions from './pages/legal/TermsConditions';
import RefundCancellationPolicy from './pages/legal/RefundCancellationPolicy';

// Portal & CSR
import Portal from './pages/Portal';
import CsrProfile from './pages/partners/CsrProfile';
import PortalProtectedRoute from './components/portal/PortalProtectedRoute';

// Portal Auth Context
import { PortalAuthProvider } from './context/PortalAuthContext';

// Admin Auth and Layout
import Admin from './pages/Admin';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

// Admin Operational Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDonations from './pages/admin/AdminDonations';
import AdminMembers from './pages/admin/AdminMembers';
import AdminMembershipApplications from './pages/admin/AdminMembershipApplications';
import AdminFundraisers from './pages/admin/AdminFundraisers';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminCsrEnquiries from './pages/admin/AdminCsrEnquiries';
import AdminContactEnquiries from './pages/admin/AdminContactEnquiries';
import AdminNewsletter from './pages/admin/AdminNewsletter';
import AdminFestivals from './pages/admin/AdminFestivals';
import AdminContent from './pages/admin/AdminContent';
import AdminReports from './pages/admin/AdminReports';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';

function App() {
  return (
    <>
      <SplashScreen />
      <PortalAuthProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>
              {/* Admin Panel Routes */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<Admin />} />

              <Route element={<AdminProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/donations" element={<AdminDonations />} />
                  <Route path="/admin/members" element={<AdminMembers />} />
                  <Route path="/admin/membership-applications" element={<AdminMembershipApplications />} />
                  <Route path="/admin/fundraisers" element={<AdminFundraisers />} />
                  <Route path="/admin/complaints" element={<AdminComplaints />} />
                  <Route path="/admin/csr-enquiries" element={<AdminCsrEnquiries />} />
                  <Route path="/admin/contact-enquiries" element={<AdminContactEnquiries />} />
                  <Route path="/admin/newsletter" element={<AdminNewsletter />} />
                  <Route path="/admin/festivals" element={<AdminFestivals />} />
                  <Route path="/admin/content" element={<AdminContent />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
                </Route>
              </Route>

              {/* Portal Routes */}
              <Route path="/portal/*" element={<Portal />} />

              {/* Public Website Routes */}
              <Route path="/join-the-mission" element={<JoinTheMission />} />
              <Route path="/join-the-mission/:categorySlug" element={<CategoryJoinPage />} />
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
              <Route path="/csr-profile" element={<CsrProfile />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/raise-a-complaint" element={<RaiseComplaint />} />
              <Route path="/community-voices" element={<CommunityVoices />} />
              <Route path="/legal-documents" element={<LegalDocuments />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/refund-policy" element={<RefundCancellationPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatbotWidget />
          </Router>
        </AdminAuthProvider>
      </PortalAuthProvider>
    </>
  );
}

export default App;
