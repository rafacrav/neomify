import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Star, Download, Shield } from 'lucide-react'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug }
  })

  if (!project) {
    return {
      title: 'Projeto não encontrado'
    }
  }

  return {
    title: project.metaTitle || project.headline,
    description: project.metaDescription || project.description,
    keywords: JSON.parse(project.keywords),
  }
}

export default async function ProductLandingPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug }
  })

  if (!project || !project.isPublished) {
    notFound()
  }

  const benefits = JSON.parse(project.benefits)
  const features = JSON.parse(project.features)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
              {project.projectType.replace('_', ' ')}
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {project.headline}
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <form action={`/api/checkout/${project.id}`} method="POST">
                <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100">
                  <Download className="mr-2 h-5 w-5" />
                  Comprar Agora - {project.price ? `R$ ${project.price.toFixed(2)}` : 'Consultar'}
                </Button>
              </form>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>Acesso Vitalício</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-4">
            O que você vai conquistar
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Desenvolvido especialmente para {project.targetAudience.toLowerCase()}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit: string, index: number) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 className="h-8 w-8 text-green-600 mb-4" />
                <p className="text-gray-800 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            O que está incluído
          </h2>

          <div className="space-y-4">
            {features.map((feature: string, index: number) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <p className="text-lg text-gray-800">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-5xl font-bold mb-2">{project.views > 0 ? project.views : '100+'}</div>
              <div className="text-gray-300">Pessoas interessadas</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">
                {project.conversions > 0 ? project.conversions : '★★★★★'}
              </div>
              <div className="text-gray-300">Avaliação média</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">24h</div>
              <div className="text-gray-300">Acesso imediato</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">
            Perguntas Frequentes
          </h2>

          <div className="space-y-6">
            <FAQItem
              question="Como funciona o acesso?"
              answer="Após a confirmação do pagamento, você receberá um email com o link para download imediato do material."
            />
            <FAQItem
              question="Posso acessar em qualquer dispositivo?"
              answer="Sim! O conteúdo é digital e pode ser acessado em computador, tablet ou smartphone."
            />
            <FAQItem
              question="Tem garantia?"
              answer="Sim, oferecemos 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do valor."
            />
            <FAQItem
              question="É para iniciantes?"
              answer={`Este conteúdo foi desenvolvido para nível ${project.skillLevel.toLowerCase()}.`}
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a centenas de pessoas que já transformaram seu conhecimento
          </p>
          <form action={`/api/checkout/${project.id}`} method="POST">
            <Button size="lg" className="text-lg px-12 py-6 bg-white text-blue-600 hover:bg-gray-100">
              Garantir Meu Acesso Agora
            </Button>
          </form>
          <p className="mt-4 text-sm opacity-75">
            Pagamento 100% seguro via Stripe
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2026 DigitalLaunch. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  )
}
