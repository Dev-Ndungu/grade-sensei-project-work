# Grade Management System (GMS)

## Overview  
The **Grade Management System (GMS)** is a web-based platform designed to automate student grading processes in **Kenyan secondary schools**. It replaces manual grade recording with a **secure, efficient, and user-friendly** system for **teachers, administrators, and students**.  

## Features  
### ✅ User Roles & Authentication  
- **Teachers**: Enter grades, generate reports, and monitor student progress.  
- **Administrators**: Manage users, configure settings, and oversee grading processes.  
- **Students**: View grades and download report cards.  
- Secure login with **JWT authentication** & **role-based access control (RBAC)**.  

### 📊 Grade Entry & Reporting  
- Teachers can **input grades per subject**.  
- Automatic **average calculation** & **class ranking**.  
- Generate **PDF report cards** and **performance analytics**.  

### 🔒 Security & Data Integrity  
- **Encrypted database storage** for student records.  
- **Audit logs** track grade modifications.  
- **Role-based access control (RBAC)** for system security.  

### 🌐 Technology Stack  
- **Frontend**: React.js + Tailwind CSS  
- **Backend**: Django + Django REST Framework  
- **Database**: PostgreSQL  
- **Deployment**: Docker, AWS/GCP  

---

## 🚀 Installation & Setup  
### 1️⃣ Prerequisites  
Ensure you have the following installed:  
- Node.js & npm  
- Python & Django  
- PostgreSQL  
- Docker (for deployment)  

### 2️⃣ Clone the Repository  
```sh
git clone https://github.com/yourusername/grade-management-system.git
cd grade-management-system
