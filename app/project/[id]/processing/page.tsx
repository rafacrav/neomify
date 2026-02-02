"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const STATUS_MESSAGES = {
  PENDING: 'Preparando...',
  EXTRACTING: 'Extraindo arquivos...',
  ANALYZING: 'Analisando conteúdo com IA...',
  GENERATING_COPY: 'Gerando copy da landing page...',
  COMPLETED: 'Concluído!',
  FAILED: 'Erro no processamento'
}

const STATUS_DESCRIPTIONS = {
  PENDING: 'Estamos iniciando o processamento do seu projeto',
  EXTRACTING: 'Descompactando e organizando seus arquivos',
  ANALYZING: 'Nossa IA está analisando o conteúdo e identificando os principais tópicos',
  GENERATING_COPY: 'Criando textos otimizados para conversão',
  COMPLETED: 'Sua landing page está pronta!',
  FAILED: 'Ocorreu um erro. Por favor, tente novamente'
}

export default function ProcessingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [status, setStatus] = useState('PENDING')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}/status`)
        const data = await response.json()
        
        setStatus(data.processingStatus)
        
        // Calcular progresso
        const statusProgress = {
          PENDING: 10,
          EXTRACTING: 30,
          ANALYZING: 60,
          GENERATING_COPY: 85,
          COMPLETED: 100,
          FAILED: 0
        }
        setProgress(statusProgress[data.processingStatus as keyof typeof statusProgress] || 0)
        
        // Redirecionar quando completado
        if (data.processingStatus === 'COMPLETED') {
          setTimeout(() => {
            router.push(`/p/${data.slug}`)
          }, 2000)
        }
      } catch (error) {
        console.error('Erro ao verificar status:', error)
      }
    }

    // Verificar status a cada 2 segundos
    const interval = setInterval(checkStatus, 2000)
    checkStatus() // Primeira verificação imediata

    return () => clearInterval(interval)
  }, [params.id, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          {status === 'COMPLETED' ? (
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
          ) : status === 'FAILED' ? (
            <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          ) : (
            <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
          )}
          
          <h1 className="text-3xl font-bold mb-2">
            {STATUS_MESSAGES[status as keyof typeof STATUS_MESSAGES]}
          </h1>
          <p className="text-gray-600">
            {STATUS_DESCRIPTIONS[status as keyof typeof STATUS_DESCRIPTIONS]}
          </p>
        </div>

        {/* Progress Bar */}
        {status !== 'FAILED' && (
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">{progress}%</p>
          </div>
        )}

        {/* Steps */}
        <div className="space-y-3">
          <ProcessStep 
            title="Extração de arquivos" 
            completed={['ANALYZING', 'GENERATING_COPY', 'COMPLETED'].includes(status)}
            current={status === 'EXTRACTING'}
          />
          <ProcessStep 
            title="Análise com IA" 
            completed={['GENERATING_COPY', 'COMPLETED'].includes(status)}
            current={status === 'ANALYZING'}
          />
          <ProcessStep 
            title="Geração de conteúdo" 
            completed={status === 'COMPLETED'}
            current={status === 'GENERATING_COPY'}
          />
        </div>

        {status === 'COMPLETED' && (
          <div className="mt-8 p-4 bg-green-50 rounded-lg text-center">
            <p className="text-green-900 font-medium">
              Redirecionando para sua landing page...
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function ProcessStep({ title, completed, current }: { title: string, completed: boolean, current: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
        completed ? 'bg-green-600' : current ? 'bg-blue-600 animate-pulse' : 'bg-gray-300'
      }`}>
        {completed && <CheckCircle2 className="h-4 w-4 text-white" />}
        {current && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      <span className={`${completed || current ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
        {title}
      </span>
    </div>
  )
}
