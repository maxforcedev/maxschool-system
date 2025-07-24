"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, User, MapPin, Users, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  { id: "uuid-1", name: "1º Ano A - Manhã" },
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

export function StudentRegistrationForm() {
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

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

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
          ...newResponsibles[index][parent as keyof (typeof newResponsibles)[index]],
          [child]: value,
        },
      }
    } else {
      newResponsibles[index] = { ...newResponsibles[index], [field]: value }
    }
    setFormData({ ...formData, responsibles: newResponsibles })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      // Preparar payload conforme especificado
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

      // Simular requisição POST
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cadastrar Novo Aluno</h1>
          <p className="text-gray-600">Preencha todos os dados necessários para o cadastro do aluno</p>
        </div>

        {message && (
          <Alert
            className={`mb-6 ${message.includes("sucesso") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            <AlertDescription className={message.includes("sucesso") ? "text-green-800" : "text-red-800"}>
              {message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados do Aluno */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Dados do Aluno</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="student-name">Nome Completo *</Label>
                  <Input
                    id="student-name"
                    value={formData.user.name}
                    onChange={(e) => setFormData({ ...formData, user: { ...formData.user, name: e.target.value } })}
                    placeholder="Nome completo do aluno"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="student-email">Email *</Label>
                  <Input
                    id="student-email"
                    type="email"
                    value={formData.user.email}
                    onChange={(e) => setFormData({ ...formData, user: { ...formData.user, email: e.target.value } })}
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="student-cpf">CPF *</Label>
                  <Input
                    id="student-cpf"
                    value={formData.user.cpf}
                    onChange={(e) =>
                      setFormData({ ...formData, user: { ...formData.user, cpf: formatCPF(e.target.value) } })
                    }
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="student-phone">Telefone *</Label>
                  <Input
                    id="student-phone"
                    value={formData.user.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, user: { ...formData.user, phone: formatPhone(e.target.value) } })
                    }
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="birth-date">Data de Nascimento *</Label>
                  <Input
                    id="birth-date"
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gênero *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="classroom">Turma *</Label>
                  <Select
                    value={formData.classroom}
                    onValueChange={(value) => setFormData({ ...formData, classroom: value })}
                  >
                    <SelectTrigger>
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
              <div>
                <Label htmlFor="internal-notes">Observações Internas</Label>
                <Textarea
                  id="internal-notes"
                  value={formData.internal_notes}
                  onChange={(e) => setFormData({ ...formData, internal_notes: e.target.value })}
                  placeholder="Observações internas sobre o aluno (opcional)"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Endereço do Aluno */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Endereço do Aluno</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="student-cep">CEP *</Label>
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
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="student-street">Rua *</Label>
                  <Input
                    id="student-street"
                    value={formData.address.street}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })
                    }
                    placeholder="Nome da rua"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="student-number">Número *</Label>
                  <Input
                    id="student-number"
                    value={formData.address.number}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, number: e.target.value } })
                    }
                    placeholder="123"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="student-neighborhood">Bairro *</Label>
                  <Input
                    id="student-neighborhood"
                    value={formData.address.neighborhood}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, neighborhood: e.target.value } })
                    }
                    placeholder="Nome do bairro"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="student-city">Cidade *</Label>
                  <Input
                    id="student-city"
                    value={formData.address.city}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })
                    }
                    placeholder="Nome da cidade"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="student-state">Estado *</Label>
                  <Select
                    value={formData.address.state}
                    onValueChange={(value) =>
                      setFormData({ ...formData, address: { ...formData.address, state: value } })
                    }
                  >
                    <SelectTrigger>
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
                <div className="md:col-span-2">
                  <Label htmlFor="student-reference">Referência</Label>
                  <Input
                    id="student-reference"
                    value={formData.address.reference}
                    onChange={(e) =>
                      setFormData({ ...formData, address: { ...formData.address, reference: e.target.value } })
                    }
                    placeholder="Ponto de referência (opcional)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Responsáveis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Responsáveis</span>
                </div>
                <Button type="button" onClick={addResponsible} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Responsável
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.responsibles.map((responsible, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">Responsável {index + 1}</h4>
                    {formData.responsibles.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeResponsible(index)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Nome Completo *</Label>
                      <Input
                        value={responsible.user.name}
                        onChange={(e) => updateResponsible(index, "user.name", e.target.value)}
                        placeholder="Nome completo do responsável"
                        required
                      />
                    </div>
                    <div>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={responsible.user.email}
                        onChange={(e) => updateResponsible(index, "user.email", e.target.value)}
                        placeholder="email@exemplo.com"
                        required
                      />
                    </div>
                    <div>
                      <Label>CPF *</Label>
                      <Input
                        value={responsible.user.cpf}
                        onChange={(e) => updateResponsible(index, "user.cpf", formatCPF(e.target.value))}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        required
                      />
                    </div>
                    <div>
                      <Label>Telefone *</Label>
                      <Input
                        value={responsible.user.phone}
                        onChange={(e) => updateResponsible(index, "user.phone", formatPhone(e.target.value))}
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                        required
                      />
                    </div>
                    <div>
                      <Label>Grau de Parentesco *</Label>
                      <Select
                        value={responsible.relationship}
                        onValueChange={(value) => updateResponsible(index, "relationship", value)}
                      >
                        <SelectTrigger>
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

                  <div>
                    <Label>Observações</Label>
                    <Textarea
                      value={responsible.notes}
                      onChange={(e) => updateResponsible(index, "notes", e.target.value)}
                      placeholder="Observações sobre o responsável (opcional)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`use-student-address-${index}`}
                        checked={responsible.use_student_address}
                        onCheckedChange={(checked) => updateResponsible(index, "use_student_address", checked)}
                      />
                      <Label htmlFor={`use-student-address-${index}`}>Usar mesmo endereço do aluno</Label>
                    </div>

                    {!responsible.use_student_address && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <Label>CEP *</Label>
                          <Input
                            value={responsible.address?.zip_code || ""}
                            onChange={(e) => updateResponsible(index, "address.zip_code", formatCEP(e.target.value))}
                            placeholder="00000-000"
                            maxLength={9}
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label>Rua *</Label>
                          <Input
                            value={responsible.address?.street || ""}
                            onChange={(e) => updateResponsible(index, "address.street", e.target.value)}
                            placeholder="Nome da rua"
                            required
                          />
                        </div>
                        <div>
                          <Label>Número *</Label>
                          <Input
                            value={responsible.address?.number || ""}
                            onChange={(e) => updateResponsible(index, "address.number", e.target.value)}
                            placeholder="123"
                            required
                          />
                        </div>
                        <div>
                          <Label>Bairro *</Label>
                          <Input
                            value={responsible.address?.neighborhood || ""}
                            onChange={(e) => updateResponsible(index, "address.neighborhood", e.target.value)}
                            placeholder="Nome do bairro"
                            required
                          />
                        </div>
                        <div>
                          <Label>Cidade *</Label>
                          <Input
                            value={responsible.address?.city || ""}
                            onChange={(e) => updateResponsible(index, "address.city", e.target.value)}
                            placeholder="Nome da cidade"
                            required
                          />
                        </div>
                        <div>
                          <Label>Estado *</Label>
                          <Select
                            value={responsible.address?.state || ""}
                            onValueChange={(value) => updateResponsible(index, "address.state", value)}
                          >
                            <SelectTrigger>
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
                        <div className="md:col-span-2">
                          <Label>Referência</Label>
                          <Input
                            value={responsible.address?.reference || ""}
                            onChange={(e) => updateResponsible(index, "address.reference", e.target.value)}
                            placeholder="Ponto de referência (opcional)"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {index < formData.responsibles.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Botão de Cadastrar */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Cadastrando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Cadastrar Aluno</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
