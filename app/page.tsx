"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload, Zap, Globe, DollarSign, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">DigitalLaunch</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/create">
              <Button>Criar Projeto</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transforme Seus Projetos em Produtos Digitais
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Faça upload de um ZIP com seu e-book, curso, template ou qualquer projeto digital. 
            Nossa IA cria uma landing page profissional e otimizada para vendas em minutos.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="text-lg px-8">
                <Upload className="mr-2 h-5 w-5" />
                Começar Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Ver Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Upload className="h-8 w-8 text-blue-600" />}
            title="Upload Simples"
            description="Arraste e solte seu arquivo ZIP. Suportamos e-books, cursos, templates e mais."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-yellow-600" />}
            title="IA Inteligente"
            description="Análise automática do conteúdo e geração de copy otimizada para conversão."
          />
          <FeatureCard
            icon={<Globe className="h-8 w-8 text-green-600" />}
            title="Landing Page Pronta"
            description="Site profissional com SEO, design responsivo e templates personalizados."
          />
          <FeatureCard
            icon={<DollarSign className="h-8 w-8 text-purple-600" />}
            title="Venda Automatizada"
            description="Checkout integrado e entrega automática do produto digital."
          />
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-20 bg-white rounded-3xl shadow-xl max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-12">Como Funciona</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            title="Faça Upload"
            description="Envie seu projeto em formato ZIP com todos os arquivos"
          />
          <StepCard
            number="2"
            title="Configure"
            description="Responda algumas perguntas sobre seu público e objetivos"
          />
          <StepCard
            number="3"
            title="Publique"
            description="Sua landing page fica pronta em minutos. É só compartilhar!"
          />
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para Lançar Seu Produto?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a centenas de criadores que já transformaram seus projetos em negócios lucrativos
          </p>
          <Link href="/create">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Criar Meu Primeiro Projeto
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>© 2026 DigitalLaunch. Feito com ❤️ para criadores digitais.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
