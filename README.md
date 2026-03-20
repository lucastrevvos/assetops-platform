# AssetOps Platform

Technical showcase of a modern microservices platform for industrial asset monitoring, built to study and demonstrate practical knowledge in distributed systems, event-driven architecture, cloud infrastructure and scalable frontend/backend design.

## Overview

AssetOps Platform is a hands-on architecture lab designed to simulate a real-world industrial monitoring scenario.

The platform receives telemetry from industrial assets, processes events asynchronously, generates alerts, and exposes operational data to a dashboard. It was created as both:

- a learning project for modern platform engineering concepts
- a technical portfolio piece to demonstrate practical experience with production-oriented stacks

## Goals

This project is focused on learning by building, with emphasis on:

- microservices architecture
- REST APIs
- event-driven communication
- asynchronous processing
- frontend state management
- infrastructure as code
- containerization and orchestration
- cloud-native deployment patterns

## Tech Stack

### Backend
- Node.js
- TypeScript
- Express
- PostgreSQL
- Kafka

### Frontend
- React
- TypeScript
- Redux Toolkit
- Redux Saga
- Storybook

### Platform / Infra
- Docker
- Kubernetes
- Terraform
- GCP

## Proposed Architecture

```text
[Asset / Simulator]
        |
        v
[telemetry-api] ---> [PostgreSQL]
        |
        v
      [Kafka] ---> [alert-worker] ---> [PostgreSQL]

[dashboard-web] ---> [query-api] ---> [PostgreSQL]
