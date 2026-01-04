# 📝 Comandos Git para Atualizar o Repositório

## ⚠️ IMPORTANTE: Execute estes comandos no terminal dentro da pasta do projeto

Abra o PowerShell ou Terminal e navegue até a pasta do projeto:

```powershell
cd "C:\Users\Nayara Cordeiro\OneDrive\Documentos\landbook-2026---assistente-estratégico"
```

## 📋 Sequência de Comandos

### 1. Verificar se já tem Git inicializado
```bash
git status
```

Se aparecer "fatal: not a git repository", execute:
```bash
git init
```

### 2. Adicionar o repositório remoto (se ainda não tiver)
```bash
git remote add origin https://github.com/nayaracls/landbook2026.git
```

Ou se já existe, atualize:
```bash
git remote set-url origin https://github.com/nayaracls/landbook2026.git
```

### 3. Buscar o código do GitHub
```bash
git fetch origin
```

### 4. Fazer checkout da branch main
```bash
git checkout -b main
```

Ou se já está na main:
```bash
git checkout main
```

### 5. Fazer pull para sincronizar
```bash
git pull origin main --allow-unrelated-histories
```

### 6. Adicionar TODAS as alterações
```bash
git add .
```

### 7. Fazer commit
```bash
git commit -m "feat: atualização - 3 metodologias, 5 prompts, PDF otimizado, dependências atualizadas"
```

### 8. Fazer push para o GitHub
```bash
git push origin main
```

Se der erro de permissão, você pode precisar usar:
```bash
git push -u origin main
```

---

## ✅ Após o Push

1. **Aguarde alguns segundos** - o Vercel detecta automaticamente
2. **Verifique no Vercel Dashboard:**
   - Deployments → deve aparecer um novo deploy em andamento
3. **Aguarde o build completar**
4. **Teste a aplicação**

---

## 🔧 Se der erro de conflito

Se aparecer conflito ao fazer pull:

```bash
# Desfazer o pull
git merge --abort

# Adicionar tudo
git add .

# Commit forçando
git commit -m "feat: atualização - 3 metodologias, 5 prompts, PDF otimizado"

# Push forçado (CUIDADO - só se necessário)
git push origin main --force
```

---

## 📝 Checklist

- [ ] Terminal aberto na pasta correta do projeto
- [ ] Git inicializado
- [ ] Remote configurado para o GitHub
- [ ] Alterações adicionadas (git add .)
- [ ] Commit feito
- [ ] Push realizado com sucesso
- [ ] Vercel detectou e iniciou novo deploy
- [ ] Build completou com sucesso


