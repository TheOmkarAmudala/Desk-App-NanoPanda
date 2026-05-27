import cv2
import json
from deepface import DeepFace

cap = cv2.VideoCapture(0)

ret, frame = cap.read()

if not ret:

    print("Camera capture failed")
    exit()

cv2.imwrite("capture.jpg", frame)

cap.release()

embedding = DeepFace.represent(
    img_path="capture.jpg",
    model_name="Facenet",
    enforce_detection=False
)

vector = embedding[0]["embedding"]

data = {
    "embedding": vector
}

with open("embedding.json", "w") as file:
    json.dump(data, file)

print("Embedding saved")