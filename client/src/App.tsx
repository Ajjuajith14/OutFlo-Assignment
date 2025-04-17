import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import CampaignsPage from "./pages/campaigns-page";
import CampaignCreatePage from "./pages/campaign-create-page";
import CampaignEditPage from "./pages/campaign-edit-page";
import MessageGeneratorPage from "./pages/message-generator-page";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/campaigns" replace />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/campaigns/new" element={<CampaignCreatePage />} />
            <Route path="/campaigns/edit/:id" element={<CampaignEditPage />} />
            <Route path="/message-generator" element={<MessageGeneratorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;