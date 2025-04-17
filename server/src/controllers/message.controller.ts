import type { Request, Response } from "express"
import type { LinkedInProfile, PersonalizedMessage } from "../types/campaign"
import { generatePersonalizedMessage } from "../services/ai.service"

export const createPersonalizedMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const profileData: LinkedInProfile = req.body

    if (!profileData.name || !profileData.job_title || !profileData.company) {
      res.status(400).json({ message: "Missing required profile data" })
      return
    }

    console.log("Generating message for profile:", profileData);

    const message = await generatePersonalizedMessage(profileData)
    
    res.status(200).json({ message })
  } catch (error) {
    console.error("Error in message controller:", error);
    res.status(500).json({ 
      message: "Error generating personalized message", 
      error: error instanceof Error ? error.message : String(error) 
    })
  }
}