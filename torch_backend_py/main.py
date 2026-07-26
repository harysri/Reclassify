# from fastapi import FastAPI, File, UploadFile
# from PIL import Image
# import torch
# import torchvision.transforms as transforms
# from torchvision.models import resnet50
# import io

# app = FastAPI()
# MODEL_PATH = "weights/best_resnet50_garbage.pth"
# # Load model
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# model = resnet50()
# model.fc = torch.nn.Linear(model.fc.in_features, 6)
# model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
# model.eval().to(device)

# classes = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash']

# # Transform
# transform = transforms.Compose([
#     transforms.Resize(256),
#     transforms.CenterCrop(224),
#     transforms.ToTensor(),
#     transforms.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
# ])

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     image_bytes = await file.read()
#     image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

#     img_tensor = transform(image).unsqueeze(0).to(device)

#     with torch.no_grad():
#         outputs = model(img_tensor)
#         probs = torch.nn.functional.softmax(outputs[0], dim=0)

#     result = {
#         "class": classes[probs.argmax().item()],
#         "confidence": float(probs.max().item())
#     }

#     return result


# main.py  —  FastAPI waste-classification backend
# Changes vs original:
#   1. Added POST /predict/base64  — accepts JSON { image: "<base64>" }
#      so the proxy can also call it directly without multipart (optional path).
#   2. Added CORS middleware so the React dev server can reach the API
#      directly during development (proxy still recommended for prod).
#   3. Kept the original multipart POST /predict unchanged.
#   4. Inference is now wrapped in asyncio.to_thread so it never blocks
#      the event loop during real-time frame bursts.

import asyncio
import base64
import io

import torch
import torchvision.transforms as transforms
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
from pydantic import BaseModel
from torchvision.models import resnet50

# ── App ──────────────────────────────────────────────────────────────────────
app = FastAPI(title="Waste Classifier API")

# Allow the React dev server (port 3000) and the Express proxy (port 5000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# ── Model ────────────────────────────────────────────────────────────────────
MODEL_PATH = "weights/best_resnet50_garbage.pth"
CLASSES = ["cardboard", "glass", "metal", "paper", "plastic", "trash"]

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = resnet50()
model.fc = torch.nn.Linear(model.fc.in_features, len(CLASSES))
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.eval().to(device)

transform = transforms.Compose(
    [
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
    ]
)


# ── Shared inference helper ───────────────────────────────────────────────────
def _run_inference(image: Image.Image) -> dict:
    """CPU/GPU inference — runs in a thread so it won't block the event loop."""
    img_tensor = transform(image).unsqueeze(0).to(device)
    with torch.no_grad():
        outputs = model(img_tensor)
        probs = torch.nn.functional.softmax(outputs[0], dim=0)
    return {
        "class": CLASSES[probs.argmax().item()],
        "confidence": float(probs.max().item()),
    }


# ── Route 1: multipart file upload (unchanged, kept for compatibility) ────────
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file.")

    # Offload blocking inference to a thread pool
    result = await asyncio.to_thread(_run_inference, image)
    return result


# ── Route 2: JSON base64 (used by the Express proxy / direct from frontend) ──
class Base64ImageRequest(BaseModel):
    image: str  # raw base64 string (no data-URI prefix)


@app.post("/predict/base64")
async def predict_base64(payload: Base64ImageRequest):
    try:
        image_bytes = base64.b64decode(payload.image)
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid base64 image data.")

    result = await asyncio.to_thread(_run_inference, image)
    return result

@app.get("/")
def read_root():
    return {"message": "Server is running!"}
