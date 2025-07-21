"use client"

import { Clock, Users, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ClassCardProps {
  className: string
  year: string
  shift: string
  studentCount: number
  subject: string
}

export function ClassCard({ className, year, shift, studentCount, subject }: ClassCardProps) {
  const handleLaunchGrades = () => {
    console.log(`Lançar notas para ${className}`)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800 mb-1">{className}</CardTitle>
            <p className="text-sm font-medium" style={{ color: "#43A047" }}>
              {subject}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="text-xs font-medium"
            style={{ backgroundColor: "#E3F2FD", color: "#1E88E5" }}
          >
            {year}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>{shift}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>{studentCount} alunos</span>
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={handleLaunchGrades}
            className="w-full h-10 font-medium transition-all duration-200 hover:shadow-md"
            style={{ backgroundColor: "#1E88E5" }}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Lançar Notas
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
