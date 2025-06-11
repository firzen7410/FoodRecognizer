## 安裝環境

### Python 版本建議
建議使用 Python 3.10 以上

### 安裝套件

請先建立虛擬環境，再安裝依賴：

```bash
python -m venv pyvenv
pyvenv\Scripts\activate  # Windows 系統
# 或 source pyvenv/bin/activate  # macOS/Linux

pip install -r requirements.txt

載入模型api

python predict_api.py
## 環境設定（.env）(api.js)

請在專案根目錄下建立 `.env` 檔案，並填入你的資料庫設定：

```env
DB_USER=你的帳號
DB_PASS=你的密碼
DB_SERVER=localhost 或 IP
DB_NAME=你的資料庫名稱

啟動api

node api.js
