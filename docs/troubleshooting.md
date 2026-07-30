
---

## Erro: Conversão de `class` para `const` (objeto literal) em Controllers

**Contexto:** ao trocar a declaração de um controller de `class` para `const` (padronizando com o restante do projeto, que usa objetos literais em models e services), surgiram múltiplos erros de sintaxe em cascata.

**Causa raiz:** a sintaxe de método dentro de uma `class` é estruturalmente diferente da sintaxe de propriedade dentro de um objeto literal. Trocar só a palavra-chave (`class` → `const`) sem ajustar a sintaxe interna de cada método gera erros como "vírgula esperada", "tipo `any` implícito" e "declaração inválida".

**As 5 mudanças necessárias:**

1. **Trocar `class` por `const`** — a declaração do controller deixa de ser uma classe e passa a ser uma constante que recebe um objeto
2. **Adicionar `=`** — depois do nome do controller e antes da chave `{`, já que um objeto literal precisa ser atribuído (`export const driverController = {`, e não `export const driverController {`)
3. **Adicionar `async` antes dos parâmetros da função** (mantido na mesma posição, mas agora como parte de uma arrow function, não de um método de classe)
4. **Adicionar `=>`** logo após o fechamento dos parênteses dos parâmetros, indicando o início do bloco da função (sintaxe de arrow function, que objetos literais exigem)
5. **Adicionar vírgula (`,`) ao final de cada método** — dentro de um objeto literal, cada propriedade precisa ser separada da próxima por vírgula; classes não exigem isso entre métodos

**Exemplo da transformação (um método):**

Antes (classe):
```typescript
async getAllDrivers(request: FastifyRequest, reply: FastifyReply) {
  ...
}
```

Depois (objeto literal):
```typescript
getAllDrivers: async (request: FastifyRequest, reply: FastifyReply) => {
  ...
},
```

---


---

## Erro: Resposta da API retornando o objeto interno da query do Prisma em vez dos dados

**Sintoma:** ao chamar uma rota `GET` (ex: `/teams`), a resposta veio assim, em vez de um array de dados:
```json
{
  "spec": {
    "action": "findMany",
    "args": { "include": { "drivers": true, "cars": true } },
    "model": "Team"
  }
}
```

**Causa raiz:** faltava `await` no `controller`, na chamada ao `service`. Sem o `await`, a variável recebe a **Promise não resolvida** do Prisma (que carrega internamente essa "especificação" da query), em vez do resultado já processado. O Fastify, ao serializar essa Promise diretamente na resposta, expôs a estrutura interna dela em vez de esperar a resolução.

**Onde o `await` é necessário, revisando a cadeia de camadas:**
- **Model:** geralmente não precisa, se a função só repassa a chamada do Prisma direto (ex: `findAll: () => prisma.team.findMany({...})`)
- **Service:** só precisa se houver lógica extra dependendo do resultado antes de retornar
- **Controller:** **sempre precisa**, já que é a última parada antes de enviar a resposta HTTP — é aqui que o valor precisa estar totalmente resolvido

**Correção aplicada:**
```typescript
// Antes (bug)
const teams = teamService.getAllTeams();
return reply.status(200).send(teams);

// Depois (correto)
const teams = await teamService.getAllTeams();
return reply.status(200).send(teams);
```

**Abrangência:** o mesmo erro estava presente em métodos `getAll` de múltiplos controllers (não só `Team`) — corrigido sistematicamente em todos.

---

Aqui vai a documentação resumida:

---

## Erro: Rota duplicada (`FST_ERR_DUPLICATED_ROUTE`)

**Sintoma:** o servidor falhava ao iniciar, lançando `FastifyError: Method 'GET' already declared for route '...'`. Consequência indireta: como o erro ocorria durante o registro das rotas (antes do `listen`), o servidor nunca chegava a abrir a porta — resultando em recusa de conexão (`ERR_CONNECTION_REFUSED`) tanto no navegador quanto no `curl`, sem nenhuma mensagem de erro visível no terminal (por causa de um problema relacionado, do callback do `listen` não verificar erro).

**Causa raiz:** havia rotas `GET` duplicadas para o mesmo caminho dentro de arquivos de rota de múltiplas entidades — resquício de ajustes anteriores (ex: renomeação de métodos, correção de caminho) em que a versão antiga da rota não foi removida antes de adicionar a nova.

**Correção:** revisão de cada arquivo de rota, identificando e removendo as declarações duplicadas, mantendo apenas uma rota por combinação de método e caminho.

**Aprendizado relacionado:** o callback do `server.listen` deve sempre verificar e tratar um possível erro — sem isso, falhas de inicialização (como essa) ficam silenciosas, dificultando o diagnóstico.

Aqui vai a documentação resumida:

---

## Erro: Validação de duplicidade sempre disparava, mesmo sem registro existente

**Sintoma:** ao criar um `Team`, qualquer nome enviado (mesmo inédito) retornava `"Team already exists."`. Consequência: nenhum registro chegava a ser criado no banco (o `throw` interrompia a função antes do `create`).

**Causa raiz:** o método `findByName` no model usava `findMany` em vez de `findFirst`/`findUnique`. `findMany` sempre retorna um array — e um array, mesmo vazio (`[]`), é **truthy** em JavaScript. A checagem `if (team)` no service disparava como verdadeira sempre, independente de existir ou não um registro correspondente.

**Correção:** trocar `findMany` por `findFirst` (ou `findUnique`, se o campo for `@unique` no schema) em buscas que esperam **um único resultado** — assim o retorno é `null` quando não encontrado (falsy, correto) ou o objeto em si (truthy, correto).

**Aprendizado geral:** ao criar um método de busca no model, o tipo de retorno precisa ser escolhido conforme a expectativa da busca — `findMany` para listas (onde vazio é um resultado válido), `findFirst`/`findUnique` para verificações de existência única (onde `null` precisa representar "não encontrado" de forma confiável em checagens booleanas).

Aqui vai a documentação resumida:

---

## Erro: Erro de tipagem persistindo mesmo após schema/migration corretos

**Sintoma:** ao tornar `circuitType`, `length` e `laps` opcionais no `model Race`, o TypeScript continuava acusando erro de incompatibilidade de tipo (`undefined` não atribuível a `CircuitType`), mesmo com a migration já aplicada corretamente.

**Causa raiz:** cache do TypeScript Server do VS Code — os tipos do Prisma Client já haviam sido regenerados corretamente, mas o editor continuava usando uma versão em memória desatualizada dos tipos.

**Correção:** reiniciar o TS Server do VS Code (`Ctrl+Shift+P` → "TypeScript: Restart TS Server").

**Aprendizado geral:** ao alterar `schema.prisma` e rodar a migration, se o erro de tipo persistir mesmo com tudo aparentemente correto, reiniciar o TS Server antes de suspeitar de erro real no código — é a causa mais comum desse tipo de sintoma "fantasma".