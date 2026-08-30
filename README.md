# AssetOps Platform

Plataforma de monitoramento de ativos industriais com APIs em TypeScript, processamento assíncrono de telemetria e dashboard operacional em React.

## Visão geral

AssetOps Platform é um projeto de portfólio que simula um cenário real de acompanhamento de ativos industriais. A aplicação recebe leituras de telemetria, persiste os dados, publica eventos para processamento assíncrono, gera alertas operacionais e disponibiliza uma interface web para consulta do estado dos ativos.

O projeto foi construído para demonstrar uma visão completa de plataforma: backend, frontend, mensageria, persistência, contratos compartilhados, conteinerização e organização em monorepo.

## Problema

Ambientes industriais dependem de dados contínuos sobre seus equipamentos para acompanhar condições de operação, identificar desvios e priorizar ações. Leituras como temperatura e vibração precisam ser recebidas com consistência, processadas de forma desacoplada e apresentadas em uma visão simples para tomada de decisão.

## Solução

A plataforma organiza esse fluxo em serviços especializados:

- uma API de ingestão recebe leituras de telemetria dos ativos;
- os dados são persistidos em PostgreSQL;
- eventos de telemetria são publicados em um broker compatível com Kafka;
- um worker assíncrono processa eventos e cria alertas com base em regras operacionais;
- uma API de consulta expõe ativos, telemetria e alertas para consumo do dashboard;
- uma aplicação React apresenta indicadores, status dos ativos e alertas filtráveis.

Essa separação mantém o recebimento de telemetria independente do processamento de alertas e cria uma base adequada para evolução incremental da plataforma.

## Funcionalidades

- Ingestão de telemetria por API REST.
- Validação do payload de telemetria antes da persistência.
- Persistência de leituras em PostgreSQL.
- Publicação de eventos de telemetria em tópico Kafka-compatible.
- Processamento assíncrono de eventos por worker dedicado.
- Geração de alertas para temperatura crítica e vibração em nível de atenção.
- API de leitura para ativos, telemetria e alertas.
- Dashboard web com KPIs, lista de ativos, status operacional e filtros de alertas.
- Tipos TypeScript compartilhados entre aplicações do monorepo.
- Ambiente local orquestrado com Docker Compose.

## Stack

**Backend**

- Node.js
- TypeScript
- Express
- PostgreSQL
- Kafka-compatible broker / Redpanda

**Frontend**

- React
- TypeScript
- Vite
- Redux Toolkit
- Redux Saga
- Storybook

**Plataforma e infraestrutura implementadas**

- Docker
- Docker Compose
- npm workspaces

**Próximos experimentos de infraestrutura**

- Kubernetes
- Terraform
- GCP

## Arquitetura

O repositório é organizado como um monorepo com aplicações independentes e um pacote compartilhado de contratos TypeScript.

```text
[Asset / Simulator]
        |
        v
[telemetry-api] ---> [PostgreSQL]
        |
        v
[Kafka-compatible broker] ---> [alert-worker] ---> [PostgreSQL]

[dashboard-web] ---> [query-api] ---> [PostgreSQL]
```

### Serviços

- **telemetry-api**: API responsável por receber leituras de telemetria, validar o corpo da requisição, persistir os dados e publicar eventos.
- **alert-worker**: consumidor assíncrono que processa eventos de telemetria e registra alertas operacionais.
- **query-api**: API de leitura usada pelo frontend para consultar ativos, telemetria e alertas.
- **dashboard-web**: interface web para visualização operacional dos ativos e alertas.
- **@assetops/shared-types**: pacote com tipos compartilhados para manter consistência entre serviços.

## Como rodar

### Pré-requisitos

- Node.js
- npm
- Docker
- Docker Compose

### Instalação

```bash
npm install
```

### Subir dependências e serviços com Docker Compose

```bash
docker compose up --build
```

Esse comando inicializa PostgreSQL, Redpanda, `telemetry-api`, `query-api` e `alert-worker`.

### Rodar serviços em modo desenvolvimento

Em terminais separados, execute:

```bash
npm run dev:telemetry
npm run dev:query
npm run dev:worker
```

Para o dashboard web, acesse o workspace da aplicação e execute o script de desenvolvimento definido no pacote:

```bash
cd apps/dashboard-web
npm run dev
```

### Builds disponíveis

```bash
npm run build:shared-types
npm run build:telemetry
npm run build:query
npm run build:worker
```

## Configuração

As variáveis abaixo configuram os serviços localmente. Os valores devem ser definidos em arquivos `.env` locais ou no ambiente de execução, sem versionar secrets reais.

### telemetry-api

```env
PORT=
NODE_ENV=
DATABASE_URL=
KAFKA_BROKERS=
KAFKA_CLIENT_ID=
KAFKA_TOPIC_TELEMETRY=
```

### query-api

```env
PORT=
NODE_ENV=
DATABASE_URL=
```

### alert-worker

```env
NODE_ENV=
DATABASE_URL=
KAFKA_BROKERS=
KAFKA_CLIENT_ID=
KAFKA_GROUP_ID=
KAFKA_TOPIC_TELEMETRY=
```

### dashboard-web

```env
VITE_QUERY_API_URL=
```

## Decisões técnicas

- **Monorepo com workspaces** para manter serviços e contratos compartilhados no mesmo repositório, simplificando evolução coordenada entre backend e frontend.
- **TypeScript ponta a ponta** para reforçar previsibilidade nos contratos de dados e reduzir divergências entre aplicações.
- **Arquitetura orientada a eventos** para desacoplar ingestão de telemetria e criação de alertas.
- **Worker dedicado para processamento assíncrono** para manter a API de ingestão focada no recebimento rápido das leituras.
- **PostgreSQL como base relacional** para persistência consistente de telemetria, ativos derivados e alertas.
- **Redpanda como broker Kafka-compatible no ambiente local** para simplificar a experiência de desenvolvimento mantendo o modelo de mensageria distribuída.
- **API de leitura separada** para organizar o consumo do dashboard e preservar uma divisão clara entre escrita, processamento e consulta.
- **Componentização do frontend** para estruturar a interface em peças reutilizáveis, com suporte a Storybook para documentação visual de componentes.

## Status

O projeto apresenta um fluxo funcional de ponta a ponta para monitoramento de ativos: ingestão de telemetria, persistência, publicação de eventos, processamento assíncrono de alertas, API de consulta e dashboard operacional.

A base atual está preparada para demonstrações locais, experimentação arquitetural e evolução progressiva de recursos de produto e infraestrutura.

## Roadmap

- Adicionar simulador de ativos para geração contínua de telemetria.
- Expandir regras de alertas com políticas configuráveis por tipo de ativo.
- Incluir autenticação e perfis de acesso para uso multiusuário.
- Evoluir observabilidade com métricas, logs estruturados e tracing distribuído.
- Adicionar testes automatizados de integração entre APIs, banco e broker.
- Implementar e publicar manifests Kubernetes e módulos Terraform para experimentos de deploy em cloud.
- Aprimorar visualizações históricas de telemetria no dashboard.

## O que este projeto demonstra

- Modelagem de uma plataforma distribuída baseada em serviços.
- Construção de APIs REST com Node.js, Express e TypeScript.
- Uso de mensageria para processamento assíncrono e desacoplamento entre serviços.
- Persistência relacional com PostgreSQL.
- Organização de monorepo com contratos compartilhados.
- Desenvolvimento frontend com React, Vite, Redux Toolkit e Redux Saga.
- Composição de ambiente local com Docker Compose.
- Pensamento arquitetural aplicado a ingestão, processamento, leitura e visualização de dados operacionais.
