import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portal from './pages/Portal';
import { PortalAuthProvider } from './context/PortalAuthContext';
import { LanguageProvider } from './i18n/LanguageContext.jsx';

function PortalApp() {
  return (
    <LanguageProvider>
      <PortalAuthProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<Portal />} />
          </Routes>
        </Router>
      </PortalAuthProvider>
    </LanguageProvider>
  );
}

export default PortalApp;
