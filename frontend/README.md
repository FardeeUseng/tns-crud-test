# Angular Department Management Frontend

Frontend สำหรับระบบจัดการ Department (Add / Edit / Delete / List)  
สร้างด้วย Angular (Standalone Components), Tailwind CSS และ SweetAlert2

---

## 🛠 Tech Stack
- Angular 15+ (Standalone Components)
- Tailwind CSS (Styling)
- SweetAlert2 (Alert / Confirm Dialogs)
- HttpClient (สำหรับเรียก API)
- Reactive Forms (Form Validation)

---

## โครงสร้างโปรเจค

src/
├── app/
│   ├── features/                         # ✅ เก็บ feature แต่ละ module (แยก domain ชัดเจน)
│   │   ├── department/                   # Feature: Department Management
│   │   │   ├── components/               # UI component เฉพาะ feature นี้
│   │   │      ├── department-list/
│   │   │      │   ├── department-list.component.ts          # Logic แสดงรายการ department
│   │   │      │   ├── department-list.component.html        # Template
│   │   │      ├── department-form/
│   │   │          ├── department-form.component.ts          # Logic ฟอร์ม Add/Edit
│   │   │          ├── department-form.component.html        # Template ฟอร์ม
│   │   │
│   │   ├── user/                        # Feature: User Management
│   │      ├── components/
│   │         ├── user-list/
│   │         │   ├── user-list.component.ts
│   │         │   ├── user-list.component.html
│   │         ├── user-form/
│   │             ├── user-form.component.ts
│   │             ├── user-form.component.html
│   │
│   ├── shared/                          # ✅ เก็บสิ่งที่ใช้ซ้ำได้ในหลาย feature
│   │   ├── components/                  # UI ที่ใช้ซ้ำ เช่น modal, button
│   │   │   └── modal/                   
│   │   │       ├── modal.component.ts
│   │   │       └── modal.component.html
│   │   ├── services/                    
│   │   │   ├── department.service.ts    # Service กลางที่เรียก API
│   │   │   └── user.service.ts          
│   │   └── models/                      # Interface / TypeScript model
│   │       ├── department.model.ts     
│   │       └── user.model.ts            
│   │
│   ├── app.component.ts                 # Root component
│   ├── app.component.html
│   ├── app.config.ts                    
│   └── app.routes.ts                               
│
├── styles.css                     
│
├── main.ts                              
└── index.html                           

## ⚡ การใช้งาน

### 1. ติดตั้ง dependencies
npm install

### 2. รัน Angular dev server
ng serve
