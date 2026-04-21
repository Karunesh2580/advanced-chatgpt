# 🚀 Advanced ChatGPT Clone (Full Stack AI App)

This project is a **full-stack ChatGPT-like AI application** with:

* 🔐 Authentication (Login / Signup)
* 💬 Chat system with sidebar history
* 🤖 AI responses using Ollama (LLaMA 3)
* 🎨 Modern UI (React + Tailwind)
* 🗂 Chat management (new chat, delete chat)

---

# 📦 Project Structure

```
advanced-chatgpt/
 ├── frontend/   (React App)
 ├── backend/    (Node + Express API)
 └── README.md
```

---

# ⚙️ REQUIREMENTS

Make sure the following are installed:

* Node.js (v18+ recommended)
* MongoDB (local or Compass)
* Ollama

---

# 🧩 SETUP INSTRUCTIONS

Follow these steps carefully:

---

# 🔹 STEP 1: Extract Project

Extract the ZIP file and open the project folder:

```
advanced-chatgpt
```

---

# 🔹 STEP 2: BACKEND SETUP

Open CMD / Terminal:

```
cd advanced-chatgpt/backend
```

Install dependencies:

```
npm install
```

---

## 📄 Create `.env` File

Inside `backend` folder, create a file named:

```
.env
```

Add this:

```
MONGO_URI=mongodb://127.0.0.1:27017/chatgpt
PORT=5000
```

---

# 🔹 STEP 3: START MONGODB

Run MongoDB:

```
mongod
```

OR open MongoDB Compass

---

# 🔹 STEP 4: SETUP OLLAMA (AI)

Start Ollama:

```
ollama serve
```

If you see error like:

```
Only one usage of each socket address...
```

👉 Ignore it (means already running)

---

## Run Model

```
ollama run llama3
```

Test:

```
What is JavaScript?
```

Exit:

```
Ctrl + C
```

---

# 🔹 STEP 5: RUN BACKEND

In backend folder:

```
npm start
```

Expected output:

```
Server running on port 5000
MongoDB Connected ✅
```

---

# 🔹 STEP 6: FRONTEND SETUP

Open new CMD:

```
cd advanced-chatgpt/frontend
```

Install dependencies:

```
npm install
```

---

# 🔹 STEP 7: RUN FRONTEND

```
npm start
```

App will open in browser:

```
http://localhost:3000
```

---

# 🎯 FEATURES

* ✅ Signup / Login system
* ✅ User name display
* ✅ ChatGPT-style UI
* ✅ Sidebar chat history
* ✅ New chat creation
* ✅ Delete chat (right-click)
* ✅ AI typing animation
* ✅ Welcome animation ("What can I help you?")
* ✅ Dark / Light mode
* ✅ Feedback modal

---

# ⚠️ TROUBLESHOOTING

## ❌ Login / Signup Failed

* Check backend running
* Check MongoDB running
* Check `.env` file

---

## ❌ No AI Response

Run:

```
ollama serve
```

---

## ❌ Port Issues

Make sure:

* Backend → port 5000
* Frontend → port 3000

---

# 💡 OPTIONAL FIX

If dependency error occurs:

```
npm install axios bcryptjs jsonwebtoken mongoose cors dotenv
```

---

# 👨‍💻 AUTHOR

Made with ❤️ by **Karunesh Pandey**

---

# 🚀 FUTURE UPGRADES

* 💾 Save chat history in database
* 🌐 Deploy (Netlify + Railway)
* ⚡ Real-time streaming responses
* 👤 User profile & avatar
* 🔔 Notifications

---

# 🎉 DONE

Now your AI app is ready to run locally on any system 🚀
