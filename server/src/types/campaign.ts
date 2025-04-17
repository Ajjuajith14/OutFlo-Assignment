export interface Campaign {
      _id?: string;
      name: string;
      description: string;
      status: "ACTIVE" | "INACTIVE" | "DELETED";
      leads: string[]; 
      accountIDs: string[]; 
      createdAt?: Date;
      updatedAt?: Date;
    }
    
    export interface LinkedInProfile {
      name: string;
      job_title: string;
      company: string;
      location: string;
      summary: string;
    }
    
    export interface PersonalizedMessage {
      message: string;
    }