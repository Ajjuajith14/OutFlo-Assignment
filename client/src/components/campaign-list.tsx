import React, { useState, useEffect } from "react";
import type { Campaign } from "../types";
import { fetchCampaigns, deleteCampaign, updateCampaign } from "../services/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useToast } from "../hooks/use-toast";

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const data = await fetchCampaigns();
      setCampaigns(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load campaigns",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCampaign(id);
      toast({
        title: "Success",
        description: "Campaign deleted successfully",
      });
      loadCampaigns();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete campaign",
        variant: "destructive",
      });
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await updateCampaign(id, { status: newStatus });
      toast({
        title: "Success",
        description: `Campaign ${newStatus === "ACTIVE" ? "activated" : "deactivated"} successfully`,
      });
      loadCampaigns();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update campaign status",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading campaigns...</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.length === 0 ? (
        <div className="col-span-full text-center py-10">
          <p className="text-muted-foreground">No campaigns found. Create your first campaign!</p>
        </div>
      ) : (
        campaigns.map((campaign) => (
          <Card key={campaign._id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{campaign.name}</CardTitle>
              <CardDescription>{campaign.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{campaign.status === "ACTIVE" ? "Active" : "Inactive"}</span>
                    <Switch
                      checked={campaign.status === "ACTIVE"}
                      onCheckedChange={() => handleStatusToggle(campaign._id!, campaign.status)}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium">Leads:</span>
                  <p className="text-sm text-muted-foreground">{campaign.leads.length} leads</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Accounts:</span>
                  <p className="text-sm text-muted-foreground">{campaign.accountIDs.length} accounts</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => (window.location.href = `/campaigns/edit/${campaign._id}`)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(campaign._id!)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};

export default CampaignList;