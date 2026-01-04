# Script para fazer commit e push
# Execute este script DEPOIS do DEPLOY_SETUP.ps1

$projectPath = "C:\Users\Nayara Cordeiro\OneDrive\Documentos\landbook-2026---assistente-estratégico"

# Navegar para o diretório do projeto
Set-Location $projectPath

Write-Host "Diretório atual: $(Get-Location)" -ForegroundColor Green

# Verificar se estamos no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "ERRO: package.json não encontrado. Certifique-se de estar no diretório correto!" -ForegroundColor Red
    exit 1
}

# Verificar se o Git está inicializado
if (-not (Test-Path ".git")) {
    Write-Host "ERRO: Git não está inicializado. Execute DEPLOY_SETUP.ps1 primeiro!" -ForegroundColor Red
    exit 1
}

# Adicionar todos os arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Green
git add .

# Fazer commit
Write-Host "Fazendo commit..." -ForegroundColor Green
git commit -m "Deploy: atualização completa do Landbook 2026 - interface gamificada e PDF corrigido"

# Push para o GitHub
Write-Host "Fazendo push para o GitHub..." -ForegroundColor Green
git push -u origin main --force

Write-Host "`n✅ Deploy concluído!" -ForegroundColor Green
Write-Host "Acesse o Vercel e faça um redeploy sem cache." -ForegroundColor Yellow

