#!/bin/bash

echo "🚀 DigitalLaunch - Setup Automático"
echo "===================================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18+ primeiro."
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"
echo ""

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo ""
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
    echo "⚠️  IMPORTANTE: Edite o arquivo .env e adicione suas chaves API"
fi

# Setup do banco de dados
echo ""
echo "🗄️  Configurando banco de dados..."
npx prisma generate
npx prisma db push

# Criar diretório de uploads
echo ""
echo "📁 Criando diretório de uploads..."
mkdir -p uploads

echo ""
echo "✅ Setup concluído!"
echo ""
echo "📋 Próximos passos:"
echo "1. Edite o arquivo .env com suas chaves"
echo "2. Execute: npm run dev"
echo "3. Acesse: http://localhost:3000"
echo ""
echo "📚 Leia o README.md para mais informações"
echo ""
