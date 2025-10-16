# 🚀 RAGPilot

**RAGPilot** is an AI-powered assistant built with **Retrieval-Augmented Generation (RAG)**. It combines **vector search** with **Large Language Models (LLMs)** to deliver accurate, context-aware responses. Powered by **Qdrant** for vector storage and **JWT authentication** for security, it’s production-ready and developer-friendly.

---

## 🌟 Features

- **Context-Aware Answers** – Retrieves relevant data before generating responses.
- **Fast Vector Search (Qdrant)** – Efficient similarity search for embeddings.
- **JWT Authentication** – Secure access to API endpoints.
- **Clean REST APIs** – Easy to integrate with any frontend.
- **Modular Structure** – Well-organized codebase for scalability.

---

## 🛠 Tech Stack

- **Frontend** React.js, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB
- **Vector Database:** Qdrant
- **Authentication:** JWT
- **AI Integration:** AzureOpenAIAPI

---

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/RAGPilot.git
cd frontend
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
QDRANT_API_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_key
OPENAI_API_KEY=your_openai_key
JWT_SECRET=your_jwt_secret
```

### 4. Start the Server

```bash
npm run dev
```

Server runs at: [http://localhost:5000](http://localhost:5000)

---

## 🔐 Authentication

Include your JWT token in API requests:

```
Authorization: Bearer <your_token>
```

---

## 📡 API Endpoints

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| POST   | /auth/login | Login & get JWT token |
| POST   | /rag        | Query RAGPilot        |

---

## 🚀 Deployment

Compatible with Render, Railway, AWS EC2, Heroku, etc.  
Set environment variables on your hosting provider.

---

## 📬 Contact

- GitHub: [yatharth1cr](https://github.com/yatharth1cr)
- Email: yatharthgiri187@gmail.com
