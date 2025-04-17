import mongoose, { Schema, type Document } from "mongoose"
import type { Campaign } from "../types/campaign"

// Omit the _id field from Campaign to avoid the conflict
export interface CampaignDocument extends Omit<Campaign, "_id">, Document {}

const CampaignSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "DELETED"],
      default: "ACTIVE",
    },
    leads: { type: [String], default: [] },
    accountIDs: { type: [String], default: [] },
  },
  { timestamps: true },
)

export default mongoose.model<CampaignDocument>("Campaign", CampaignSchema)
