import express from "express";
import cors from "cors";
import campaignRoutes from "./routes/campaign.routes";
import messageRoutes from "./routes/message.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/campaigns", campaignRoutes);
app.use("/personalized-message", messageRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;