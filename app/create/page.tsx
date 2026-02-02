"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Loader2, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CreateProjectPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    projectType: "",
    targetAudience: "",
    skillLevel: "",
    tone: "",
    goal: "",
    price: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.name.endsWith('.zip')) {
      setFile(selectedFile)
    } else {
      alert('Por favor, selecione um arquivo ZIP válido')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsProcessing(true)

    try {
      // Criar FormData para upload
      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('metadata', JSON.stringify(formData))

      // Upload e processamento
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        body: uploadData,
      })

      const result = await response.json()

      if (response.ok) {
        // Redirecionar para página de processamento
        router.push(`/project/${result.projectId}/processing`)
      } else {
        alert('Erro ao criar projeto: ' + result.error)
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao fazer upload')
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold">Criar Novo Projeto</h1>
          </div>
          <p className="text-gray-600">
            {step === 1 ? "Faça upload do seu projeto" : "Conte-nos mais sobre seu produto"}
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Upload */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6">Upload do Projeto</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-lg font-medium text-blue-600 hover:text-blue-700">
                    Clique para fazer upload
                  </span>
                  <span className="text-gray-600"> ou arraste e solte</span>
                </Label>
                <p className="text-sm text-gray-500 mt-2">
                  Arquivo ZIP (máximo 500MB)
                </p>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".zip"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {file && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">
                    Arquivo selecionado: {file.name}
                  </p>
                  <p className="text-sm text-blue-700">
                    Tamanho: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!file}
                  size="lg"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Questions */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Informações do Produto</h2>

              {/* Project Type */}
              <div className="space-y-2">
                <Label htmlFor="projectType">Tipo de Projeto *</Label>
                <select
                  id="projectType"
                  required
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione...</option>
                  <option value="EBOOK">E-book</option>
                  <option value="COURSE">Curso Online</option>
                  <option value="TEMPLATE">Template (Código/Design)</option>
                  <option value="APP">App/Software</option>
                  <option value="TOOLKIT">Toolkit/Ferramentas</option>
                  <option value="OTHER">Outro</option>
                </select>
              </div>

              {/* Target Audience */}
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Público-Alvo *</Label>
                <Input
                  id="targetAudience"
                  required
                  placeholder="Ex: Desenvolvedores React iniciantes"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                />
              </div>

              {/* Skill Level */}
              <div className="space-y-2">
                <Label htmlFor="skillLevel">Nível de Conhecimento Necessário *</Label>
                <select
                  id="skillLevel"
                  required
                  value={formData.skillLevel}
                  onChange={(e) => setFormData({...formData, skillLevel: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione...</option>
                  <option value="BEGINNER">Iniciante</option>
                  <option value="INTERMEDIATE">Intermediário</option>
                  <option value="ADVANCED">Avançado</option>
                  <option value="ALL_LEVELS">Todos os Níveis</option>
                </select>
              </div>

              {/* Goal */}
              <div className="space-y-2">
                <Label htmlFor="goal">Objetivo Principal</Label>
                <Input
                  id="goal"
                  placeholder="Ex: Ensinar Next.js do zero"
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value})}
                />
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <Label htmlFor="tone">Tom da Comunicação *</Label>
                <select
                  id="tone"
                  required
                  value={formData.tone}
                  onChange={(e) => setFormData({...formData, tone: e.target.value})}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione...</option>
                  <option value="PROFESSIONAL">Profissional</option>
                  <option value="CASUAL">Casual/Amigável</option>
                  <option value="TECHNICAL">Técnico</option>
                  <option value="CREATIVE">Criativo</option>
                  <option value="EDUCATIONAL">Educacional</option>
                </select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Preço Sugerido (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="97.00"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
                <p className="text-sm text-gray-500">
                  A IA pode sugerir um preço baseado na análise do conteúdo
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Voltar
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Criar Landing Page
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
