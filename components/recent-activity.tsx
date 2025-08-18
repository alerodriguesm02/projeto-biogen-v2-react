"use client"

import { useEffect, useState } from "react"
import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react"

// Sample data - in a real app, this would come from your API
const activityData = [
  {
    id: 1,
    type: "success",
    message: "Manutenção do biodigestor concluída",
    timestamp: "2 horas atrás",
  },
  {
    id: 2,
    type: "warning",
    message: "Níveis de temperatura acima do normal",
    timestamp: "5 horas atrás",
  },
  {
    id: 3,
    type: "info",
    message: "Novo lote de resíduos processado",
    timestamp: "Ontem",
  },
  {
    id: 4,
    type: "success",
    message: "Produção de energia aumentou 15%",
    timestamp: "2 dias atrás",
  },
  {
    id: 5,
    type: "warning",
    message: "Níveis de pH precisam de ajuste",
    timestamp: "3 dias atrás",
  },
]

export function RecentActivity() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-4">
      {activityData.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-4 rounded-lg border border-green-100 p-3 bg-white hover:border-green-300 transition-colors"
        >
          <div className="mt-0.5">
            {item.type === "success" && (
              <div className="rounded-full bg-green-100 p-1.5">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
            )}
            {item.type === "warning" && (
              <div className="rounded-full bg-amber-100 p-1.5">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
            )}
            {item.type === "info" && (
              <div className="rounded-full bg-blue-100 p-1.5">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
            )}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none text-green-900">{item.message}</p>
            <p className="text-sm text-green-500">{item.timestamp}</p>
          </div>
        </div>
      ))}
      <div className="text-center">
        <button className="text-sm text-green-600 hover:text-green-700 hover:underline transition-colors">
          Ver todas as atividades
        </button>
      </div>
    </div>
  )
}
