"use client"

import type React from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { StaffSidebar } from "./staff-sidebar"

interface StaffLayoutProps {
  children: React.ReactNode
  title: string
  activeSection?: string
  onSectionChange?: (section: string) => void
}

export function StaffLayout({ children, title, activeSection, onSectionChange }: StaffLayoutProps) {
  return (
    <SidebarProvider>
      <StaffSidebar activeSection={activeSection} onSectionChange={onSectionChange} />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-blue-100 px-4 bg-gradient-to-r from-white to-blue-50">
          <SidebarTrigger className="-ml-1 text-blue-600" />
          <Separator orientation="vertical" className="mr-2 h-4 bg-blue-200" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium text-blue-800">{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
