import tensorflow as tf # type: ignore
import numpy as np
from tensorflow.keras.preprocessing import image # type: ignore
import json
import sys
import os

# ---------- 參數 ----------
model_path = os.path.join(os.path.dirname(__file__), "food_classifier_modelv2.h5")
class_names_path = "src/AI/class_names.json"
img_size = (224, 224)

# ---------- 取得圖片路徑參數 ----------
if len(sys.argv) < 2:
    print("請提供圖片路徑作為參數", file=sys.stderr)
    sys.exit(1)

img_path = sys.argv[1]

# ---------- 載入模型 ----------
model = tf.keras.models.load_model(model_path)

# ---------- 類別名稱 ----------
if os.path.exists(class_names_path):
    with open(class_names_path, "r", encoding="utf-8") as f:
        class_indices = json.load(f)
    class_names = [None] * len(class_indices)
    for name, idx in class_indices.items():
        class_names[idx] = name
else:
    class_names = [
        'caesar_salad', 'cheesecake', 'donuts', 'dumplings',
        'french_fries', 'fried_rice', 'pizza', 'ramen', 'steak', 'sushi'
    ]

# ---------- 圖片預處理 ----------
img = image.load_img(img_path, target_size=img_size)
img_array = image.img_to_array(img)
img_array = img_array / 255.0
img_array = np.expand_dims(img_array, axis=0)

# ---------- 預測 ----------
predictions = model.predict(img_array, verbose=0)
prob = float(np.max(predictions))  # 轉成原生 float
predicted_index = int(np.argmax(predictions))
predicted_class = class_names[predicted_index]

# ---------- 終端輸出結果（回傳給 Node.js 使用） ----------
output = {
    "class": predicted_class,
    "confidence": round(prob * 100, 2)
}

print(json.dumps(output, ensure_ascii=False))  # 用 JSON 格式輸出
