import React from "react";
import { Link } from "react-router-dom";
import CampaignList from "../components/campaign-list";
import { Button } from "../components/ui/button";

const CampaignsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <Link to="/campaigns/new">
          <Button>Create Campaign</Button>
        </Link>
      </div>
      <CampaignList />
    </div>
  );
};

export default CampaignsPage;