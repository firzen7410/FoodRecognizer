import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# === 類別名稱 ===
class_names = [
    'caesar_salad', 'cheesecake', 'donuts', 'dumplings',
    'french_fries', 'fried_rice', 'pizza', 'ramen', 'steak', 'sushi'
]

# === 載入模型 ===
model = tf.keras.models.load_model("food_classifier_modelv2.h5")

# === 設定測試資料資料夾 ===
test_dir = "test_dataset"  # <-- 改成你的資料路徑
img_size = (224, 224)
batch_size = 32

# === 建立測試資料產生器 ===
test_datagen = ImageDataGenerator(rescale=1./255)

test_generator = test_datagen.flow_from_directory(
    test_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    shuffle=False  # 評估時不要打亂順序
)

# === 進行預測 ===
predictions = model.predict(test_generator, verbose=1)
y_pred = np.argmax(predictions, axis=1)
y_true = test_generator.classes

# === 分類報告 ===
print(classification_report(y_true, y_pred, target_names=class_names))

# === 混淆矩陣 ===
cm = confusion_matrix(y_true, y_pred)
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', xticklabels=class_names, yticklabels=class_names, cmap="Blues")
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()
