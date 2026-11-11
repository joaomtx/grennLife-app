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
- [ ] Edição manual do token no localStorage -> redirecionado ao Login (teste do interceptor).

# Checklists da Atividade - Aula 06

## PARTE A - Backend: Checkpoint de Consistência

- [x] checkpoint-01.md criado e respondido
- [x] Todos os endpoints já construídos continuam respondendo como esperado

## PARTE B - Frontend: Componentização e Consistência Visual

- [x] bootstrap-icons incluído via CDN
- [x] Os três componentes-base (BaseInput, BaseButton, FormCard) criados em src/components/base/
- [x] As três telas refatoradas para usar BaseInput / BaseButton / FormCard
- [x] Tela de Registro finalmente estilizada
- [x] composables/useAuth.js criado
- [x] Guarda de rota atualizado para usar useAuth()
- [x] Navbar atualizada para usar useAuth()
- [x] Nenhum link novo aponta para uma funcionalidade que seu projeto ainda não construiu

### Checklist de testes
- [x] Cadastro → confirme o redirecionamento ao Login, com a tela agora estilizada.
- [x] Login → confirme o redirecionamento à sua tela principal.
- [x] Navbar → confirme a troca correta entre estado logado/deslogado.
- [x] Edição de Perfil → confirme que os três comportamentos da Atividade 05 (dados reais, edição, upload de foto) continuam funcionando, agora passando pelos componentes-base.
- [x] Guarda de rota → deslogado, tente acessar a URL de uma tela protegida diretamente → confirme o redirecionamento ao Login.
- [x] Console do DevTools sem nenhum erro novo durante todo o teste.

# Checklists da Atividade - Aula 09

> Grupo B (arquivo único = imagem do produto). Onde o roteiro fala em "capa", aqui é a imagem do produto (campo `image`).

## PARTE A - Backend: CRUD do item, perfil público e arquivos órfãos

### Checklist das tarefas:
- [x] reload() adicionado ao seu detalhe
- [x] Duas chamadas seguidas ao detalhe devolvem contagens consecutivas
- [x] Verificação 404 antes de 403, nas duas funções que verificam dono
- [x] Ordem banco → disco respeitada
- [x] Contador do usuário decrementado na exclusão
- [x] Quatro handlers no controller (`getMyProducts`, `getProductForEdit`, `updateProduct` e `deleteProduct`)
- [x] Quatro rotas, com Multer antes do validador no PUT
- [x] include + order no nível de cima em getPublicProfile
- [x] isOwner devolvido no perfil público
- [x] /profile/:username com optionalAuth, depois de /profile/me
- [x] errorHandler.js atualizado para limpeza de arquivos órfãos e ainda sendo o último app.use do app.js

### Checklist dos testes:
- [x] GET /my-products sem token → 401; com A → lista, mais novo primeiro; com B (sem itens) → [].
- [x] GET /products/:id/edit: sem token → 401; com B → 403; id inexistente → 404; com A → 200 (e a contagem de visualizações não muda).
- [x] PUT só com texto, com A → 200, arquivo inalterado, nenhuma mudança na contagem de arquivos.
- [x] PUT com arquivo novo, com A → 200, nome do arquivo mudou, a contagem de arquivos da pasta continua igual (entrou um, saiu outro).
- [x] Órfãos: PUT com arquivo novo feito por B → 403; PUT com arquivo novo e título vazio feito por A → 400. Nos dois casos, a contagem de arquivos não subiu.
- [x] DELETE com B → 403; com A → 200; GET do item → 404; arquivos sumiram das pastas; contador do usuário caiu em 1; repetir o DELETE → 404.
- [x] GET /profile/:username anônimo (isOwner: false, lista de itens ordenada), com o token do dono (isOwner: true), com o token de B (false), e de um usuário inexistente (404).

## PARTE B - Frontend: menu, modal, card, Perfil Público, Meus Itens e Edição

### Checklist das tarefas:
- [x] useClickOutside.js criado
- [x] BaseModal.vue criado
- [x] Funções `getMyProducts()`, `getProductForEdit(id)`, `updateProduct(id, formData)` e `deleteProduct(id)` criadas
- [x] getPublicProfile criada
- [x] Card sem <a> gigante, com autor clicável/opcional e slot actions
- [x] O Feed da Atividade 08 continua funcionando sem alteração
- [x] Menu abre pelo clique, alinha à direita, fecha ao clicar fora/em um item/com Esc
- [x] Perfil Público com os três botões corretos (dono / logado / visitante)
- [x] Meus Itens com modal fora do card, busy e remoção local da lista
- [x] Editar Item com e sem arquivo novo
- [x] Autor clicável e botão "Editar" condicional no Detalhe
- [x] Link para Meus Itens na mensagem de sucesso do Upload

### Checklist dos testes:
- [x] Menu do avatar: abre, fecha fora, fecha com Esc, fecha ao escolher um item.
- [x] "Ver Perfil" → seu perfil, com Editar Perfil (não "Seguir") e seus itens. Clique no autor de um card de outra conta → perfil dela, com "Seguir" (que ainda não faz nada). A troca entre perfis acontece sem recarregar.
- [x] Janela anônima em /profile/<username> → sem "Seguir" e sem "Editar Perfil". Username inexistente → mensagem de erro, tela intacta.
- [x] Meus Itens: com uma conta sem itens → estado vazio com link; com itens → grade com Editar/Excluir. Clique em Excluir → o modal abre sem navegar para o detalhe, centralizado mesmo com o mouse sobre o card; Cancelar/X/clicar fora/Esc fecham; clicar dentro da caixa branca não fecha.
- [x] Confirme uma exclusão → o item some sem recarregar; os arquivos sumiram da pasta de uploads da API; o contador do perfil caiu.
- [x] Edição: formulário pré-preenchido; salve só o texto → arquivo mantido; troque o arquivo → prévia imediata, e o antigo some da pasta; apague o título → mensagem do cliente, sem requisição nova na aba Network.
- [x] DevTools → Network: o PUT com arquivo tem Content-Type: multipart/form-data; boundary=... .
- [x] Logado como B, digite na URL a edição de um item da A → mensagem de permissão, sem a tela quebrar. Id inexistente → mensagem de não encontrado.
- [x] Deslogado, abra a URL de Meus Itens → vai ao login e volta para ela depois de entrar.
- [x] Detalhe de um item seu → "Editar" visível; de outra pessoa → ausente.
- [x] Regressão: Feed, Detalhe com imagem, Upload, Meu Perfil, Login/Logout.
