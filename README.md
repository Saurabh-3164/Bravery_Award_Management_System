# 🏅 Bravery Award Management System

**Bravery Award Management System** is a full-stack web platform designed to recognize and reward acts of extraordinary courage. The system allows nominees to register with detailed stories, and integrates AI to generate follow-up questions and analyze submissions for category suggestions.

This is the completed version with full frontend, backend, database, and AI integration.

---

## 📦 Tech Stack

### 🖥️ Frontend
- React.js (with Vite)
- React Router
- Modular CSS (separate per component)
- Axios

### 🔙 Backend
- Node.js + Express.js
- OpenAI API for follow-up questions & analysis
- dotenv, cors

### 🗃️ Database
- MySQL

---

## ✅ Features

### 🌐 Landing Page
- Responsive UI
- Sections:
  - Home
  - About Us
  - Guidelines
  - Award Categories
  - Previous Winners
  - Gallery
  - News / Announcements
  - FAQ
  - Contact Us
  - Register / Login

### 📝 Nominee Registration (Multi-step Form)
1. Basic Details (Name, Age, Contact, Address)
2. Award Category Selection
3. Story / Incident Description
   - AI-generated follow-up questions based on user input
4. Nominated By (Parent / School / NGO)
5. Review & Submit

### 🤖 AI Integration
- **Follow-up Question Generation**: After the nominee describes their story, the system uses OpenAI to generate relevant follow-up questions.
- **AI Analysis**: Suggests the most suitable award category based on story content using natural language understanding.

---


## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Bravery_Award_Management_System.git
cd Bravery_Award_Management_System
```

---

### 2. Set Up MySQL Database

- Create a database:

```sql
CREATE DATABASE bravery_award;
```

- Import schema:

```bash
mysql -u root -p bravery_award < database/schema.sql
```

---

### 3. Configure Backend

```bash
cd server
npm install
```

- Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bravery_award
GEMINI_KEY = GEMINI_KEY
```

- Start the server:

```bash
node server.js
```

---

### 4. Run Frontend

```bash
cd client
npm install
npm run dev
```

---

## 👨‍💻 Developed By

- **Saurabh** – Full Stack Developer  
*(Add contributors if any)*

---

## 📝 License

MIT License

---

## 📷 Screenshots

> Add UI screenshots of:
> - Landing Page  
> - Nominee Form  
> - AI-generated questions

---

## 🔗 Repository

[GitHub Repo → Bravery_Award_Management_System](https://github.com/Saurabh-3164/Bravery_Award_Management_System.git)
