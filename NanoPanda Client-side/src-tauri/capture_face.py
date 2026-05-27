import cv2
import json
import os

from deepface import DeepFace

# =========================
# CREATE STORAGE FOLDER
# =========================

storage_folder = r"C:\Users\Omkar amudala\Desktop\Nanopanda embeeds"

os.makedirs(storage_folder, exist_ok=True)

capture_path = os.path.join(
    storage_folder,
    "capture.jpg"
)

embedding_path = os.path.join(
    storage_folder,
    "embedding.json"
)

# =========================
# OPEN CAMERA
# =========================

cap = cv2.VideoCapture(0)

if not cap.isOpened():

    print("Failed to open camera")
    exit()

print("Press SPACE to capture")
print("Press ESC to exit")

while True:

    ret, frame = cap.read()

    if not ret:
        continue

    cv2.imshow(
        "NanoPanda Verification",
        frame
    )

    key = cv2.waitKey(1)

    # SPACE KEY
    if key == 32:

        cv2.imwrite(
            capture_path,
            frame
        )

        print("Face Captured")

        break

    # ESC KEY
    elif key == 27:

        cap.release()

        cv2.destroyAllWindows()

        exit()

cap.release()

cv2.destroyAllWindows()

# =========================
# GENERATE EMBEDDING
# =========================

embedding = DeepFace.represent(

    img_path=capture_path,

    model_name="Facenet",

    enforce_detection=False

)

vector = embedding[0]["embedding"]

# =========================
# LOAD OLD DATA
# =========================

if os.path.exists(embedding_path):

    with open(embedding_path, "r") as file:

        data = json.load(file)

else:

    data = {
        "embeddings": []
    }

# =========================
# APPEND NEW EMBEDDING
# =========================

data["embeddings"].append(vector)

# =========================
# SAVE UPDATED DATA
# =========================

with open(embedding_path, "w") as file:

    json.dump(data, file)

print("Embedding Saved Successfully")

print(f"Saved at: {embedding_path}")