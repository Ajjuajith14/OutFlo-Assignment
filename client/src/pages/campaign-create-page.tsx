import React from "react";
import CampaignForm from "../components/campaign-form";

const CampaignCreatePage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Create Campaign</h1>
      <CampaignForm />
    </div>
  );
};

export default CampaignCreatePage;