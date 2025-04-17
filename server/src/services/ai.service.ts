import { OpenAI } from "openai";
import type { LinkedInProfile, PersonalizedMessage } from "../types/campaign";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generatePersonalizedMessage = async (profile: LinkedInProfile): Promise<string> => {
  try {
    const prompt = `
      Generate a personalized LinkedIn connection request message to:
      Name: ${profile.name}
      Job Title: ${profile.job_title}
      Company: ${profile.company}
      Location: ${profile.location}
      Summary: ${profile.summary}
      
      The message should:
      1. Be friendly and professional
      2. Reference their specific role and company
      3. Mention how OutFlo can help automate their outreach to increase meetings and sales
      4. Be under 500 characters (LinkedIn connection request limit)
      5. Include a clear call to action
      
      Only return the message text without any additional explanations or formatting.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [
        {
          role: "system",
          content: "You are an expert in writing personalized, concise LinkedIn connection requests that get high acceptance rates."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const message = response.choices[0].message.content?.trim() || "";
    
    console.log("Generated message:", message);
    
    return message;
  } catch (error) {
    console.error("Error generating message with OpenAI:", error);
    throw new Error("Failed to generate personalized message");
  }
};