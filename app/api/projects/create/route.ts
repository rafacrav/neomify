import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/slug'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const metadataStr = formData.get('metadata') as string
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo enviado' },
        { status: 400 }
      )
    }

    const metadata = JSON.parse(metadataStr)
    
    // Gerar slug único
    const slug = generateSlug()
    
    // Criar diretório de uploads se não existir
    const uploadsDir = join(process.cwd(), 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }
    
    // Salvar arquivo ZIP
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const zipPath = join(uploadsDir, `${slug}.zip`)
    await writeFile(zipPath, buffer)
    
    // Criar projeto no banco
    const project = await prisma.project.create({
      data: {
        slug,
        originalFileName: file.name,
        zipPath: `/uploads/${slug}.zip`,
        projectType: metadata.projectType,
        targetAudience: metadata.targetAudience,
        skillLevel: metadata.skillLevel,
        tone: metadata.tone,
        goal: metadata.goal || '',
        price: metadata.price ? parseFloat(metadata.price) : null,
        processingStatus: 'PENDING',
      },
    })
    
    // Iniciar processamento em background (simulado por agora)
    // Em produção, isso seria uma fila (BullMQ, etc)
    processProject(project.id).catch(console.error)
    
    return NextResponse.json({ 
      projectId: project.id,
      slug: project.slug 
    })
    
  } catch (error) {
    console.error('Erro ao criar projeto:', error)
    return NextResponse.json(
      { error: 'Erro ao processar upload' },
      { status: 500 }
    )
  }
}

// Função de processamento (em produção seria um worker separado)
async function processProject(projectId: string) {
  try {
    // Atualizar status
    await prisma.project.update({
      where: { id: projectId },
      data: { processingStatus: 'EXTRACTING' }
    })
    
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })
    
    if (!project) return
    
    // Simular extração (em produção usaríamos extract-zip)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await prisma.project.update({
      where: { id: projectId },
      data: { processingStatus: 'ANALYZING' }
    })
    
    // Simular análise com IA
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Análise mockada
    const aiAnalysis = {
      projectClassification: {
        confirmedType: project.projectType,
        category: 'Tecnologia',
        subcategory: 'Desenvolvimento Web',
        confidence: 95
      },
      contentAnalysis: {
        mainTopics: ['React', 'Next.js', 'TypeScript'],
        complexity: project.skillLevel,
        estimatedValue: 97,
        uniqueSellingPoints: [
          'Conteúdo prático e direto',
          'Exemplos reais',
          'Suporte completo'
        ]
      },
      audienceProfile: {
        primaryAudience: project.targetAudience,
        painPoints: [
          'Dificuldade em aprender frameworks modernos',
          'Falta de projetos práticos'
        ],
        desiredOutcomes: [
          'Dominar desenvolvimento web moderno',
          'Construir aplicações profissionais'
        ]
      },
      recommendedTemplate: 'HERO_FOCUS'
    }
    
    await prisma.project.update({
      where: { id: projectId },
      data: { 
        processingStatus: 'GENERATING_COPY',
        aiAnalysis: JSON.stringify(aiAnalysis)
      }
    })
    
    // Simular geração de copy
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Copy mockada baseada no tipo de projeto
    const headlines = {
      EBOOK: `Domine ${project.targetAudience.split(' ')[0]} em Tempo Record`,
      COURSE: `O Curso Completo de ${project.targetAudience.split(' ')[0]}`,
      TEMPLATE: `Templates Profissionais para ${project.targetAudience}`,
      APP: `A Ferramenta que ${project.targetAudience} Precisam`,
      TOOLKIT: `Kit Completo para ${project.targetAudience}`,
      OTHER: `Tudo o que Você Precisa sobre ${project.targetAudience.split(' ')[0]}`
    }
    
    const descriptions = {
      EBOOK: `Um guia completo e prático para ${project.targetAudience.toLowerCase()} que querem dominar as habilidades essenciais do mercado.`,
      COURSE: `Aprenda do zero ao avançado com um curso estruturado, prático e focado em resultados reais.`,
      TEMPLATE: `Templates prontos para uso que vão economizar horas do seu tempo e elevar a qualidade dos seus projetos.`,
      APP: `Software profissional desenvolvido especificamente para resolver os desafios de ${project.targetAudience.toLowerCase()}.`,
      TOOLKIT: `Um conjunto completo de ferramentas e recursos para acelerar seu trabalho e produtividade.`,
      OTHER: `Conteúdo cuidadosamente desenvolvido para transformar ${project.targetAudience.toLowerCase()} em profissionais de destaque.`
    }
    
    const benefits = [
      'Conteúdo atualizado e relevante para o mercado atual',
      'Aprenda no seu próprio ritmo, sem pressão',
      'Suporte e atualizações incluídas',
      'Acesso vitalício ao material',
      'Aplicação prática imediata no dia a dia'
    ]
    
    const features = [
      'Material completo e estruturado',
      'Exemplos práticos e projetos reais',
      'Recursos extras e bônus exclusivos',
      'Garantia de satisfação',
      'Comunidade de suporte'
    ]
    
    await prisma.project.update({
      where: { id: projectId },
      data: {
        processingStatus: 'COMPLETED',
        headline: headlines[project.projectType as keyof typeof headlines] || headlines.OTHER,
        description: descriptions[project.projectType as keyof typeof descriptions] || descriptions.OTHER,
        benefits: JSON.stringify(benefits),
        features: JSON.stringify(features),
        metaTitle: `${headlines[project.projectType as keyof typeof headlines]} | DigitalLaunch`,
        metaDescription: descriptions[project.projectType as keyof typeof descriptions] || descriptions.OTHER,
        keywords: JSON.stringify([project.targetAudience.toLowerCase(), project.projectType.toLowerCase(), 'curso online', 'aprender']),
        landingTemplate: aiAnalysis.recommendedTemplate,
        isPublished: true
      }
    })
    
  } catch (error) {
    console.error('Erro no processamento:', error)
    await prisma.project.update({
      where: { id: projectId },
      data: { processingStatus: 'FAILED' }
    })
  }
}
