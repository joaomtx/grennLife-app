# Contexto: Perfil

Apresentação pública do membro: nome, bio, foto e contadores exibidos.

## domain/
- `model/Perfil.js` — Agregado Perfil (membroId, nomeCompleto, bio, foto).
- `value-objects/Bio.js` — VO bio (até 255).
- `value-objects/FotoPerfil.js` — VO nome do arquivo da foto (padrão default-profile.png).
- `repositories/PerfilRepository.js` — PORTA de persistência do perfil.
- `events/FotoDePerfilTrocada.js` — Evento: permite remover a foto antiga de forma assíncrona.

## application/
- `use-cases/ObterMeuPerfil.js` — Consulta do perfil do membro logado.
- `use-cases/AtualizarPerfil.js` — Atualiza nome/bio/foto; usa FileStorage para a foto.
- `use-cases/ObterPerfilPublico.js` — Perfil por username + produtos do autor (via porta de leitura do Catálogo) + isOwner.
- `handlers/AoRegistrarConta.js` — Cria perfil inicial ao receber ContaRegistrada.

## infrastructure/
- `persistence/SequelizePerfilRepository.js` — Adaptador (tabela users, colunas de perfil).
- `upload/profilePhotoUpload.js` — Multer para foto de perfil (limite e filtro iguais aos do produto).

## interfaces/
- `http/profileRoutes.js` — GET/PUT /profile/me, GET /profile/:username.
- `http/profileController.js` — Traduz HTTP -> casos de uso.
- `http/profileValidators.js` — profileUpdateValidator.
