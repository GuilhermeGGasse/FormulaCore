# FormulaCore

## Descrição do Produto

FormulaCore é uma API REST dedicada a dados históricos e estruturados de Fórmula 1, cobrindo pilotos, equipes, carros, corridas e resultados desde os primórdios da categoria até a temporada atual.

O projeto nasce da ausência de uma fonte oficial e pública de dados da F1 acessível a desenvolvedores: a FOM (Formula One Management) não disponibiliza uma API própria para uso externo. O FormulaCore preenche essa lacuna consumindo fontes públicas confiáveis (Jolpica-F1, sucessora da extinta Ergast API) e organizando esses dados num banco relacional próprio, expondo endpoints estruturados e prontos para consumo em aplicações de terceiros — sites de estatísticas, dashboards de fantasy F1, ferramentas de análise histórica ou qualquer projeto que precise desses dados sem lidar diretamente com scraping ou parsing de fontes externas.

A proposta central é oferecer consultas rápidas, consistentes e bem modeladas sobre:

- **Pilotos** — histórico de carreira, número, equipe atual
- **Equipes** — construtores e suas composições ao longo das temporadas
- **Carros** — chassi, motor, potência e peso por temporada
- **Corridas** — circuito, tipo (rua ou permanente), comprimento, número de voltas, temporada e data
- **Resultados** — posição final, pontos, voltas completadas e status de cada piloto em cada corrida

## Descrição Técnica

**Stack principal:**
- **Node.js** + **TypeScript**
- **Fastify** como framework HTTP
- **Prisma ORM v6** para modelagem e acesso ao banco de dados
- **PostgreSQL** como banco de dados relacional

**Arquitetura em camadas:**

O projeto segue uma separação clara de responsabilidades:

```
model (schema.prisma) → models/ → services/ → controllers/ → routes/
```

- **`schema.prisma`** — define as entidades (`Driver`, `Team`, `Car`, `Race`, `Result`) e seus relacionamentos
- **`models/`** — encapsula o Prisma Client, centralizando as queries por entidade
- **`services/`** — concentra as regras de negócio
- **`controllers/`** — trata requisição e resposta HTTP
- **`routes/`** — expõe os endpoints da API

**Modelagem de dados:**

- `Driver` e `Team`: relação um-para-muitos (um time tem vários pilotos)
- `Car` e `Team`: relação um-para-muitos (um time pode ter múltiplos registros de carro ao longo das temporadas)
- `Result`: entidade de junção entre `Race`, `Driver` e `Team`, representando o desempenho de um piloto em uma corrida específica
- `Race` utiliza um `enum` (`CircuitType`) para restringir o tipo de circuito a `STREET` ou `PERMANENT`

**Fontes de dados:**

- **Jolpica-F1** — API compatível com a extinta Ergast, usada para ingestão de dados históricos (corridas, pilotos, equipes, resultados) desde 1950
- **OpenF1 / FastF1 (livetiming)** — fonte complementar para dados de sessão em tempo real e telemetria, quando aplicável

A ingestão desses dados é feita por jobs próprios que populam o banco PostgreSQL local, evitando que a API do FormulaCore dependa de chamadas externas em tempo de requisição do usuário final.

## Como Instalar

**Pré-requisitos:**
- Node.js instalado
- PostgreSQL instalado e rodando (local ou remoto)

**1. Clonar o repositório**
```bash
git clone <url-do-repositorio>
cd formula-core/backend
```

**2. Instalar as dependências**
```bash
npm install
```

**3. Configurar variáveis de ambiente**

Crie um arquivo `.env` na raiz do backend com a string de conexão do PostgreSQL:
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
```

**4. Rodar as migrations do Prisma**
```bash
npx prisma migrate dev
```

Isso cria as tabelas no banco de dados e gera o Prisma Client.

**5. Iniciar o servidor**
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`.
