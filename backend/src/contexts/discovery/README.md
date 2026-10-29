# Contexto: Descoberta: Feed e Busca

Modelos de leitura otimizados: feed paginado, busca global e contadores.

## domain/
- (sem modelo de escrita: contexto só de leitura)

## application/
- `queries/ObterFeed.js` — Consulta paginada (page/limit).
- `queries/BuscaGlobal.js` — Busca por produtos e membros.
- `projections/ProjecaoContadores.js` — Atualiza likesCount/commentsCount/productsCount/views a partir dos eventos.
- `ports/FeedReadRepository.js` — PORTA de leitura.

## infrastructure/
- `read/SequelizeFeedReadRepository.js` — Adaptador de leitura (JOIN products + users).

## interfaces/
- `http/feedRoutes.js` — GET /feed.
- `http/searchRoutes.js` — GET /search.
