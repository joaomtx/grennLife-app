# Diagramas C4 (PlantUML)

Abra no VS Code com as extensões *PlantUML* e *PlantUML Previewer*. Os arquivos usam a biblioteca
padrão `!include <C4/...>`, que já vem no PlantUML.

| Arquivo | Nível |
|---|---|
| `00-mapa-de-contextos.puml` | Mapa de contextos DDD |
| `01-contexto.puml` | C4 Nível 1 — Contexto |
| `02-conteineres.puml` | C4 Nível 2 — Contêineres (com a camada de mensageria) |
| `03-componentes-api.puml` | C4 Nível 3 — Componentes da comunicação na API + Outbox Relay |
| `04-componentes-notificacoes.puml` | C4 Nível 3 — Serviço de Notificações |
| `05-dinamico-curtir.puml` | Diagrama dinâmico do fluxo "curtir produto" |
