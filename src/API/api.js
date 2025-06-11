import express from 'express';
import sql from 'mssql';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import { spawn } from 'child_process';
import path from 'path';

import { fileURLToPath } from 'url';  // Import necessary functions
import { dirname } from 'path';

const app = express();
const port = 3000;

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 使用 cors 中間件
app.use(cors({
  origin: true,       // ✅ 自動回傳請求的 origin 作為允許來源
  credentials: true   // 如果需要傳 cookies 或授權資訊
}));

app.options('*', cors()); // 預檢處理


app.use(bodyParser.json());

// SQL Server connection configuration
const config = {
  user: 'jack',
  password: 'jack',
  server: 'localhost',
  database: 'Game',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Test connection to SQL Server
async function testConnection() {
  try {
    await sql.connect(config);
    console.log('成功連接到 SQL Server 資料庫！');
  } catch (error) {
    console.error('無法連接到 SQL Server 資料庫:', error);
  } finally {
    sql.close();
  }
}

// Test connection on start
testConnection();

// API for registration
app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;
  try {
    await sql.connect(config);
    const request = new sql.Request();
    const query = `
      INSERT INTO UserData (username, password, email) 
      VALUES (@username, @password, @email)
    `;
    request.input('username', sql.NVarChar, username);
    request.input('password', sql.NVarChar, password);
    request.input('email', sql.NVarChar, email);
    
    await request.query(query);
    res.status(200).json({ success: true, message: '註冊成功！' });
  } catch (error) {
    console.error('註冊失敗:', error);
    res.status(500).json({ success: false, message: '註冊失敗！' });
  } finally {
    sql.close();
  }
});

// API for login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      await sql.connect(config);
      const request = new sql.Request();
      const query = `
        SELECT username, email 
        FROM UserData 
        WHERE username = @username AND password = @password
      `;
      request.input('username', sql.NVarChar, username);
      request.input('password', sql.NVarChar, password);
  
      const result = await request.query(query);
  
      if (result.recordset.length > 0) {
        res.status(200).json({ 
          success: true, 
          message: '登入成功！',
          user: result.recordset[0]
        });
      } else {
        res.status(401).json({ 
          success: false, 
          message: '用戶名或密碼錯誤！' 
        });
      }
    } catch (error) {
      console.error('登入失敗:', error);
      res.status(500).json({ 
        success: false, 
        message: '伺服器錯誤，請稍後重試！' 
      });
    } finally {
      sql.close();
    }
});

// 確保 uploads 資料夾存在
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const time = now.toTimeString().split(' ')[0].replace(/:/g, ''); // hhmmss
    const ext = path.extname(file.originalname);
    const filename = `${year}_${month}_${date}_${time}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';


app.post('/api/predict', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '沒有收到圖片' });
  }

  const imagePath = path.join(uploadDir, req.file.filename);
  const form = new FormData();
  form.append('file', fs.createReadStream(imagePath));

  try {
    const response = await axios.post('http://localhost:5001/predict', form, {
      headers: form.getHeaders()  
    });

    res.json(response.data);
  } catch (error) {
    console.error('Flask API 錯誤:', error.message);
    res.status(500).json({ error: 'Flask API 錯誤' });
  }
});

app.listen(port, '192.168.0.110', () => {
  console.log(`Server running at http://192.168.0.110:${port}`);
});