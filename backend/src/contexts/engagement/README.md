# Contexto: Interações (Core)

Curtidas e comentários da comunidade sobre produtos.

## domain/
- `model/Curtida.js` — Agregado Curtida (membroId + produtoId únicos).
- `model/Comentario.js` — Agregado Comentário.
- `value-objects/ConteudoComentario.js` — VO texto aparado, 1-500 caracteres.
- `repositories/CurtidaRepository.js` — PORTA.
- `repositories/ComentarioRepository.js` — PORTA.
- `events/ProdutoCurtido.js` — Evento (consumido por Notificações).
- `events/CurtidaRemovida.js` — Evento.
- `events/ComentarioAdicionado.js` — Evento (consumido por Notificações).

## application/
- `use-cases/AlternarCurtida.js` — Comando curtir/descurtir.
- `use-cases/ConsultarStatusCurtida.js` — Consulta.
- `use-cases/ListarProdutosCurtidos.js` — Consulta (usa porta de leitura do Catálogo).
- `use-cases/Comentar.js` — Comando.
- `use-cases/ListarComentarios.js` — Consulta.
- `ports/CatalogoGateway.js` — PORTA (ACL): existeProduto(produtoId), resumoProdutos(ids).
- `handlers/AoExcluirProduto.js` — Remove curtidas e comentários quando chega ProdutoExcluido.

## infrastructure/
- `persistence/LikeModel.js` — Model Sequelize (índice único user_id+product_id).
- `persistence/CommentModel.js` — Model Sequelize.
- `persistence/SequelizeCurtidaRepository.js` — Adaptador.
- `persistence/SequelizeComentarioRepository.js` — Adaptador.
- `acl/CatalogoGatewayLocal.js` — Adaptador da porta CatalogoGateway chamando o Catálogo em processo.

## interfaces/
- `http/likeRoutes.js` — toggle-like, like-status, liked-products.
- `http/commentRoutes.js` — POST/GET comments.
- `http/commentValidators.js` — commentValidator.
