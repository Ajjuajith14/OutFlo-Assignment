import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Campaign } from "../types";
import { fetchCampaignById, createCampaign, updateCampaign } from "../services/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useToast } from "../hooks/use-toast";

interface CampaignFormProps {
  isEditing?: boolean;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ isEditing = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Campaign>({
    name: "",
    description: "",
    status: "ACTIVE",
    leads: [],
    accountIDs: [],
  });

  const [leadsInput, setLeadsInput] = useState<string>("");
  const [accountsInput, setAccountsInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing && id) {
      loadCampaign(id);
    }
  }, [isEditing, id]);

  const loadCampaign = async (campaignId: string) => {
    try {
      setLoading(true);
      const campaign = await fetchCampaignById(campaignId);
      setFormData(campaign);
      setLeadsInput(campaign.leads.join("\n"));
      setAccountsInput(campaign.accountIDs.join("\n"));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load campaign",
        variant: "destructive",
      });
      navigate("/campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLeadsInput(e.target.value);
  };

  const handleAccountsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAccountsInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const leads = leadsInput.split("\n").filter((lead) => lead.trim() !== "");
      const accountIDs = accountsInput.split("\n").filter((account) => account.trim() !== "");

      const campaignData: Campaign = {
        ...formData,
        leads,
        accountIDs,
      };

      if (isEditing && id) {
        await updateCampaign(id, campaignData);
        toast({
          title: "Success",
          description: "Campaign updated successfully",
        });
      } else {
        await createCampaign(campaignData);
        toast({
          title: "Success",
          description: "Campaign created successfully",
        });
      }

      navigate("/campaigns");
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} campaign`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <div className="text-center py-10">Loading campaign data...</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Campaign" : "Create New Campaign"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Campaign Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter campaign name"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter campaign description"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="leads" className="text-sm font-medium">
              LinkedIn Leads (one URL per line)
            </label>
            <Textarea
              id="leads"
              value={leadsInput}
              onChange={handleLeadsChange}
              placeholder="https://linkedin.com/in/profile-1&#10;https://linkedin.com/in/profile-2"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="accounts" className="text-sm font-medium">
              Account IDs (one ID per line)
            </label>
            <Textarea
              id="accounts"
              value={accountsInput}
              onChange={handleAccountsChange}
              placeholder="123&#10;456"
              rows={4}
            />
          </div>

          {isEditing && (
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value as "ACTIVE" | "INACTIVE" | "DELETED" }))
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate("/campaigns")}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update Campaign" : "Create Campaign"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CampaignForm;