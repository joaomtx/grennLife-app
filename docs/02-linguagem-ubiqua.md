# Linguagem ubíqua

| Termo | Significado no GreenLife | Nome no código atual |
|---|---|---|
| Membro | Pessoa com conta | `User` |
| Visitante | Pessoa sem token | `req.user == null` |
| Conta | Credenciais (e-mail, usuário, senha) | `User.email/username/password` |
| Perfil | Apresentação pública do membro | `User.fullName/bio/profilePicture` |
| Produto | Item publicado com imagem | `Product` |
| Autor | Membro que publicou o produto | `Product.userId` |
| Publicar | Criar um produto com imagem | `POST /products/upload` |
| Visualização | Abertura do detalhe por qualquer pessoa | `Product.views` |
| Curtida | Marca única de um membro em um produto | `Like` |
| Comentário | Texto de até 500 caracteres sobre um produto | `Comment` |
| Feed | Lista paginada dos produtos mais recentes | `GET /feed` |
| Meus Itens | Produtos do membro logado | `GET /my-products` |
| Curtidos | Produtos que o membro curtiu | `GET /liked-products` |
| Dono | Membro que é autor do produto (pode editar/excluir) | `isOwner` |
