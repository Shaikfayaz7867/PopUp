// server.js
import express from "express";
import cors from "cors";
import getTwitterMedia from "get-twitter-media";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));


app.get("/api/test", (req, res) => {
  console.log("✅ Got request");
  res.json({ message: "✅ Backend reachable" });
});

// API route to get download links
app.post("/api/download", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: "URL is required" });

    // Fetch media info
    const media = await getTwitterMedia(url, { download: false });

    res.json({
      success: true,
      media // array of objects with type, url, size, quality
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Failed to fetch media" });
  }
});

app.listen(5000, "0.0.0.0", () => console.log("Server running on 0.0.0.0:5000"));
