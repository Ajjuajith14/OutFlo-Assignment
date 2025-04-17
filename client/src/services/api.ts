import type { Campaign, LinkedInProfile, PersonalizedMessage } from "../types"

// Use Netlify Functions in production, local server in development
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : process.env.REACT_APP_API_URL || "http://localhost:5000";

// Campaign API calls
export const fetchCampaigns = async (): Promise<Campaign[]> => {
  console.log("Fetching campaigns from:", `${API_URL}/campaigns`);
  const response = await fetch(`${API_URL}/campaigns`)
  if (!response.ok) {
    throw new Error("Failed to fetch campaigns")
  }
  return response.json()
}

export const fetchCampaignById = async (id: string): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch campaign")
  }
  return response.json()
}

export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
  console.log("Creating campaign at:", `${API_URL}/campaigns`);
  console.log("Campaign data:", campaign);
  
  const response = await fetch(`${API_URL}/campaigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  })
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("API error:", errorText);
    throw new Error(`Failed to create campaign: ${errorText}`)
  }
  
  return response.json()
}

export const updateCampaign = async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  })
  if (!response.ok) {
    throw new Error("Failed to update campaign")
  }
  return response.json()
}

export const deleteCampaign = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("Failed to delete campaign")
  }
}

// LinkedIn Message API calls
export const generatePersonalizedMessage = async (profile: LinkedInProfile): Promise<PersonalizedMessage> => {
  const response = await fetch(`${API_URL}/personalized-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  })
  if (!response.ok) {
    throw new Error("Failed to generate personalized message")
  }
  return response.json()
}