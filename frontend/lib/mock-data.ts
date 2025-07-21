import type { User, Class, Student, Grade, Schedule, Message, Assignment } from "../types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Prof. Maria Silva",
    email: "maria.silva@maxschool.com",
    role: "teacher",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao.santos@maxschool.com",
    role: "student",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export const mockClasses: Class[] = [
  {
    id: "1",
    name: "9º Ano A",
    subject: "Matemática",
    year: "2024",
    shift: "Manhã",
    studentCount: 32,
    teacher: "Prof. Maria Silva",
  },
  {
    id: "2",
    name: "8º Ano B",
    subject: "Matemática",
    year: "2024",
    shift: "Tarde",
    studentCount: 28,
    teacher: "Prof. Maria Silva",
  },
  {
    id: "3",
    name: "7º Ano A",
    subject: "Matemática",
    year: "2024",
    shift: "Manhã",
    studentCount: 30,
    teacher: "Prof. Maria Silva",
  },
]

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ana Costa",
    email: "ana.costa@maxschool.com",
    classId: "1",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Pedro Lima",
    email: "pedro.lima@maxschool.com",
    classId: "1",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Carla Souza",
    email: "carla.souza@maxschool.com",
    classId: "1",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export const mockGrades: Grade[] = [
  {
    id: "1",
    studentId: "2",
    subject: "Matemática",
    value: 8.5,
    maxValue: 10,
    date: "2024-01-15",
    type: "prova",
  },
  {
    id: "2",
    studentId: "2",
    subject: "Português",
    value: 9.0,
    maxValue: 10,
    date: "2024-01-20",
    type: "trabalho",
  },
  {
    id: "3",
    studentId: "2",
    subject: "História",
    value: 7.5,
    maxValue: 10,
    date: "2024-01-18",
    type: "prova",
  },
]

export const mockSchedule: Schedule[] = [
  {
    id: "1",
    subject: "Matemática",
    teacher: "Prof. Maria Silva",
    time: "07:30 - 08:20",
    day: "Segunda-feira",
    classroom: "Sala 101",
  },
  {
    id: "2",
    subject: "Português",
    teacher: "Prof. João Oliveira",
    time: "08:20 - 09:10",
    day: "Segunda-feira",
    classroom: "Sala 102",
  },
  {
    id: "3",
    subject: "História",
    teacher: "Prof. Ana Santos",
    time: "09:30 - 10:20",
    day: "Segunda-feira",
    classroom: "Sala 103",
  },
]

export const mockMessages: Message[] = [
  {
    id: "1",
    from: "Prof. Maria Silva",
    to: "João Santos",
    subject: "Recuperação de Matemática",
    content: "Olá João, gostaria de conversar sobre sua recuperação em Matemática.",
    date: "2024-01-20",
    read: false,
  },
  {
    id: "2",
    from: "Coordenação",
    to: "João Santos",
    subject: "Reunião de Pais",
    content: "Lembramos que a reunião de pais será na próxima sexta-feira.",
    date: "2024-01-19",
    read: true,
  },
]

export const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Exercícios de Álgebra",
    description: "Resolver os exercícios das páginas 45 a 50 do livro didático.",
    subject: "Matemática",
    dueDate: "2024-01-25",
    status: "pending",
  },
  {
    id: "2",
    title: "Redação sobre Meio Ambiente",
    description: "Escrever uma redação de 20 linhas sobre preservação ambiental.",
    subject: "Português",
    dueDate: "2024-01-22",
    status: "completed",
  },
]
