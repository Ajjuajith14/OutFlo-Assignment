import React from "react";
import CampaignForm from "../components/campaign-form";

const CampaignEditPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Edit Campaign</h1>
      <CampaignForm isEditing />
    </div>
  );
};

export default CampaignEditPage;