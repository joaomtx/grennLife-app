# Contexto: Notificações (Questão 2)

Avisa o autor quando alguém curte ou comenta. Roda como serviço separado consumindo o broker.

## domain/
- `model/Notificacao.js` — Agregado Notificação (destinatário, tipo, ator, produto, lida).
- `repositories/NotificacaoRepository.js` — PORTA.

## application/
- `handlers/ProdutoCurtidoHandler.js` — Cria notificação de curtida.
- `handlers/ComentarioAdicionadoHandler.js` — Cria notificação de comentário.
- `ports/RealtimeNotifier.js` — PORTA: enviar(destinatarioId, notificacao).
- `ports/EmailNotifier.js` — PORTA.

## infrastructure/
- `messaging/AmqpConsumer.js` — Consumidor RabbitMQ (ack manual, DLQ).
- `messaging/IdempotencyGuard.js` — Tabela processed_events.
- `realtime/SocketIoNotifier.js` — Adaptador Socket.IO.
- `email/NodemailerNotifier.js` — Adaptador SMTP.
- `persistence/SequelizeNotificacaoRepository.js` — Adaptador.

## interfaces/
- `http/notificationRoutes.js` — GET /notifications, PATCH /notifications/:id/read.
- `messaging/eventRouter.js` — Mapa type -> handler.
