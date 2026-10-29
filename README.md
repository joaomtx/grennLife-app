# GreenLife — Arquitetura orientada a DDD (Hexagonal)

Repositório da **Questão 1 da N2** de Projeto e Arquitetura de Software (Católica SC, Prof. Luiz Carlos Camargo).
Estudante: **João Pedro Teixeira Monteiro**.

Este repositório contém **somente a organização da arquitetura** do GreenLife reescrita segundo
*Domain-Driven Design* + Arquitetura Hexagonal (Portas e Adaptadores). Os arquivos `.js` são
marcadores com a responsabilidade de cada peça; o código executável continua no projeto de
Programação Web (`greenLife-app-api` + `greenLife-app-frontend`).

## Domínio
O GreenLife é uma rede social para quem cultiva plantas. Um membro publica um *produto*
(uma planta, muda ou item de jardinagem) com imagem, título e descrição; a comunidade navega
pelo feed, abre o detalhe, curte e comenta; cada membro tem um perfil público com seus produtos
e contadores. Ver [`docs/01-dominio.md`](docs/01-dominio.md).

## Como ler este repositório
| Pasta | O que tem |
|---|---|
| `docs/` | domínio, linguagem ubíqua, mapa de contextos, agregados/eventos e diagramas C4 (PlantUML) |
| `backend/src/shared-kernel/` | tipos e portas compartilhados por todos os contextos |
| `backend/src/contexts/<contexto>/` | um *bounded context*, sempre com as 4 camadas abaixo |
| `backend/src/main/` | *composition root*: liga portas a adaptadores e sobe o servidor |
| `frontend/src/modules/<contexto>/` | o front organizado pelos mesmos contextos |

### Camadas de cada contexto (regra de dependência: de fora para dentro)
```
interfaces/      -> adaptadores de ENTRADA (rotas/controllers HTTP, validadores, consumidores de fila)
application/     -> casos de uso, comandos/consultas, PORTAS de saída (interfaces)
domain/          -> agregados, entidades, value objects, eventos e serviços de domínio (sem Express/Sequelize)
infrastructure/  -> adaptadores de SAÍDA (Sequelize, disco, JWT, bcrypt, RabbitMQ)
```
`domain` não importa nada das outras camadas; `application` só conhece `domain` e as próprias
portas; `infrastructure` e `interfaces` implementam/usam as portas. Quem monta tudo é `main/container.js`.

## Bounded contexts
| Contexto | Tipo | Agregados | Endpoints atuais que absorve |
|---|---|---|---|
| Identidade e Acesso (`identity`) | Generic | `Conta` | `POST /register`, `POST /login`, `POST /logout` |
| Perfil (`profile`) | Supporting | `Perfil` | `GET/PUT /profile/me`, `GET /profile/:username` |
| Catálogo de Produtos (`catalog`) | **Core** | `Produto` | `POST /products/upload`, `GET /products/:id`, `GET /my-products`, `GET /products/:id/edit`, `PUT /products/:id`, `DELETE /products/:id` |
| Interações (`engagement`) | **Core** | `Curtida`, `Comentario` | `POST /products/:id/toggle-like`, `GET /products/:id/like-status`, `GET /liked-products`, `POST/GET /products/:id/comments` |
| Descoberta (`discovery`) | Supporting (read model) | — (projeções) | `GET /feed`, `GET /search` |
| Notificações (`notification`) | Supporting | `Notificacao` | novo (Questão 2) |

Mapa de contextos: [`docs/03-mapa-de-contextos.md`](docs/03-mapa-de-contextos.md) ·
Diagramas C4: [`docs/c4/`](docs/c4/)
