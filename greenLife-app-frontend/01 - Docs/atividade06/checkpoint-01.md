# Checkpoint de Consistência - Atividade 06

- **Alguma rota (*Routes.js) contém lógica de negócio, em vez de só declarar verbo + caminho + middlewares + controller?**
  Não. As rotas apenas definem o caminho, middlewares e controller.
- **Algum Controller consulta o Model diretamente, sem passar pelo Service?**
  Não. Todos os controllers interagem exclusivamente com as respectivas camadas de Service.
- **Algum Service faz referência a req / res?**
  Não. Os services lidam apenas com a lógica de negócio e retornos de dados/erros.
- **Todo Controller usa success() / error() de apiResponse.js?**
  Sim. Todos os retornos dos controllers utilizam o padrão de resposta da aplicação.
- **Toda rota que chama uma função async está envolvida em asyncHandler?**
  Sim. O `asyncHandler` está aplicado em todas as rotas que realizam chamadas assíncronas.
- **Toda validação de entrada usa express-validator, sem nenhum if manual escondido?**
  Sim. As validações são realizadas através de middlewares do `express-validator`.
- **config/constants.js não tem nenhuma constante solta sem uso, nem nenhum valor de validação fora dela?**
  As constantes estão organizadas e em uso.
- **A constante de limite da bio (Aula 05) é usada exatamente uma vez, no lugar certo?**
  Sim, o limite da bio está definido corretamente em `constants.js` e utilizado apenas na validação correspondente.
