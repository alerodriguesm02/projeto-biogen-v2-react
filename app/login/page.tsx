"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Leaf } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const fillDemoCredentials = () => {
    setFormData({
      email: "test@example.com",
      password: "password123",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      // First check if the response is ok before trying to parse JSON
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! Status: ${response.status}`,
        }))
        throw new Error(errorData.message || "Login failed")
      }

      const data = await response.json()

      // Store the token in localStorage
      localStorage.setItem("token", data.token)

      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando para o dashboard...",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        variant: "destructive",
        title: "Falha no login",
        description: error instanceof Error ? error.message : "Verifique suas credenciais e tente novamente",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-12">
      <Card className="w-full max-w-md border-green-100 shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-green-100 p-3">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Login</CardTitle>
          <CardDescription className="text-green-600">
            Entre com suas credenciais para acessar seu dashboard
          </CardDescription>
          <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
            <p className="text-sm text-green-700 font-medium mb-2">Credenciais de Demonstração:</p>
            <p className="text-xs text-green-600">Email: test@example.com</p>
            <p className="text-xs text-green-600">Senha: password123</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fillDemoCredentials}
              className="mt-2 text-xs border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
            >
              Usar Credenciais Demo
            </Button>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="border-green-200"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-green-700">
                  Senha
                </Label>
                <Link href="#" className="text-sm text-green-600 hover:text-green-800 hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="border-green-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" className="h-4 w-4 rounded border-green-300" />
              <Label htmlFor="remember" className="text-sm font-normal text-green-700">
                Lembrar-me
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            <div className="text-center text-sm text-green-700">
              Não tem uma conta?{" "}
              <Link href="/register" className="font-medium text-green-600 hover:text-green-800 hover:underline">
                Registre-se
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
