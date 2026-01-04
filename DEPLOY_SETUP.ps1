# Script para configurar Git e fazer deploy
# Execute este script no PowerShell

$projectPath = "C:\Users\Nayara Cordeiro\OneDrive\Documentos\landbook-2026---assistente-estratégico"

# Navegar para o diretório do projeto
Set-Location $projectPath

Write-Host "Diretório atual: $(Get-Location)" -ForegroundColor Green

# Verificar se já existe .git no projeto
if (Test-Path ".git") {
    Write-Host "Removendo .git existente..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
}

# Inicializar Git apenas no diretório do projeto
Write-Host "Inicializando Git..." -ForegroundColor Green
git init

# Configurar remote
Write-Host "Configurando remote..." -ForegroundColor Green
git remote add origin https://github.com/nayaracls/landbook2026.git 2>$null
git remote set-url origin https://github.com/nayaracls/landbook2026.git

# Buscar branches remotas
Write-Host "Buscando branches remotas..." -ForegroundColor Green
git fetch origin

# Criar branch main e fazer checkout
Write-Host "Configurando branch main..." -ForegroundColor Green
git checkout -b main 2>$null
git branch -M main

# Adicionar todos os arquivos
Write-Host "Adicionando arquivos..." -ForegroundColor Green
git add .

# Verificar status
Write-Host "`nStatus do Git:" -ForegroundColor Cyan
git status --short

Write-Host "`nPróximos passos:" -ForegroundColor Yellow
Write-Host "1. Execute: git commit -m 'Deploy: atualização completa do Landbook 2026'"
Write-Host "2. Execute: git push -u origin main --force"
Write-Host "`nOu execute o script DEPLOY_PUSH.ps1"

