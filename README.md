# Moodio Pro - SaaS Platform for Emotional Health Professionals

---

## 📌 Overview

Moodio Pro is a SaaS platform specifically designed for therapists, coaches, and emotional health professionals to manage their practice efficiently.

The platform includes:

- Therapist registration & authentication
- Therapist private dashboard
- Patient management system (create, read, update, delete)
- Public therapist profile page
- Secure multi-tenant architecture
- Expandable architecture for future monetization (SaaS billing, subscriptions, analytics, etc.)

This project is actively in development and follows SaaS best practices.

---

## 🚀 Tech Stack

### Frontend

- React.js
- React Router
- Axios (API integration)
- Plain CSS (minimal, clean SaaS design)

### Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL Database
- JWT Authentication
- Bcrypt (password encryption)
- dotenv (environment variables)

---

## 📂 Project Structure


Moodio-Pro/
│
├── client/          # Frontend (React.js)
│   └── src/
│       ├── pages/        # Page level components (Login, Register, PatientForm, PatientList, TherapistProfile, Dashboard, etc.)
│       ├── components/   # Reusable UI components (Navbar, Inputs, Buttons, Forms)
│       └── services/     # Axios configuration & API calls
│
├── server/          # Backend (Node.js + Express.js + Sequelize ORM)
│   ├── controllers/  # Business logic (auth, patients, therapist profile, sessions)
│   ├── models/       # Sequelize models (MySQL DB)
│   ├── routes/       # API routes (auth, patients, therapists, sessions)
│   └── middlewares/  # Auth middlewares (JWT verification)
│
└── README.md        # Full professional documentation


## ⚙ Installation

### 1️⃣ Clone the repository

\`\`\`bash
git clone https://github.com/matiascaparotta/moodio-pro.git
cd moodio-pro
\`\`\`

### 2️⃣ Install dependencies

**Backend:**

\`\`\`bash
cd server
npm install
\`\`\`

**Frontend:**

\`\`\`bash
cd ../client
npm install
\`\`\`

### 3️⃣ Create environment variables

You will need a `.env` file in `/server` with the following variables:

\`\`\`env
PORT=5001
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=moodio_pro
JWT_SECRET=your_secret_key
\`\`\`

✅ Make sure your MySQL server is running and `moodio_pro` database exists.

---

## 🏃 Run the project

### Start Backend

\`\`\`bash
cd server
node app.js
\`\`\`

### Start Frontend

\`\`\`bash
cd client
npm start
\`\`\`

---

## 🚀 Current Functionalities

- ✅ Therapist registration & login (JWT protected)
- ✅ Secure token authentication (multi-tenant)
- ✅ Patient management CRUD (each therapist manages only their patients)
- ✅ Therapist public profile page (`/therapists/:id`)
- ✅ SaaS scalable architecture prepared for billing, sessions, notes, audio logs and more.

---

## 🔒 SaaS Roadmap (Next Sprints)

- ✅ Therapist dashboard after profile creation
- ✅ Therapist profile edition
- ✅ Therapist public profile for patients
- 🔜 Session management module
- 🔜 SaaS Billing & Subscription Layer
- 🔜 Admin panel
- 🔜 Deploy (Render, PlanetScale, Vercel)

---

## 📖 Author

Matías Caparotta

---

## 🏆 Status

✅ MVP v1.0 SaaS Stable Core Completed  
🚀 Actively growing as a SaaS vertical product
