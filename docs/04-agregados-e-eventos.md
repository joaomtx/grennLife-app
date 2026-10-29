# Agregados, invariantes e eventos de domínio

## Produto (Catálogo) — raiz de agregado
- Value objects: `TituloProduto` (obrigatório após *trim*), `DescricaoProduto` (≤ 500), `ImagemProduto` (jpeg/png/gif), `ProdutoId`, `AutorId`.
- Invariantes: só o autor edita/exclui; título nunca vazio; sempre tem imagem.
- Comportamentos: `publicar()`, `editar(titulo, descricao)`, `trocarImagem(nova)`, `registrarVisualizacao()`, `excluir(porQuem)`.
- Eventos: `ProdutoPublicado`, `ProdutoEditado`, `ImagemDoProdutoTrocada`, `ProdutoVisualizado`, `ProdutoExcluido`.

## Curtida (Interações)
- Identidade natural: (`MembroId`, `ProdutoId`) — invariante "uma pessoa só curte uma vez", garantida também pelo índice único.
- Eventos: `ProdutoCurtido`, `CurtidaRemovida`.

## Comentário (Interações)
- Value object `ConteudoComentario` (aparado, 1 a 500 caracteres).
- Eventos: `ComentarioAdicionado`.

## Conta (Identidade) e Perfil (Perfil)
- `Conta`: `Email`, `NomeDeUsuario` (3–20), `SenhaHash`. Evento `ContaRegistrada`.
- `Perfil`: `NomeCompleto` (obrigatório), `Bio` (≤ 255), `FotoPerfil`. Evento `PerfilAtualizado`, `FotoDePerfilTrocada`.

## Contadores (`likesCount`, `commentsCount`, `productsCount`, `views`)
Na versão DDD deixam de ser escritos "à mão" dentro de vários serviços: são **projeções** mantidas
por handlers de eventos (contexto Descoberta). Hoje são atualizados na mesma transação; o handler
interno roda dentro da mesma Unidade de Trabalho, mantendo a consistência atual, e pode virar
assíncrono no futuro sem mudar os casos de uso.
