<h1 align="center">💼 Job Portal</h1>

<p align="center">
  <i>a mini linkedin-style system with recruiters and job seekers interacting through a full-stack application</i>
</p>

<p align="center">
  built with react • node • mongodb • and a lot of debugging
</p>

---

## 🚀 Overview

This project is a **full-stack job portal** inspired by real-world platforms like LinkedIn.

It consists of two main user roles:

- 🧑‍💼 **Recruiters** — who can create and manage job listings  
- 👨‍💻 **Job Seekers** — who can explore and apply to jobs  

The focus of this project was to build a complete **end-to-end data flow**, where recruiters post jobs and users can discover and apply to them seamlessly.

It helped me understand how real-world applications handle:
- authentication
- state management
- multiple user roles
- client-server communication

---

## ✨ Features

### 🧑‍💼 Recruiter Side
- Post new job listings  
- Manage and update job postings  
- Basic applicant tracking flow  

---

### 👨‍💻 Job Seeker Side
- Browse available jobs  
- Apply to jobs  
- Manage profile and applications  

---

### 🔄 End-to-End Flow
- Recruiters create jobs → stored in database  
- Jobs are fetched and displayed to users  
- Users apply → application data sent back to backend  
- Maintains a connected system between both roles  

---

### 🔐 Authentication & Security
- User **signup / login system**  
- **JWT-based authentication**  
- Session handling using **cookies**  
- Protected routes  

---

### ⚡ State Management
- Global state handled using **Redux**  
- State persistence using **Redux Persist**  
- Uses **localStorage** for maintaining session data  

---

### 🌐 Full Stack Integration
- RESTful APIs with Express  
- Proper client-server communication  
- Structured API handling and error management  

---

## 🛠️ Tech Stack

### 🧩 Frontend
<p>
  <img src="https://skillicons.dev/icons?i=react,js,ts,html,css" />
</p>

- React.js  
- JavaScript / TypeScript  
- HTML, CSS  

---

### ⚙️ Backend
<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express" />
</p>

- Node.js  
- Express.js  

---

### 🗄️ Database
<p>
  <img src="https://skillicons.dev/icons?i=mongodb" />
</p>

- MongoDB (with Mongoose)

---

### 🔐 Auth & Storage
- JWT (authentication)  
- Cookies (session handling)  
- LocalStorage (Redux Persist)  

---

## 📦 Installation & Setup

1. **Clone the repo**
   
   -->git clone https://github.com/Mohit1423/Reherse-AI_Interview_Trainer

    Start the Backend Server

   -->cd to Backend
   -->Download the required modules using npm i 
   -->in the .env file you need to add the required 

                # PORT = 4000
                # MongoDB
                MONGO_URL=your_mongodb_connection_string

                # JWT signing key
                 SECRET_KEY = Mohit123*
                

                # Cloudinary
                CLOUD_NAME=your_cloudinary_name
                API_KEY=your_cloudinary_api_key
                API_SECRET=your_cloudinary_api_secret

   -->Run the command npm start 

    Start the Frontend Server

    -->cd to Frontend
    -->Download the required modules using npm i 
    -->Add an .env file in which

             #  VITE_API_BASE_URL = http://localhost:4000
   -->run npm run dev

   
   
 Deployment Link : job-portal-six-amber.vercel.app