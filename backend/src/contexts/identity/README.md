# Contexto: Identidade e Acesso

Cadastro de conta, autenticação e emissão/validação de token. Não conhece produtos.

## domain/
- `model/Conta.js` — Agregado Conta (email, nomeDeUsuario, senhaHash).
- `value-objects/Email.js` — VO e-mail normalizado e válido.
- `value-objects/NomeDeUsuario.js` — VO nome de usuário (3-20 caracteres, aparado).
- `value-objects/SenhaHash.js` — VO senha já criptografada (nunca exposta).
- `repositories/ContaRepository.js` — PORTA de persistência: buscarPorLogin, existeEmailOuUsuario, salvar.
- `events/ContaRegistrada.js` — Evento: nova conta criada (consumido por Perfil).

## application/
- `use-cases/RegistrarConta.js` — Caso de uso: valida unicidade, gera hash e salva; publica ContaRegistrada.
- `use-cases/Autenticar.js` — Caso de uso: login por e-mail OU usuário; devolve token.
- `ports/HashService.js` — PORTA: gerarHash/comparar.
- `ports/TokenService.js` — PORTA: emitir/verificar token.

## infrastructure/
- `persistence/UserModel.js` — Model Sequelize da tabela users (colunas de conta).
- `persistence/SequelizeContaRepository.js` — Adaptador de ContaRepository.
- `security/BcryptHashService.js` — Adaptador bcryptjs.
- `security/JwtTokenService.js` — Adaptador jsonwebtoken (antigo config/jwt.js).

## interfaces/
- `http/authRoutes.js` — POST /register, /login, /logout.
- `http/authController.js` — Traduz HTTP -> RegistrarConta/Autenticar.
- `http/authValidators.js` — registerValidator, loginValidator.
- `http/middlewares/requireAuth.js` — Exige token; responde no formato apiResponse.
- `http/middlewares/optionalAuth.js` — Lê token se existir.
