**Conceito**

O API client é a camada que centraliza toda comunicação HTTP com o backend Fastify — em vez de cada componente fazer `fetch` direto, eles chamam funções desse client. Isso separa "como buscar dado" de "como exibir dado".

**Passos**

1. **Base URL centralizada** — uma constante (variável de ambiente, `.env.local`) apontando pro endereço do backend, evita hardcode espalhado.

2. **Função fetch base** — um wrapper único que lida com: montar URL, headers padrão, tratamento de erro HTTP (status não-2xx), parse de JSON. Todo client de entidade usa essa função por baixo.

3. **Um arquivo por entidade** (`drivers.ts`, `races.ts`, `results.ts`, `teams.ts`, `cars.ts`) dentro de `libs/api/` (ou nome equivalente) — cada um exporta funções como `getDrivers()`, `getDriverById(id)`, seguindo o padrão REST do seu backend.

4. **Tipagem de retorno** — cada função de client retorna Promise tipada com as interfaces que você já criou (`Promise<Driver[]>`, `Promise<Driver>`), conectando o client às types.

5. **Tratamento de erro consistente** — decidir se erros lançam exceção (`throw`) pra serem pegos pelo React Query, ou retornam objeto de erro — geralmente se deixa o React Query lidar com isso via `throw`, é o padrão mais limpo.

6. **Endpoint mapping** — conferir se os paths batem exatamente com as rotas do Fastify (ex: `/drivers`, `/races/:id`) antes de codar, pra não ter retrabalho.
