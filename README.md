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
3. **Configure sua Chave do Google Gemini:**
   - Crie um arquivo chamado `.env` na pasta raiz.
   - Adicione esta linha dentro dele:
     ```env
     VITE_API_KEY=SUA_CHAVE_AQUI
     ```
   - *Pegue sua chave em: [ai.google.dev](https://ai.google.dev/)*
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
- **Google Gemini API**
- **html2pdf.js** (PDF seguindo margens ABNT)
