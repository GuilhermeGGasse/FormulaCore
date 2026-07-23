Aqui vai a documentação desse erro, pronta pra você salvar:

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

Se quiser, posso ajustar o formato (mais resumido, ou como um arquivo `.md` separado de notas técnicas do projeto).