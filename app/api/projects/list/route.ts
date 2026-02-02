import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        slug: true,
        headline: true,
        projectType: true,
        price: true,
        views: true,
        conversions: true,
        isPublished: true,
        createdAt: true,
      }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Erro ao listar projetos:', error)
    return NextResponse.json(
      { error: 'Erro ao listar projetos' },
      { status: 500 }
    )
  }
}
