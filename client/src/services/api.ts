import type { Campaign, LinkedInProfile, PersonalizedMessage } from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Campaign API calls
export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await fetch(`${API_URL}/campaigns`);
  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }
  return response.json();
};

export const fetchCampaignById = async (id: string): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch campaign");
  }
  return response.json();
};

export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  });
  if (!response.ok) {
    throw new Error("Failed to create campaign");
  }
  return response.json();
};

export const updateCampaign = async (
  id: string,
  campaign: Partial<Campaign>
): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  });
  if (!response.ok) {
    throw new Error("Failed to update campaign");
  }
  return response.json();
};

export const deleteCampaign = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete campaign");
  }
};

// LinkedIn Message API calls
export const generatePersonalizedMessage = async (
  profile: LinkedInProfile
): Promise<PersonalizedMessage> => {
  const response = await fetch(`${API_URL}/personalized-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });
  if (!response.ok) {
    throw new Error("Failed to generate personalized message");
  }
  return response.json();
};