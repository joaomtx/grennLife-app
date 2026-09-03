# Ficha de Preparação - greenLife

- **Nome do Projeto:** greenLife
- **Entidade Principal:** Product
- **Campo de busca da entidade principal (plural, camelCase):** `products`
- **Porta da API:** 3000
- **Porta do Front:** 5173

---

# Checklists da Atividade - Aula 01

## PARTE A - Backend

- [x] node -v e npm -v conferidos
- [x] Pasta greenlife-app-api criada, separada da pasta do front
- [x] package.json gerado com npm init -y
- [x] express , cors , dotenv , morgan instalados como dependências
- [x] nodemon instalado como devDependency
- [x] Scripts start e dev configurados no package.json
- [x] Pastas bin/ , config/ , middlewares/ , modules/ , routes/ criadas
- [x] .gitignore criado com node_modules/ e .env
- [x] middlewares/apiResponse.js criado com as funções success e error
- [x] routes/index.js criado, com name / message adaptados
- [x] Campo data.status escrito exatamente assim (minúsculo)
- [x] .env criado com PORT e CORS_ORIGIN corretos
- [x] app.js criado, montando indexRouter sob o prefixo /api
- [x] bin/www criado
- [x] npm run dev sobe o servidor sem erros

## PARTE B - Frontend

- [x] Estrutura de pastas criada
- [x] HelloWorld.vue removido e style.css limpo
- [x] .env criado com a VITE_API_URL apontando para a sua API
- [x] .gitignore configurado
- [x] Tabela de tradução "funcionalidade -> tela" preenchida
- [x] Uma tela placeholder criada para cada linha da tabela
- [x] src/router/index.js criado com todas as rotas do seu sistema
- [x] Router registrado em main.js
- [x] TheNavbar.vue , TheSidebar.vue e TheFooter.vue criados
- [x] Layout montado em App.vue , com <router-view /> no lugar certo
- [x] Landing Page exibindo "Status da API: online" com dados reais

# Checklists da Atividade - Aula 02

## PARTE A - Backend: o primeiro módulo de domínio

- [x] Pasta `modules/search/` criada
- [x] `searchService.js` criado, com nome `products` no plural
- [x] `searchController.js` criado, usando `exports.search`
- [x] `searchRoutes.js` criado, com `router.get('/search', ...)`
- [x] `searchRoutes` importado e registrado em `app.js`
- [x] API reiniciou sem erros
- [x] Testes isolados com `curl` realizados (busca com/sem termo e `/api` funcional)

## PARTE B - Frontend: a camada de comunicação

- [x] `src/services/api.js` criado com `axios.create(...)`
- [x] Interceptor de resposta adicionado em `api.js` com comentários explicativos
- [x] `authService.js` criado
- [x] `searchService.js` criado, usando `params: { q: query }`
- [x] `systemService.js` criado
- [x] `LandingView.vue` refatorada usando `systemService`
- [x] Validação de ponta a ponta realizada (teste temporário e erro de rede)
- [x] Código de teste temporário removido
