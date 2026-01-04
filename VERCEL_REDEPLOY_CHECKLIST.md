# ✅ Checklist para Redeploy no Vercel

## Problema: Redeploy não atualizou

### Possíveis Causas:
1. **Alterações não foram commitadas/pushadas** (se conectado ao Git)
2. **Vercel está fazendo deploy de versão antiga** (cache)
3. **Dependências não foram instaladas** no build

---

## 🔧 Soluções

### Se o Vercel está conectado ao GitHub/GitLab:

1. **Verifique se há repositório Git remoto:**
   - Acesse seu repositório no GitHub
   - Veja se as alterações estão lá
   - Se não estão, você precisa fazer commit e push

2. **Faça commit e push das alterações:**
   ```bash
   git add .
   git commit -m "Atualização: 3 metodologias, 5 prompts, PDF otimizado"
   git push origin main
   ```

3. **No Vercel, force um novo deploy:**
   - Dashboard → Seu projeto
   - Deployments → "..." ao lado do último deploy
   - "Redeploy" → Marque "Use existing Build Cache" como **DESLIGADO**
   - Clique em "Redeploy"

### Se você faz upload direto no Vercel:

1. **Prepare o projeto:**
   - Certifique-se que todas as alterações estão salvas
   - Verifique que `package.json` tem todas as dependências

2. **Faça upload novamente:**
   - Dashboard do Vercel
   - Seu projeto → Settings → General
   - Se houver opção de "Upload", use-a
   - Ou delete o projeto e crie novamente importando a pasta

---

## ✅ Verificações Importantes

### 1. Dependências no package.json
Confirme que estas estão presentes:
```json
"framer-motion": "^11.11.17",
"html2canvas": "^1.4.1",
"jspdf": "^2.5.2"
```

### 2. Variáveis de Ambiente
No Vercel Dashboard → Settings → Environment Variables, verifique:
- `VITE_OPENAI_API_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

⚠️ **Após alterar variáveis, sempre faça redeploy**

### 3. Build Logs
No Vercel:
- Deployments → Último deploy → "View Build Logs"
- Verifique se houve erros durante o build
- Confirme que todas as dependências foram instaladas

---

## 🚀 Passo a Passo para Redeploy Forçado

1. **No Vercel Dashboard:**
   - Vá em "Deployments"
   - Clique nos "..." ao lado do último deploy
   - Escolha "Redeploy"
   - **DESMARQUE** "Use existing Build Cache"
   - Clique em "Redeploy"

2. **Aguarde o build completar**

3. **Teste a aplicação:**
   - Acesse a URL do deploy
   - Teste todas as funcionalidades
   - Verifique se PDF está funcionando

---

## 🔍 Como Verificar se Atualizou

### Verifique nos logs do Vercel:
- Build deve mostrar instalação das novas dependências
- Não deve ter erros de módulos não encontrados

### Teste na aplicação:
- Diagnóstico deve mostrar **3 metodologias** (não 5)
- Deve mostrar **5 prompts** (não 13)
- PDF deve estar idêntico ao navegador

---

## 📞 Se ainda não funcionar

1. **Limpe o cache do Vercel:**
   - Settings → General → Scroll até "Clear Build Cache"
   - Clique em "Clear"

2. **Verifique a branch:**
   - Se usa Git, confirme que está fazendo deploy da branch correta
   - Settings → Git → Production Branch

3. **Build local para testar:**
   ```bash
   npm install
   npm run build
   ```
   Se o build local funcionar, o problema pode ser configuração do Vercel


