- **Nome do banco de dados MySQL do seu projeto:** `greenlife_db`
- **Nome do campo de contagem de itens publicados:** `productsCount`

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

# Checklists da Atividade - Aula 02

- [x] `src/services/api.js` criado com `axios.create(...)`
- [x] Interceptor de resposta adicionado em `api.js` com comentários explicativos
- [x] `authService.js` criado
- [x] `searchService.js` criado, usando `params: { q: query }`
- [x] `systemService.js` criado
- [x] `LandingView.vue` refatorada usando `systemService`
- [x] Validação de ponta a ponta realizada (teste temporário e erro de rede)
- [x] Código de teste temporário removido

# Checklists da Atividade - Aula 03

## PARTE A - Backend: persistência de dados e primeiro cadastro real

- [x] sequelize , mysql2 , bcryptjs , express-validator instalados
- [x] Banco de dados criado no MySQL
- [x] .env atualizado com DB_HOST , DB_PORT , DB_NAME , DB_USER , DB_PASSWORD
- [x] config/database.js criado
- [x] config/constants.js criado
- [x] userModel.js criado, com o campo de contagem renomeado corretamente
- [x] userValidator.js criado
- [x] userService.js criado, com getPublicProfile também usando o campo de contagem renomeado
- [x] middlewares/asyncHandler.js criado
- [x] middlewares/errorHandler.js criado
- [x] userRoutes e errorHandler importados e registrados em app.js
- [x] Terminal exibe Banco de dados sincronizado! ao subir a API
- [x] Cadastro com sucesso responde 201 com { id, username, email }
- [x] Senha curta responde 400 com a mensagem correta
- [x] Cadastro duplicado responde 500
- [x] GET /profile/:username confirma os dados persistidos

## PARTE B - Frontend: a Tela de Registro

- [x] Existe um link clicável para /register em algum lugar acessível a um visitante deslogado
- [x] Formulário controlado com v-model amarrando cada campo a form
- [x] errors e apiErrorMessage já preparados no <script setup>
- [x] validate() replica exatamente os mesmos limites configurados no userValidator.js do seu back-end
- [x] Mensagens de erro aparecem/desaparecem corretamente conforme o usuário corrige os campos
- [x] Envio vazio não dispara nenhuma chamada de rede
- [x] Cadastro válido navega para /login
- [x] Cadastro duplicado exibe apiErrorMessage com a mensagem vinda de verdade da API

# Checklists da Atividade - Aula 04

## PARTE A - Backend: Login, JWT e Middleware de Autenticação

### Checklist das tarefas:
- [x] jsonwebtoken instalado
- [x] .env atualizado com JWT_SECRET e JWT_EXPIRES_IN
- [x] config/jwt.js criado e programado
- [x] middlewares/auth.js criado e programado
- [x] userService.js atualizado com loginUser e getUserProfile
- [x] userValidator.js atualizado com loginValidator
- [x] userController.js atualizado com login , logout , getMyProfile
- [x] userRoutes.js atualizado, com /profile/me antes de /profile/:username

### Checklist dos testes:
- [x] Login com sucesso devolve token e user (incluindo isAdmin )
- [x] Senha errada devolve 500 com mensagem genérica
- [x] GET /profile/me sem token devolve 401
- [x] GET /profile/me com token válido devolve os dados do usuário
- [x] GET /profile/me com token inválido devolve 401

## PARTE B - Frontend: Login, Pinia e Proteção de Rotas

### Checklist das tarefas:
- [x] createPinia() registrado em main.js
- [x] stores/auth.js criado, com persistência via localStorage
- [x] Interceptor de requisição anexando Authorization
- [x] Interceptor de resposta limpando a sessão e redirecionando em qualquer 401
- [x] Bootstrap 5 (CDN) incluído
- [x] assets/main.css criado, com a cor de marca
- [x] Tela de Login funcional, chamando authStore.login(...)
- [x] Destino pós-login ajustado
- [x] Guarda de rota bloqueando acesso direto
- [x] useAuthStore() chamado dentro do callback
- [x] Navbar mostra links diferentes conforme o estado de login
- [x] Logout limpa a sessão e redireciona ao Login

### Checklist de testes
- [x] Login funcional -> redireciona à tela principal.
- [x] F5 na página logado -> sessão persiste.
- [x] Logout -> URL protegida redireciona ao Login, com ?redirect=...
- [x] Login a partir dessa tela -> volta à rota original.
- [x] Edição manual do token no localStorage -> redirecionado ao Login (teste do interceptor).

