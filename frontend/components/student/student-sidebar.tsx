"use client"

import { BookOpen, GraduationCap, MessageSquare, Calendar, FileText, LogOut, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UserSwitcher } from "../user-switcher"
import type { User as UserType } from "../../types"

const studentMenuItems = [
  {
    title: "Dashboard",
    icon: BookOpen,
    url: "#dashboard",
    key: "dashboard",
  },
  {
    title: "Notas",
    icon: GraduationCap,
    url: "#grades",
    key: "grades",
  },
  {
    title: "Horários",
    icon: Calendar,
    url: "#schedule",
    key: "schedule",
  },
  {
    title: "Atividades",
    icon: FileText,
    url: "#assignments",
    key: "assignments",
  },
  {
    title: "Mensagens",
    icon: MessageSquare,
    url: "#messages",
    key: "messages",
  },
]

interface StudentSidebarProps {
  users: UserType[]
  currentUser: UserType
  onUserChange: (user: UserType) => void
  activeSection: string
  onSectionChange: (section: string) => void
}

export function StudentSidebar({
  users,
  currentUser,
  onUserChange,
  activeSection,
  onSectionChange,
}: StudentSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">MaxSchool</h2>
            <p className="text-sm text-gray-600">Portal do Aluno</p>
          </div>
        </div>
        <UserSwitcher users={users} currentUser={currentUser} onUserChange={onUserChange} />
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {studentMenuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange(item.key)}
                    isActive={activeSection === item.key}
                    className="h-12 px-4 rounded-lg transition-all duration-200 hover:shadow-md"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 px-4 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
