# Sobre os prints desta pasta

Gerados em um **ambiente de teste** (banco MariaDB de teste, contas `joaomonteiro` = A,
`mariasouza` = B e `anacosta`, imagens de exemplo). O código testado é exatamente o deste projeto.

| Arquivo | Conteúdo |
|---|---|
| `detalhe-interacao.jpg` | Detalhe logado como B: coração ativo e comentários (inclui o teste de XSS aparecendo como texto e um comentário de duas linhas) |
| `otimista.jpg` | Página capturada 80 ms após o clique com throttling Slow 4G: coração já alterado e o POST ainda pendente. O painel da direita é o registro de rede capturado pelo Chrome DevTools Protocol (não é o painel visual do DevTools) |
| `rollback.jpg` | Modo Offline: o coração voltou atrás e a mensagem de erro apareceu |
| `curtidos.jpg` | Tela de itens curtidos (link "Curtidos" na barra lateral e no menu do avatar) |
| `unique.jpg` | Cliente MariaDB recusando a curtida repetida (`ERROR 1062 Duplicate entry`) |
| `curl-01` … `curl-09` | Um print para cada grupo de testes da Etapa 4 |
| `extras/` | Tabelas/colunas no banco, contadores em Meus Itens e o resultado dos 27 testes de tela |

> Se o professor quiser o print do **painel Network do DevTools** em `otimista.jpg`, refaça na sua
> máquina: DevTools → Network → Slow 4G → clicar no coração → print antes do POST terminar.

Teste do trim (Bloco 10.9), no back-end:
`TOKEN=<token> PRODUCT_ID=<id de um produto seu> IMAGE=<uma imagem.jpg> node scripts/test-trim.js`
