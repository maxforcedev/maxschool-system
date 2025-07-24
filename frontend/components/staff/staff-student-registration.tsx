"use client"

import React from "react"
import { useState } from "react"
import { ChevronLeft, ChevronRight, User, MapPin, Users, CheckCircle, Plus, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StaffLayout } from "./staff-layout"

interface StudentFormData {
  user: {
    name: string
    email: string
    cpf: string
    phone: string
  }
  birth_date: string
  gender: string
  status: string
  classroom: string
  internal_notes?: string
  address: {
    zip_code: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    reference?: string
  }
  responsibles: Array<{
    user: {
      name: string
      email: string
      cpf: string
      phone: string
    }
    relationship: string
    notes?: string
    use_student_address: boolean
    address?: {
      zip_code: string
      street: string
      number: string
      neighborhood: string
      city: string
      state: string
      reference?: string
    }
  }>
}

const mockClassrooms = [
  { id: "047946a8980849d68733377c5a8bf188", name: "1º Ano A - Manhã" },
  { id: "uuid-2", name: "1º Ano B - Tarde" },
  { id: "uuid-3", name: "2º Ano A - Manhã" },
  { id: "uuid-4", name: "2º Ano B - Tarde" },
  { id: "uuid-5", name: "3º Ano A - Manhã" },
]

const relationshipOptions = [
  { value: "father", label: "Pai" },
  { value: "mother", label: "Mãe" },
  { value: "tutor", label: "Tutor(a)" },
  { value: "grandmother", label: "Avó" },
  { value: "grandfather", label: "Avô" },
  { value: "brother", label: "Irmão" },
  { value: "sister", label: "Irmã" },
  { value: "other", label: "Outro" },
]

const brazilianStates = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

const steps = [
  { id: 1, title: "Dados do Aluno", icon: User, description: "Informações pessoais básicas" },
  { id: 2, title: "Endereço", icon: MapPin, description: "Endereço residencial do aluno" },
  { id: 3, title: "Responsáveis", icon: Users, description: "Dados dos responsáveis" },
]

