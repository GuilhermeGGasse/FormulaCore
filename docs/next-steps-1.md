Finalizar NotFoundError em todos os services (substituir Error genérico) - [x] Tarefa concluída

Criar ConflictError (para casos de vínculo/duplicidade)  - [x] Tarefa concluída

Substituir Error genérico por ConflictError onde aplicável nos services - [x] Tarefa concluída

Integrar essas classes no errorHandler.ts (adicionar bloco instanceof ConflictError) - [x] Tarefa concluída

Remover try/catch redundantes dos controllers (já que o erro central assume esse papel) - [x] Tarefa concluída

Validação de schema de entrada (body/params) antes de chegar no controller - [ ] Tarefa não concluída

Configuração centralizada de variáveis de ambiente (config/env.ts) - [ ] Tarefa não concluída

Testar todas as rotas manualmente (Postman/Insomnia) - [ ] Tarefa não concluída