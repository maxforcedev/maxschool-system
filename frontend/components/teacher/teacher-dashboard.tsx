"use client"

import { BookOpen, Users, GraduationCap, MessageSquare, Clock, Plus, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { User, Class, Student, Grade, Schedule, Message } from "../../types"

interface TeacherDashboardProps {
  currentUser: User
  activeSection: string
  classes: Class[]
  students: Student[]
  grades: Grade[]
  schedule: Schedule[]
  messages: Message[]
}

export function TeacherDashboard({
  currentUser,
  activeSection,
  classes,
  students,
  grades,
  schedule,
  messages,
}: TeacherDashboardProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bom dia"
    if (hour < 18) return "Boa tarde"
    return "Boa noite"
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
              <p className="text-gray-600">Você tem {classes.length} turmas para gerenciar hoje.</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">📚</span>
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
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{classes.length}</p>
                <p className="text-sm text-gray-600">Turmas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {classes.reduce((total, cls) => total + cls.studentCount, 0)}
                </p>
                <p className="text-sm text-gray-600">Alunos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">8.5</p>
                <p className="text-sm text-gray-600">Média Geral</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{messages.length}</p>
                <p className="text-sm text-gray-600">Mensagens</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Turmas Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Suas Turmas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((cls) => (
              <Card key={cls.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{cls.name}</h3>
                      <p className="text-sm text-green-600">{cls.subject}</p>
                    </div>
                    <Badge variant="secondary">{cls.year}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{cls.shift}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{cls.studentCount} alunos</span>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Lançar Notas
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Turmas</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Turma
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card key={cls.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{cls.name}</h3>
                  <p className="text-green-600 font-medium">{cls.subject}</p>
                </div>
                <Badge variant="secondary">{cls.year}</Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {cls.shift}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {cls.studentCount} alunos
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" size="sm">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Lançar Notas
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Alunos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Alunos</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Aluno
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Turma</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                const studentClass = classes.find((c) => c.id === student.classId)
                return (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{studentClass?.name}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Ver Notas
                        </Button>
                        <Button variant="outline" size="sm">
                          Mensagem
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderGrades = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Notas</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Lançar Nota
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Lançar Nova Nota</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="student">Aluno</Label>
                <Input id="student" placeholder="Selecione o aluno" />
              </div>
              <div>
                <Label htmlFor="subject">Matéria</Label>
                <Input id="subject" placeholder="Matéria" />
              </div>
              <div>
                <Label htmlFor="grade">Nota</Label>
                <Input id="grade" type="number" placeholder="0.0" />
              </div>
              <div>
                <Label htmlFor="type">Tipo</Label>
                <Input id="type" placeholder="Prova, Trabalho, etc." />
              </div>
              <Button className="w-full">Salvar Nota</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Matéria</TableHead>
                <TableHead>Nota</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((grade) => {
                const student = students.find((s) => s.id === grade.studentId)
                return (
                  <TableRow key={grade.id}>
                    <TableCell>{student?.name}</TableCell>
                    <TableCell>{grade.subject}</TableCell>
                    <TableCell>
                      <Badge variant={grade.value >= 7 ? "default" : "destructive"}>{grade.value.toFixed(1)}</Badge>
                    </TableCell>
                    <TableCell className="capitalize">{grade.type}</TableCell>
                    <TableCell>{new Date(grade.date).toLocaleDateString("pt-BR")}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  const renderMessages = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Mensagens</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Mensagem
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{message.from}</span>
                    {!message.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{message.subject}</p>
                  <p className="text-xs text-gray-500">{new Date(message.date).toLocaleDateString("pt-BR")}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Nova Mensagem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="to">Para</Label>
                <Input id="to" placeholder="Destinatário" />
              </div>
              <div>
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" placeholder="Assunto da mensagem" />
              </div>
              <div>
                <Label htmlFor="message">Mensagem</Label>
                <Textarea id="message" placeholder="Digite sua mensagem..." rows={6} />
              </div>
              <Button>Enviar Mensagem</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSchedule = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Horários</h1>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dia</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Matéria</TableHead>
                <TableHead>Sala</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.day}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.classroom}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )

  switch (activeSection) {
    case "dashboard":
      return renderDashboard()
    case "classes":
      return renderClasses()
    case "students":
      return renderStudents()
    case "grades":
      return renderGrades()
    case "messages":
      return renderMessages()
    case "schedule":
      return renderSchedule()
    default:
      return renderDashboard()
  }
}
