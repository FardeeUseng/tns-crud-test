# Backend API - .NET 8 + PostgreSQL

โปรเจคนี้เป็น **RESTful API** ที่สร้างด้วย .NET 8 และใช้ **Entity Framework Core** ในการเชื่อมต่อกับฐานข้อมูล PostgreSQL  

รองรับการทำงานกับ 2 ตารางหลัก:
- **Departments** (แผนก)
- **Users** (ผู้ใช้งาน) โดย 1 Department สามารถมี Users ได้หลายคน (1 : N)

---

## Features
- CRUD (Create, Read, Update, Delete) สำหรับ Department และ User
- รองรับการเชื่อมต่อ PostgreSQL
- จัดการ Database migrations ด้วย `dotnet ef`

---

## Project Structure

Backend/
├─ Controllers/
│  ├─ DepartmentsController.cs      // API ของ Department
│  └─ UsersController.cs            // API ของ User
│
├─ Data/
│  └─ AppDbContext.cs               // EF Core DbContext
│
├─ DTOs/
│  ├─ DepartmentDto.cs              // โครงสร้างข้อมูลตอบกลับ/รับเข้า Department
│  └─ UserDto.cs                    // โครงสร้างข้อมูลตอบกลับ/รับเข้า User
│
├─ Models/
│  ├─ Department.cs                 // Entity Department (มี Users หลายคน)
│  └─ User.cs                       // Entity User (ถือ DepartmentId)
│
├─ Migrations/                      // ไฟล์ migration (ถูกสร้างโดย EF)
│
├─ Program.cs
├─ appsettings.json
├─ appsettings.Development.json    
├─ Backend.csproj
└─ README.md

## Database Schema
- **Departments**
  - `Id` (PK, int)
  - `Name` (string, required)

- **Users**
  - `Id` (PK, int)
  - `Name` (string, required)
  - `Email` (string, unique)
  - `DepartmentId` (FK → Departments.Id)

## ⚙️ Setup & Run

### 1. Install dependencies

dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Swashbuckle.AspNetCore

### 2. Install dependencies
dotnet ef migrations add InitialCreate
dotnet ef database update

### 3. Run API
dotnet run