# ⚠️ INSTRUÇÕES PARA FAZER PUSH DAS ALTERAÇÕES

## PROBLEMA IDENTIFICADO
O Git foi inicializado no diretório errado (diretório home do usuário). Por isso, precisamos fazer o push manualmente.

## SOLUÇÃO PASSO A PASSO

### 1. Abra o PowerShell no diretório do projeto
```
C:\Users\Nayara Cordeiro\OneDrive\Documentos\landbook-2026---assistente-estratégico
```

### 2. Execute os seguintes comandos um por um:

```powershell
# Verificar se está no diretório correto
Get-Location

# Verificar se o Git está configurado corretamente
git remote -v

# Verificar status atual (apenas arquivos do projeto)
git status

# Adicionar apenas os arquivos do projeto
git add App.tsx
git add package.json
git add package-lock.json
git add index.html
git add index.tsx
git add index.css
git add vite.config.ts
git add tsconfig.json
git add tailwind.config.js
git add postcss.config.js
git add vite-env.d.ts
git add constants.ts
git add types.ts
git add README.md
git add .gitignore

# Adicionar pastas
git add components/
git add services/

# Fazer commit
git commit -m "feat: atualização - 3 metodologias, 5 prompts, PDF otimizado, dependências atualizadas"

# Fazer push
git push origin main
```

### 3. Se der erro de branch
Se o erro for "error: src refspec main does not match any", execute:

```powershell
# Verificar qual branch está ativa
git branch

# Se estiver em 'master', faça push para master ou crie main:
git push origin master
# OU
git checkout -b main
git push origin main
```

### 4. Após o push bem-sucedido
- O Vercel deve detectar automaticamente o push
- Vá para o painel do Vercel e verifique se há um novo deploy em andamento
- Se não houver deploy automático, clique em "Redeploy" manualmente

## ALTERNATIVA: Se ainda não funcionar

Se ainda houver problemas, você pode:

1. Ir até o diretório do projeto no Windows Explorer
2. Clicar com botão direito dentro da pasta do projeto
3. Selecionar "Git Bash Here" (se tiver Git Bash instalado)
4. Executar os comandos acima

Ou usar o VS Code:
1. Abra o VS Code no diretório do projeto
2. Abra o terminal integrado (Ctrl + `)
3. Execute os comandos acima