export function StaffStudentRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const [formData, setFormData] = useState<StudentFormData>({
    user: { name: "", email: "", cpf: "", phone: "" },
    birth_date: "",
    gender: "",
    status: "active",
    classroom: "",
    internal_notes: "",
    address: {
      zip_code: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      reference: "",
    },
    responsibles: [
      {
        user: { name: "", email: "", cpf: "", phone: "" },
        relationship: "",
        notes: "",
        use_student_address: true,
        address: {
          zip_code: "",
          street: "",
          number: "",
          neighborhood: "",
          city: "",
          state: "",
          reference: "",
        },
      },
    ],
  })

  // Máscaras para formatação
  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1")
  }

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1")
  }

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1")
  }

  const addResponsible = () => {
    setFormData({
      ...formData,
      responsibles: [
        ...formData.responsibles,
        {
          user: { name: "", email: "", cpf: "", phone: "" },
          relationship: "",
          notes: "",
          use_student_address: true,
          address: {
            zip_code: "",
            street: "",
            number: "",
            neighborhood: "",
            city: "",
            state: "",
            reference: "",
          },
        },
      ],
    })
  }

  const removeResponsible = (index: number) => {
    if (formData.responsibles.length > 1) {
      const newResponsibles = formData.responsibles.filter((_, i) => i !== index)
      setFormData({ ...formData, responsibles: newResponsibles })
    }
  }

  const updateResponsible = (index: number, field: string, value: any) => {
    const newResponsibles = [...formData.responsibles]
    const [parent, child] = field.split(".")
    if (child) {
      newResponsibles[index] = {
        ...newResponsibles[index],
        [parent]: {
          ...newResponsibles[index][parent as keyof (typeof newResponsibles)[number]],
          [child]: value,
        },
      }
    } else {
      newResponsibles[index] = { ...newResponsibles[index], [field]: value }
    }
    setFormData({ ...formData, responsibles: newResponsibles })
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.user.name &&
          formData.user.email &&
          formData.user.cpf &&
          formData.user.phone &&
          formData.birth_date &&
          formData.gender &&
          formData.classroom
        )
      case 2:
        return (
          formData.address.zip_code &&
          formData.address.street &&
          formData.address.number &&
          formData.address.neighborhood &&
          formData.address.city &&
          formData.address.state
        )
      case 3:
        return formData.responsibles.every(
          (r) =>
            r.user.name &&
            r.user.email &&
            r.user.cpf &&
            r.user.phone &&
            r.relationship &&
            (r.use_student_address ||
              (r.address?.zip_code &&
                r.address?.street &&
                r.address?.number &&
                r.address?.neighborhood &&
                r.address?.city &&
                r.address?.state)),
        )
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsLoading(true)
    setMessage("")

    try {
      const payload = {
        user: formData.user,
        birth_date: formData.birth_date,
        gender: formData.gender,
        status: formData.status,
        classroom: formData.classroom,
        internal_notes: formData.internal_notes,
        address: formData.address,
        responsibles: formData.responsibles.map((responsible) => ({
          user: responsible.user,
          relationship: responsible.relationship,
          notes: responsible.notes,
          ...(responsible.use_student_address ? {} : { address: responsible.address }),
        })),
      }

      console.log("Payload enviado:", JSON.stringify(payload, null, 2))

      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setMessage("Aluno cadastrado com sucesso!")
        // Reset form ou redirecionar
      } else {
        throw new Error("Erro ao cadastrar aluno")
      }
    } catch (error) {
      setMessage("Erro ao cadastrar aluno. Tente novamente.")
      console.error("Erro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const progressPercentage = (currentStep / 3) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="student-name" className="text-sm font-medium text-blue-800">
                  Nome Completo *
                </Label>
                <Input
                  id="student-name"
                  value={formData.user.name}
                  onChange={(e) => setFormData({ ...formData, user: { ...formData.user, name: e.target.value } })}
                  placeholder="Nome completo do aluno"
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-email" className="text-sm font-medium text-blue-800">
                  Email *
                </Label>
                <Input
                  id="student-email"
                  type="email"
                  value={formData.user.email}
                  onChange={(e) => setFormData({ ...formData, user: { ...formData.user, email: e.target.value } })}
                  placeholder="email@exemplo.com"
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-cpf" className="text-sm font-medium text-blue-800">
                  CPF *
                </Label>
                <Input
                  id="student-cpf"
                  value={formData.user.cpf}
                  onChange={(e) =>
                    setFormData({ ...formData, user: { ...formData.user, cpf: formatCPF(e.target.value) } })
                  }
                  placeholder="000.000.000-00"
                  maxLength={14}
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-phone" className="text-sm font-medium text-blue-800">
                  Telefone *
                </Label>
                <Input
                  id="student-phone"
                  value={formData.user.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, user: { ...formData.user, phone: formatPhone(e.target.value) } })
                  }
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birth-date" className="text-sm font-medium text-blue-800">
                  Data de Nascimento *
                </Label>
                <Input
                  id="birth-date"
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium text-blue-800">
                  Gênero *
                </Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecione o gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-blue-800">
                  Status *
                </Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="classroom" className="text-sm font-medium text-blue-800">
                  Turma *
                </Label>
                <Select
                  value={formData.classroom}
                  onValueChange={(value) => setFormData({ ...formData, classroom: value })}
                >
                  <SelectTrigger className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecione a turma" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClassrooms.map((classroom) => (
                      <SelectItem key={classroom.id} value={classroom.id}>
                        {classroom.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="internal-notes" className="text-sm font-medium text-blue-800">
                Observações Internas
              </Label>
              <Textarea
                id="internal-notes"
                value={formData.internal_notes}
                onChange={(e) => setFormData({ ...formData, internal_notes: e.target.value })}
                placeholder="Observações internas sobre o aluno (opcional)"
                rows={4}
                className="resize-none border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="student-cep" className="text-sm font-medium text-blue-800">
                  CEP *
                </Label>
                <Input
                  id="student-cep"
                  value={formData.address.zip_code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, zip_code: formatCEP(e.target.value) },
                    })
                  }
                  placeholder="00000-000"
                  maxLength={9}
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="student-street" className="text-sm font-medium text-blue-800">
                  Rua *
                </Label>
                <Input
                  id="student-street"
                  value={formData.address.street}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })
                  }
                  placeholder="Nome da rua"
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-number" className="text-sm font-medium text-blue-800">
                  Número *
                </Label>
                <Input
                  id="student-number"
                  value={formData.address.number}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, number: e.target.value } })
                  }
                  placeholder="123"
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-neighborhood" className="text-sm font-medium text-blue-800">
                  Bairro *
                </Label>
                <Input
                  id="student-neighborhood"
                  value={formData.address.neighborhood}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, neighborhood: e.target.value } })
                  }
                  placeholder="Nome do bairro"
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-city" className="text-sm font-medium text-blue-800">
                  Cidade *
                </Label>
                <Input
                  id="student-city"
                  value={formData.address.city}
                  onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                  placeholder="Nome da cidade"
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="student-state" className="text-sm font-medium text-blue-800">
                  Estado *
                </Label>
                <Select
                  value={formData.address.state}
                  onValueChange={(value) =>
                    setFormData({ ...formData, address: { ...formData.address, state: value } })
                  }
                >
                  <SelectTrigger className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    {brazilianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="student-reference" className="text-sm font-medium text-blue-800">
                  Referência
                </Label>
                <Input
                  id="student-reference"
                  value={formData.address.reference}
                  onChange={(e) =>
                    setFormData({ ...formData, address: { ...formData.address, reference: e.target.value } })
                  }
                  placeholder="Ponto de referência (opcional)"
                  className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-blue-800">Responsáveis pelo Aluno</h3>
              <Button
                type="button"
                onClick={addResponsible}
                variant="outline"
                size="sm"
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Responsável
              </Button>
            </div>

            {formData.responsibles.map((responsible, index) => (
              <Card key={index} className="border-2 border-blue-100 shadow-sm bg-white/80">
                <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-blue-800">Responsável {index + 1}</CardTitle>
                    {formData.responsibles.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeResponsible(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-blue-800">Nome Completo *</Label>
                      <Input
                        value={responsible.user.name}
                        onChange={(e) => updateResponsible(index, "user.name", e.target.value)}
                        placeholder="Nome completo do responsável"
                        className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-blue-800">Email *</Label>
                      <Input
                        type="email"
                        value={responsible.user.email}
                        onChange={(e) => updateResponsible(index, "user.email", e.target.value)}
                        placeholder="email@exemplo.com"
                        className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-blue-800">CPF *</Label>
                      <Input
                        value={responsible.user.cpf}
                        onChange={(e) => updateResponsible(index, "user.cpf", formatCPF(e.target.value))}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-blue-800">Telefone *</Label>
                      <Input
                        value={responsible.user.phone}
                        onChange={(e) => updateResponsible(index, "user.phone", formatPhone(e.target.value))}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                        className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-blue-800">Grau de Parentesco *</Label>
                      <Select
                        value={responsible.relationship}
                        onValueChange={(value) => updateResponsible(index, "relationship", value)}
                      >
                        <SelectTrigger className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Selecione o parentesco" />
                        </SelectTrigger>
                        <SelectContent>
                          {relationshipOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-blue-800">Observações</Label>
                    <Textarea
                      value={responsible.notes}
                      onChange={(e) => updateResponsible(index, "notes", e.target.value)}
                      placeholder="Observações sobre o responsável (opcional)"
                      rows={3}
                      className="resize-none border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Checkbox
                        id={`use-student-address-${index}`}
                        checked={responsible.use_student_address}
                        onCheckedChange={(checked) => updateResponsible(index, "use_student_address", checked)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <Label
                        htmlFor={`use-student-address-${index}`}
                        className="text-sm font-medium text-blue-800 cursor-pointer"
                      >
                        Usar mesmo endereço do aluno
                      </Label>
                    </div>

                    {!responsible.use_student_address && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-blue-800">CEP *</Label>
                          <Input
                            value={responsible.address?.zip_code || ""}
                            onChange={(e) => updateResponsible(index, "address.zip_code", formatCEP(e.target.value))}
                            placeholder="00000-000"
                            maxLength={9}
                            className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                            required
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label className="text-sm font-medium text-blue-800">Rua *</Label>
                          <Input
                            value={responsible.address?.street || ""}
                            onChange={(e) => updateResponsible(index, "address.street", e.target.value)}
                            placeholder="Nome da rua"
                            className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-blue-800">Número *</Label>
                          <Input
                            value={responsible.address?.number || ""}
                            onChange={(e) => updateResponsible(index, "address.number", e.target.value)}
                            placeholder="123"
                            className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-blue-800">Bairro *</Label>
                          <Input
                            value={responsible.address?.neighborhood || ""}
                            onChange={(e) => updateResponsible(index, "address.neighborhood", e.target.value)}
                            placeholder="Nome do bairro"
                            className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-blue-800">Cidade *</Label>
                          <Input
                            value={responsible.address?.city || ""}
                            onChange={(e) => updateResponsible(index, "address.city", e.target.value)}
                            placeholder="Nome da cidade"
                            className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-blue-800">Estado *</Label>
                          <Select
                            value={responsible.address?.state || ""}
                            onValueChange={(value) => updateResponsible(index, "address.state", value)}
                          >
                            <SelectTrigger className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white">
                              <SelectValue placeholder="UF" />
                            </SelectTrigger>
                            <SelectContent>
                              {brazilianStates.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label className="text-sm font-medium text-blue-800">Referência</Label>
                          <Input
                            value={responsible.address?.reference || ""}
                            onChange={(e) => updateResponsible(index, "address.reference", e.target.value)}
                            placeholder="Ponto de referência (opcional)"
                            className="h-12 border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <StaffLayout title="Cadastrar Aluno" activeSection="register-student">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-3">Cadastro de Aluno</h1>
          <p className="text-lg text-blue-700">Preencha as informações para cadastrar um novo aluno no sistema</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-blue-300 text-blue-400"
                  }`}
                >
                  {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-24 h-1 mx-4 transition-all duration-300 ${
                      currentStep > step.id ? "bg-blue-600" : "bg-blue-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progressPercentage} className="h-2 mb-2" />
          <div className="flex justify-between text-sm text-blue-600">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div className="font-medium">{step.title}</div>
                <div className="text-xs">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Message */}
        {message && (
          <Alert
            className={`mb-6 ${message.includes("sucesso") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            <AlertDescription className={message.includes("sucesso") ? "text-green-800" : "text-red-800"}>
              {message}
            </AlertDescription>
          </Alert>
        )}

        {/* Form Content */}
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="pb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle className="flex items-center space-x-3 text-2xl text-blue-800">
              {React.createElement(steps[currentStep - 1].icon, { className: "w-7 h-7 text-blue-600" })}
              <span>{steps[currentStep - 1].title}</span>
            </CardTitle>
            <p className="text-blue-600 mt-2">{steps[currentStep - 1].description}</p>
          </CardHeader>
          <CardContent className="pb-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="px-8 py-3 h-12 bg-white border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Anterior
          </Button>

          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!validateStep(currentStep)}
              className="px-8 py-3 h-12 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Próximo
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!validateStep(3) || isLoading}
              className="px-8 py-3 h-12 bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Cadastrando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-5 h-5" />
                  <span>Cadastrar Aluno</span>
                </div>
              )}
            </Button>
          )}
        </div>
      </div>
    </StaffLayout>
  )
}
