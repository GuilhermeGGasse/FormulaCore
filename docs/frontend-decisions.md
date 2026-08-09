**Conceito**

O API client é a camada que centraliza toda comunicação HTTP com o backend Fastify — em vez de cada componente fazer `fetch` direto, eles chamam funções desse client. Isso separa "como buscar dado" de "como exibir dado".

**Passos**

1. **Base URL centralizada** — uma constante (variável de ambiente, `.env.local`) apontando pro endereço do backend, evita hardcode espalhado.

2. **Função fetch base** — um wrapper único que lida com: montar URL, headers padrão, tratamento de erro HTTP (status não-2xx), parse de JSON. Todo client de entidade usa essa função por baixo.

3. **Um arquivo por entidade** (`drivers.ts`, `races.ts`, `results.ts`, `teams.ts`, `cars.ts`) dentro de `libs/api/` (ou nome equivalente) — cada um exporta funções como `getDrivers()`, `getDriverById(id)`, seguindo o padrão REST do seu backend.

4. **Tipagem de retorno** — cada função de client retorna Promise tipada com as interfaces que você já criou (`Promise<Driver[]>`, `Promise<Driver>`), conectando o client às types.

5. **Tratamento de erro consistente** — decidir se erros lançam exceção (`throw`) pra serem pegos pelo React Query, ou retornam objeto de erro — geralmente se deixa o React Query lidar com isso via `throw`, é o padrão mais limpo.

6. **Endpoint mapping** — conferir se os paths batem exatamente com as rotas do Fastify (ex: `/drivers`, `/races/:id`) antes de codar, pra não ter retrabalho.

**Documentação — Decisões de arquitetura (frontend)**

*Decisão 1: `jolpicaId` opcional na interface `Team`*

`Team` possui um campo `jolpicaId` (string), usado como referência cruzada com o id vindo da API Jolpica durante a ingestão automática de dados. Esse campo é opcional na interface e no schema Prisma porque nem todo `Team` tem essa origem — equipes criadas manualmente pela UI (via formulário CRUD) não possuem esse cruzamento. Tornar o campo obrigatório quebraria a criação manual, exigindo um valor que não existe nesse fluxo.

---

*Decisão 2: funções de create/update usam o tipo inferido do zod, não `Omit<Entity, "id">`*

Inicialmente, as funções `create<Entidade>`/`update<Entidade>` em `libs/api/` usavam `Omit<Entity, "id">` (derivado da interface principal da entidade) como tipo do parâmetro de entrada. Isso gerou conflitos de tipo em campos opcionais (ex: `circuitType` em `Race`), porque o zod e a interface TypeScript representam "campo vazio" de formas incompatíveis (`undefined` vs `null`).

A solução adotada foi desacoplar os dois tipos: as funções de create/update passaram a aceitar o tipo inferido diretamente do schema zod (`z.infer<typeof entitySchema>`, exportado como `<Entity>FormData`), em vez de `Omit<Entity, "id">`.

Justificativa: a interface principal (`Race`, `Team`, etc.) representa o formato de um dado **lido** da API; o schema zod representa o formato de um dado **validado para envio** via formulário. São responsabilidades diferentes — usar o tipo do zod como parâmetro de create/update é mais correto conceitualmente, além de eliminar atrito de tipagem. Esse é o padrão a seguir para as próximas entidades com formulário CRUD.
