// src/app/core/mock-data.ts

export interface IDepartment {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  departmentId: number;
}

// Mock Departments
export const departments: IDepartment[] = [
  { id: 1, name: "Human Resources" },
  { id: 2, name: "IT" },
  { id: 3, name: "Finance" },
];

// Mock Users
export const users: IUser[] = [
  { id: 1, name: "Alice Smith", email: "alice@company.com", departmentId: 1 },
  { id: 2, name: "Bob Johnson", email: "bob@company.com", departmentId: 2 },
  { id: 3, name: "Charlie Brown", email: "charlie@company.com", departmentId: 2 },
  { id: 4, name: "Diana Prince", email: "diana@company.com", departmentId: 3 },
  { id: 5, name: "Ethan Hunt", email: "ethan@company.com", departmentId: 1 },
];
