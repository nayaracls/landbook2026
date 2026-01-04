# 🚀 Landbook 2026 - Land Grow Strategic Intelligence

Este é o assistente estratégico oficial da Land Grow para 2026. Uma ferramenta de diagnóstico empresarial de alta performance que gera planos de ação personalizados e exporta para PDF em formato A4 profissional.

---

## 📂 Como configurar seu GitHub (Passo a Passo)

Como eu sou uma IA, não consigo acessar sua conta diretamente. Siga estes passos simples:

1. Acesse seu repositório: [https://github.com/nayaracls/landbook2026](https://github.com/nayaracls/landbook2026)
2. No botão **"Add file"**, escolha **"Upload files"**.
3. No seu computador, selecione **todos os arquivos** do projeto e arraste para a página do GitHub.
4. Role a página para baixo e clique em **"Commit changes"**.

Pronto! Seus arquivos estarão salvos e versionados.

---

## 💻 Como Rodar no seu Computador (Local)

Para rodar o projeto localmente, você precisa ter o **Node.js** instalado.

1. **Baixe o código** do seu GitHub e abra a pasta no VS Code (ou terminal).
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Configure suas Chaves de API:**
   - Crie um arquivo chamado `.env` na pasta raiz.
   - Adicione estas linhas dentro dele:
     ```env
     VITE_OPENAI_API_KEY=SUA_CHAVE_OPENAI_AQUI
     VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
     VITE_SUPABASE_ANON_KEY=SUA_CHAVE_SUPABASE_AQUI
     ```
   - *Pegue sua chave OpenAI em: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)*
   - *Para Supabase, veja o arquivo `SUPABASE_SETUP.md`*
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   - Acesse o link que aparecerá no terminal (ex: `http://localhost:5173`).

---

## 🛠 Tecnologias
- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **OpenAI API** (GPT-4o)
- **Supabase** (Banco de dados)
- **html2pdf.js** (PDF seguindo margens ABNT)

---

## 🚀 Deploy no Vercel

Após fazer o deploy no Vercel, configure as variáveis de ambiente:

1. Acesse o dashboard do Vercel: https://vercel.com/dashboard
2. Selecione o projeto **"landbook2026"**
3. Vá em **"Settings" → "Environment Variables"**
4. Adicione as seguintes variáveis:

| Key | Value |
|-----|-------|
| `VITE_OPENAI_API_KEY` | Sua chave da OpenAI |
| `VITE_SUPABASE_URL` | URL do seu projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave anon do Supabase |

5. Clique em **"Save"**
6. Faça um novo deploy ou aguarde o redeploy automático

> ⚠️ **Importante**: Sem essas variáveis configuradas, a aplicação não funcionará corretamente em produção.
