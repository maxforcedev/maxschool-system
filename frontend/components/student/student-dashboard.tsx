"use client"

import {
  BookOpen,
  GraduationCap,
  Calendar,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { User, Grade, Schedule, Message, Assignment } from "../../types"

interface StudentDashboardProps {
  currentUser: User
  activeSection: string
  grades: Grade[]
  schedule: Schedule[]
  messages: Message[]
  assignments: Assignment[]
}

export function StudentDashboard({
  currentUser,
  activeSection,
  grades,
  schedule,
  messages,
  assignments,
}: StudentDashboardProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bom dia"
    if (hour < 18) return "Boa tarde"
    return "Boa noite"
  }

  const calculateAverage = () => {
    if (grades.length === 0) return 0
    const sum = grades.reduce((acc, grade) => acc + grade.value, 0)
    return sum / grades.length
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Saudação */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {getGreeting()}, {currentUser.name}! 👋
              </h1>
              <p className="text-gray-600">Sua média geral é {calculateAverage().toFixed(1)}</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🎓</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{calculateAverage().toFixed(1)}</p>
                <p className="text-sm text-gray-600">Média Geral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{assignments.length}</p>
                <p className="text-sm text-gray-600">Atividades</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{messages.filter((m) => !m.read).length}</p>
                <p className="text-sm text-gray-600">Mensagens</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{schedule.length}</p>
                <p className="text-sm text-gray-600">Aulas Hoje</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Aulas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Aulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedule.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.subject}</h3>
                    <p className="text-sm text-gray-600">{item.teacher}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.time}</p>
                  <p className="text-sm text-gray-600">{item.classroom}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Atividades Pendentes */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Pendentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assignments
              .filter((a) => a.status === "pending")
              .map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <div>
                      <h3 className="font-semibold">{assignment.title}</h3>
                      <p className="text-sm text-gray-600">{assignment.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Entrega: {new Date(assignment.dueDate).toLocaleDateString("pt-BR")}
                    </p>
                    <Badge variant="outline">Pendente</Badge>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderGrades = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Minhas Notas</h1>

      {/* Resumo das Notas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{calculateAverage().toFixed(1)}</div>
              <p className="text-gray-600">Média Geral</p>
              <Progress value={calculateAverage() * 10} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{grades.filter((g) => g.value >= 7).length}</div>
              <p className="text-gray-600">Notas Acima da Média</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{grades.filter((g) => g.value < 7).length}</div>
              <p className="text-gray-600">Notas Abaixo da Média</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Notas */}
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matéria</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.subject}</TableCell>
                  <TableCell>
                    <Badge variant={grade.value >= 7 ? "default" : "destructive"}>{grade.value.toFixed(1)}</Badge>
                  </TableCell>
                  <TableCell className="capitalize">{grade.type}</TableCell>
                  <TableCell>{new Date(grade.date).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    {grade.value >= 7 ? (
                      <Badge variant="default">Aprovado</Badge>
                    ) : (
                      <Badge variant="destructive">Recuperação</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderSchedule = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Meus Horários</h1>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dia</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Matéria</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead>Sala</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.day}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.teacher}</TableCell>
                  <TableCell>{item.classroom}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderAssignments = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Minhas Atividades</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {assignment.status === "completed" ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : assignment.status === "overdue" ? (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-orange-500" />
                  )}
                  <Badge
                    variant={
                      assignment.status === "completed"
                        ? "default"
                        : assignment.status === "overdue"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {assignment.status === "completed"
                      ? "Concluída"
                      : assignment.status === "overdue"
                        ? "Atrasada"
                        : "Pendente"}
                  </Badge>
                </div>
              </div>

              <h3 className="font-semibold text-gray-800 mb-2">{assignment.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{assignment.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Matéria:</span>
                  <span className="font-medium">{assignment.subject}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Entrega:</span>
                  <span className="font-medium">{new Date(assignment.dueDate).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Minhas Mensagens</h1>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`hover:shadow-md transition-shadow ${!message.read ? "border-blue-200 bg-blue-50" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{message.subject}</h3>
                    <p className="text-sm text-gray-600">De: {message.from}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!message.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  <span className="text-sm text-gray-500">{new Date(message.date).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
              <p className="text-gray-700">{message.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  switch (activeSection) {
    case "dashboard":
      return renderDashboard()
    case "grades":
      return renderGrades()
    case "schedule":
      return renderSchedule()
    case "assignments":
      return renderAssignments()
    case "messages":
      return renderMessages()
    default:
      return renderDashboard()
  }
}
