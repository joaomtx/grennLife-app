# Contexto: Catálogo de Produtos (Core)

Publicação e ciclo de vida do produto: publicar, editar, trocar imagem, visualizar e excluir.

## domain/
- `model/Produto.js` — Agregado Produto: invariantes de dono, título e imagem; registra eventos.
- `value-objects/TituloProduto.js` — VO título obrigatório (aparado).
- `value-objects/DescricaoProduto.js` — VO descrição (até 500).
- `value-objects/ImagemProduto.js` — VO imagem (jpeg/png/gif).
- `policies/PoliticaDePropriedade.js` — Regra: 404 antes de 403; só o autor altera.
- `repositories/ProdutoRepository.js` — PORTA: buscarPorId, listarPorAutor, salvar, remover.
- `events/ProdutoPublicado.js` — Evento.
- `events/ProdutoEditado.js` — Evento.
- `events/ImagemDoProdutoTrocada.js` — Evento (imagem antiga a remover).
- `events/ProdutoVisualizado.js` — Evento.
- `events/ProdutoExcluido.js` — Evento (Interações e Mídia reagem).

## application/
- `use-cases/PublicarProduto.js` — Comando.
- `use-cases/EditarProduto.js` — Comando.
- `use-cases/ExcluirProduto.js` — Comando: exclui SÓ o produto e publica ProdutoExcluido (não conhece curtidas/comentários).
- `use-cases/ObterDetalheProduto.js` — Consulta (sem efeito colateral).
- `use-cases/RegistrarVisualizacao.js` — Comando separado da consulta (CQS).
- `use-cases/ObterProdutoParaEdicao.js` — Consulta restrita ao dono.
- `use-cases/ListarMeusProdutos.js` — Consulta.

## infrastructure/
- `persistence/ProductModel.js` — Model Sequelize da tabela products.
- `persistence/SequelizeProdutoRepository.js` — Adaptador de ProdutoRepository.
- `upload/productImageUpload.js` — Multer da imagem do produto.

## interfaces/
- `http/productRoutes.js` — Todas as rotas /products e /my-products (saem de userRoutes).
- `http/productController.js` — Traduz HTTP -> casos de uso.
- `http/productValidators.js` — productUploadValidator / productUpdateValidator.
