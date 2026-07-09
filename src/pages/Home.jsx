import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustBadgesStrip from '../components/TrustBadgesStrip';
import UtilityBar from '../components/UtilityBar';
import WhoWeAre from '../components/WhoWeAre';
import KeyActivities from '../components/KeyActivities';
import FutureMissions from '../components/FutureMissions';
import LongTermCommitment from '../components/LongTermCommitment';
import MissionStatusTabs from '../components/MissionStatusTabs';
import ActiveFundraisers from '../components/ActiveFundraisers';
import VolunteerEcosystem from '../components/VolunteerEcosystem';
import WhyChooseUs from '../components/WhyChooseUs';
import TrustVerificationPortal from '../components/TrustVerificationPortal';
import CulturalMediaHub from '../components/CulturalMediaHub';
import MonthlyGiving from '../components/MonthlyGiving';
import DonationHub from '../components/DonationHub';
import CsrPartnerships from '../components/CsrPartnerships';
import FestivalCalendar from '../components/FestivalCalendar';
import MembersNotice from '../components/MembersNotice';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <UtilityBar />
      <TrustBadgesStrip />
      <WhoWeAre />
      <KeyActivities />
      <FutureMissions />
      <LongTermCommitment />
      <MissionStatusTabs />
      <ActiveFundraisers />
      <VolunteerEcosystem />
      <WhyChooseUs />
      <TrustVerificationPortal />
      <CulturalMediaHub />
      <MonthlyGiving />
      <DonationHub />
      <CsrPartnerships />
      <FestivalCalendar />
      <MembersNotice />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
