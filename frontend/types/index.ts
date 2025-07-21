export interface User {
  id: string
  name: string
  email: string
  role: "teacher" | "student"
  avatar?: string
}

export interface Class {
  id: string
  name: string
  subject: string
  year: string
  shift: string
  studentCount: number
  teacher: string
}

export interface Student {
  id: string
  name: string
  email: string
  classId: string
  avatar?: string
}

export interface Grade {
  id: string
  studentId: string
  subject: string
  value: number
  maxValue: number
  date: string
  type: "prova" | "trabalho" | "participacao"
}

export interface Schedule {
  id: string
  subject: string
  teacher: string
  time: string
  day: string
  classroom: string
}

export interface Message {
  id: string
  from: string
  to: string
  subject: string
  content: string
  date: string
  read: boolean
}

export interface Assignment {
  id: string
  title: string
  description: string
  subject: string
  dueDate: string
  status: "pending" | "completed" | "overdue"
}
