
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { createEngine } from "./rules/engine";
import { extractFactsFromCoverageJSON } from "./utils/fact-extractor";

dotenv.config();
const app = express();

app.use(express.static("public"));
const PORT = process.env.PORT || 3000;

const KNMI_EDR_API_URL = "https://api.dataplatform.knmi.nl/edr/v1/collections/10-minute-in-situ-meteorological-observations/locations/0-20000-0-06260";

app.get("/api/weather-status", async (req, res) => {
  try {
    const datetime = new Date().toISOString().split("T")[0] + "T00:00:00Z";
    const response = await axios.get(`${KNMI_EDR_API_URL}?f=CoverageJSON&datetime=${datetime}`, {
      headers: {
        Accept: "application/prs.coverage+json",
        Authorization: process.env.KNMI_API_KEY || ""
      }
    });

    const facts = extractFactsFromCoverageJSON(response.data);
    const engine = createEngine();

    Object.entries(facts).forEach(([key, value]) => engine.addFact(key, value));

    const result = await engine.run();
    const status = result.events?.[0]?.params?.status ?? "unknown";

    res.json({ ...facts, status });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch or evaluate data", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
