import cv2
import json
import os

from deepface import DeepFace

# OPEN CAMERA
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
            "capture.jpg",
            frame
        )

        print(
            "Face Captured"
        )

        break

    # ESC KEY
    elif key == 27:

        cap.release()

        cv2.destroyAllWindows()

        exit()

cap.release()

cv2.destroyAllWindows()

# GENERATE EMBEDDING
embedding = DeepFace.represent(

    img_path="capture.jpg",

    model_name="Facenet",

    enforce_detection=False

)

vector = embedding[0]["embedding"]

# SAVE FILE
file_path = "embedding.json"

# LOAD OLD DATA
if os.path.exists(file_path):

    with open(file_path, "r") as file:

        data = json.load(file)

else:

    data = {
        "embeddings": []
    }

# APPEND NEW EMBEDDING
data["embeddings"].append(vector)

# SAVE UPDATED DATA
with open(file_path, "w") as file:

    json.dump(data, file)

print(
    "Embedding Saved Successfully"
)