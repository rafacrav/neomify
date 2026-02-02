"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, ExternalLink, Eye, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Project {
  id: string
  slug: string
  headline: string
  projectType: string
  price: number | null
  views: number
  conversions: number
  isPublished: boolean
  createdAt: string
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects/list')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Erro ao carregar projetos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-bold">DigitalLaunch</h1>
            </Link>
            <Link href="/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Projeto
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Meus Projetos</h2>
          <p className="text-gray-600">
            Gerencie suas landing pages e acompanhe o desempenho
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Carregando projetos...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Nenhum projeto criado ainda
            </h3>
            <p className="text-gray-600 mb-6">
              Comece criando seu primeiro produto digital
            </p>
            <Link href="/create">
              <Button size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Criar Primeiro Projeto
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {project.projectType}
          </span>
          {project.isPublished ? (
            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
              Publicado
            </span>
          ) : (
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
              Rascunho
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          {project.headline}
        </h3>
        <p className="text-gray-600 text-sm">
          Criado em {new Date(project.createdAt).toLocaleDateString('pt-BR')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4 py-4 border-y">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Eye className="h-4 w-4 text-gray-400" />
          </div>
          <div className="font-semibold">{project.views}</div>
          <div className="text-xs text-gray-500">Views</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <ShoppingCart className="h-4 w-4 text-gray-400" />
          </div>
          <div className="font-semibold">{project.conversions}</div>
          <div className="text-xs text-gray-500">Vendas</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Preço</div>
          <div className="font-semibold">
            {project.price ? `R$ ${project.price.toFixed(2)}` : '-'}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {project.isPublished && (
          <Link href={`/p/${project.slug}`} target="_blank" className="flex-1">
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver Página
            </Button>
          </Link>
        )}
        <Link href={`/project/${project.id}/edit`} className="flex-1">
          <Button variant="outline" className="w-full">
            Editar
          </Button>
        </Link>
      </div>
    </div>
  )
}
