# Sobre os prints desta pasta

Os prints foram gerados em um **ambiente de teste** (banco MariaDB local de teste, contas
`joaomonteiro`, `mariasouza` e `anacosta`, imagens de exemplo). O código testado é exatamente
o deste projeto.

| Arquivo | Conteúdo |
|---|---|
| `menu-avatar.jpg` | Menu do avatar aberto (alinhado à direita) |
| `perfil-publico.jpg` | Perfil público do dono, com itens e botão "Editar Perfil" |
| `modal-exclusao.jpg` | Meus Itens com o modal de exclusão aberto |
| `editar.jpg` | Tela de edição pré-preenchida, com prévia da imagem nova |
| `curl-00-reload.jpg` | Detalhe chamado 2x → contagens consecutivas (= banco) |
| `curl-01-my-products.jpg` | `GET /my-products`: 401 / lista mais nova primeiro / `[]` |
| `curl-02-edit.jpg` | `GET /products/:id/edit`: 401 / 403 / 404 / 200 sem mudar views |
| `curl-03-put-texto.jpg` | `PUT` só texto → 200, arquivo e contagem iguais |
| `curl-04-put-arquivo.jpg` | `PUT` com arquivo → nome mudou, contagem antes/depois igual |
| `curl-05-orfaos.jpg` | Órfãos: 403 (B) e 400 (título vazio), contagem não sobe |
| `curl-06-delete.jpg` | `DELETE`: 403 / 200 / 404 no GET / arquivo sumiu / contador -1 / 404 |
| `curl-07-profile.jpg` | Perfil público: anônimo / dono / B / inexistente |
| `extras/` | Prints de apoio (estado vazio, 403 na edição, perfil anônimo etc.) e o resultado dos 49 testes de tela |

Nos comandos, `$TOKEN_A` e `$TOKEN_B` são os tokens do `POST /api/login` de cada conta.
