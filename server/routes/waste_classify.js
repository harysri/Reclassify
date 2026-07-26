// routes/waste_classify.js
// Express gateway proxy — bridges React frontend ↔ FastAPI Python backend

const express = require("express");
const router = express.Router();
const axios = require("axios"); // npm install axios
const FormData = require("form-data"); // npm install form-data

const FASTAPI_BASE_URL = process.env.FASTAPI_URL || "http://127.0.0.1:8000";

/**
 * POST /api/waste/classify
 *
 * Accepts : { image: "data:image/jpeg;base64,<...>" }  ← what the frontend sends
 *         | { image: "<raw base64 string>" }            ← also accepted
 * Returns : { wasteType: string, confidence: string }
 */
router.post("/classify", async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image data provided." });
    }

    // Strip data-URI prefix if present → "/9j/..." raw base64
    const base64Data = image.includes(",") ? image.split(",")[1] : image;

    // Decode base64 → binary Buffer
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Build multipart/form-data — field name must be "file" to match FastAPI
    const form = new FormData();
    form.append("file", imageBuffer, {
      filename: "frame.jpg",
      contentType: "image/jpeg",
    });

    // Forward to FastAPI /predict using axios (no node-fetch ESM issues)
    const fastapiRes = await axios.post(`${FASTAPI_BASE_URL}/predict`, form, {
      headers: {
        ...form.getHeaders(), // sets correct multipart boundary
      },
      timeout: 10000, // 10 s — enough for real-time frames
    });

    // FastAPI returns: { class: "plastic", confidence: 0.9341 }
    // Frontend expects: { wasteType: "plastic", confidence: "93.4" }
    const { class: wasteType, confidence } = fastapiRes.data;

    return res.json({
      wasteType,
      confidence: (confidence * 100).toFixed(1),
    });
  } catch (err) {
    // Axios wraps HTTP errors — unwrap for a cleaner log
    if (err.response) {
      console.error(`FastAPI error ${err.response.status}:`, err.response.data);
      return res.status(502).json({
        error: "FastAPI classification failed.",
        detail: err.response.data,
      });
    }
    console.error("Proxy route error:", err.message);
    return res.status(500).json({
      error: "Internal proxy error.",
      detail: err.message,
    });
  }
});

module.exports = router;
