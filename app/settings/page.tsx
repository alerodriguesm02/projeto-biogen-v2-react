"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "João Silva",
    company: "EcoTech Solutions",
    email: "test@example.com",
    avatar: "/abstract-profile.png",
    address: "Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-200",
  })

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      })
    }, 1000)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Senha alterada",
        description: "Sua senha foi atualizada com sucesso.",
      })
    }, 1000)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Configurações" text="Gerencie suas informações pessoais e configurações da conta" />

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="bio-card">
          <CardHeader>
            <CardTitle className="text-green-800">Informações do Perfil</CardTitle>
            <CardDescription className="text-green-600">
              Atualize suas informações pessoais e da empresa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt="Profile" />
                <AvatarFallback className="bg-green-100 text-green-800 text-lg">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar" className="cursor-pointer">
                  <Button
                    variant="outline"
                    className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    Alterar Foto
                  </Button>
                </Label>
                <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                <p className="text-sm text-green-600 mt-1">JPG, PNG ou GIF (máx. 2MB)</p>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-green-800">
                    Nome Completo
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                    className="border-green-300 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-green-800">
                    Nome da Empresa
                  </Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, company: e.target.value }))}
                    className="border-green-300 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-800">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                  className="border-green-300 focus:border-green-500"
                />
              </div>

              {/* Address Fields Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-green-800">Endereço da Empresa</h3>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-green-800">
                    Endereço Completo
                  </Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, address: e.target.value }))}
                    className="border-green-300 focus:border-green-500"
                    placeholder="Rua, número, bairro"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-green-800">
                      Cidade
                    </Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, city: e.target.value }))}
                      className="border-green-300 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-green-800">
                      Estado
                    </Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, state: e.target.value }))}
                      className="border-green-300 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-green-800">
                      CEP
                    </Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, zipCode: e.target.value }))}
                      className="border-green-300 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card className="bio-card">
          <CardHeader>
            <CardTitle className="text-green-800">Alterar Senha</CardTitle>
            <CardDescription className="text-green-600">Mantenha sua conta segura com uma senha forte</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-green-800">
                  Senha Atual
                </Label>
                <Input id="current-password" type="password" className="border-green-300 focus:border-green-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-green-800">
                    Nova Senha
                  </Label>
                  <Input id="new-password" type="password" className="border-green-300 focus:border-green-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-green-800">
                    Confirmar Nova Senha
                  </Label>
                  <Input id="confirm-password" type="password" className="border-green-300 focus:border-green-500" />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? "Alterando..." : "Alterar Senha"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
