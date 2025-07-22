"use client"

import { useState } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { TeacherSidebar } from "./components/teacher-sidebar"
import { StudentSidebar } from "./components/student/student-sidebar"
import { TeacherDashboard } from "./components/teacher-dashboard"
import { StudentDashboard } from "./components/student/student-dashboard"
import {
  mockUsers,
  mockClasses,
  mockStudents,
  mockGrades,
  mockSchedule,
  mockMessages,
  mockAssignments,
} from "./lib/mock-data"

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(mockUsers[0]) // Começa com professor
  const [activeSection, setActiveSection] = useState("dashboard")

  const handleUserChange = (user: (typeof mockUsers)[0]) => {
    setCurrentUser(user)
    setActiveSection("dashboard") // Reset para dashboard quando trocar usuário
  }

  const getSectionTitle = () => {
    const sectionTitles: Record<string, string> = {
      dashboard: "Dashboard",
      classes: "Turmas",
      students: "Alunos",
      grades: "Notas",
      messages: "Mensagens",
      schedule: "Horários",
      assignments: "Atividades",
    }
    return sectionTitles[activeSection] || "Dashboard"
  }

  return (
    <SidebarProvider>
      {currentUser.role === "teacher" ? (
        <TeacherSidebar
          users={mockUsers}
          currentUser={currentUser}
          onUserChange={handleUserChange}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      ) : (
        <StudentSidebar
          users={mockUsers}
          currentUser={currentUser}
          onUserChange={handleUserChange}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      )}

      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4 bg-white">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-gray-700">{getSectionTitle()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <div className="flex-1 p-6 bg-gray-50 min-h-screen">
          {currentUser.role === "teacher" ? (
            <TeacherDashboard
              currentUser={currentUser}
              activeSection={activeSection}
              classes={mockClasses}
              students={mockStudents}
              grades={mockGrades}
              schedule={mockSchedule}
              messages={mockMessages}
            />
          ) : (
            <StudentDashboard
              currentUser={currentUser}
              activeSection={activeSection}
              grades={mockGrades.filter((g) => g.studentId === currentUser.id)}
              schedule={mockSchedule}
              messages={mockMessages.filter((m) => m.to === currentUser.name)}
              assignments={mockAssignments}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
