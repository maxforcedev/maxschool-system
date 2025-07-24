"use client"

import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  UserPlus,
  BarChart3,
} from "lucide-react"
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

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
    key: "dashboard",
  },
  {
    title: "Alunos",
    icon: Users,
    url: "/students",
    key: "students",
  },
  {
    title: "Cadastrar Aluno",
    icon: UserPlus,
    url: "/students/register",
    key: "register-student",
  },
  {
    title: "Professores",
    icon: GraduationCap,
    url: "/teachers",
    key: "teachers",
  },
  {
    title: "Turmas",
    icon: BookOpen,
    url: "/classes",
    key: "classes",
  },
  {
    title: "Horários",
    icon: Calendar,
    url: "/schedule",
    key: "schedule",
  },
  {
    title: "Relatórios",
    icon: BarChart3,
    url: "/reports",
    key: "reports",
  },
  {
    title: "Mensagens",
    icon: MessageSquare,
    url: "/messages",
    key: "messages",
  },
  {
    title: "Configurações",
    icon: Settings,
    url: "/settings",
    key: "settings",
  },
]

interface StaffSidebarProps {
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function StaffSidebar({ activeSection, onSectionChange }: StaffSidebarProps) {
  return (
    <Sidebar className="border-r border-blue-100 bg-gradient-to-b from-blue-50 to-blue-100">
      <SidebarHeader className="border-b border-blue-200 p-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">MaxSchool</h2>
            <p className="text-sm text-blue-100">Portal da Equipe</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 bg-gradient-to-b from-blue-50 to-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => onSectionChange?.(item.key)}
                    isActive={activeSection === item.key}
                    className="h-12 px-4 rounded-xl transition-all duration-200 hover:shadow-md group"
                    style={{
                      backgroundColor: activeSection === item.key ? "#2563eb" : "transparent",
                      color: activeSection === item.key ? "white" : "#1e40af",
                    }}
                  >
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 px-4 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 border border-red-200">
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
