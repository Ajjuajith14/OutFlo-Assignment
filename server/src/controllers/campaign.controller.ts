import type { Request, Response } from "express";
import CampaignModel from "../models/campaign.model";
import type { Campaign } from "../types/campaign";

export const getAllCampaigns = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaigns = await CampaignModel.find({ status: { $ne: "DELETED" } });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
};

export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await CampaignModel.findById(req.params.id);

    if (!campaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    if (campaign.status === "DELETED") {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaign", error });
  }
};

export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaignData: Campaign = req.body;
    const newCampaign = await CampaignModel.create(campaignData);
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(500).json({ message: "Error creating campaign", error });
  }
};

export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaignData: Partial<Campaign> = req.body;
    const updatedCampaign = await CampaignModel.findByIdAndUpdate(
      req.params.id, 
      campaignData, 
      { new: true }
    );

    if (!updatedCampaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: "Error updating campaign", error });
  }
};

export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedCampaign = await CampaignModel.findByIdAndUpdate(
      req.params.id, 
      { status: "DELETED" }, 
      { new: true }
    );

    if (!deletedCampaign) {
      res.status(404).json({ message: "Campaign not found" });
      return;
    }

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting campaign", error });
  }
};