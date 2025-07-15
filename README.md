# 💳 Gateway de Pagamentos Resiliente / Resilient Payment Gateway

<details>
<summary><strong>🇧🇷 Português</strong></summary>

## Sobre o Projeto

Este projeto implementa um gateway de pagamentos inteligente em Node.js e TypeScript, projetado para alta disponibilidade, resiliência e otimização de custos.

O sistema roteia pagamentos entre dois processadores:
- **Processador A**: Baixo custo, mas instável.
- **Processador B**: Custo mais alto, porém estável.

Utilizando o padrão **Circuit Breaker**, o gateway prioriza o Processador A, mas realiza fallback automático e instantâneo para o Processador B em caso de falhas ou lentidão, garantindo que a operação nunca pare.

## Tecnologias Utilizadas
- **Linguagem**: TypeScript
- **Plataforma**: Node.js com Express.js
- **Padrões de Projeto**: Circuit Breaker, Adapter
- **Ferramentas**: Docker, Jest (Testes), Opossum (Circuit Breaker)

## Como Executar o Projeto

1. **Pré-requisitos**:
    - Docker e Docker Compose instalados.

2. **Execução**:
    - Clone este repositório.
    - Edite os arquivos `.env` conforme necessário.
    - Execute:
      ```bash
      docker-compose up --build
      ```
    - O gateway estará disponível em `http://localhost:3000/pagar`.

3. **Testes Automatizados**
    - Para rodar os testes unitários do gateway:
      ```bash
      cd payment-gateway
      npm install
      npm test
      ```

## Exemplo de Requisição

```json
POST http://localhost:3000/pagar
{
  "valor": 100,
  "cliente": "joao",
  "cartao": {
    "numero": "1234567890123456",
    "cvv": "123",
    "validade": "12/25"
  }
}
```

## Arquitetura
- **Circuit Breaker**: Implementado com Opossum para garantir resiliência.
- **Fallback**: Se o processador principal falhar, o gateway faz fallback automático.
- **Containerização**: Cada serviço roda em seu próprio container Docker.

## Segurança e Produção
- Variáveis de ambiente para configuração.
- Pronto para deploy em qualquer ambiente Docker.
- Para produção real, recomenda-se adicionar autenticação, HTTPS, validação de dados e monitoramento.

---
</details>

<details open>
<summary><strong>🇺🇸 English</strong></summary>

## About the Project

This project implements a smart payment gateway in Node.js and TypeScript, designed for high availability, resilience, and cost optimization.

The system routes payments between two processors:
- **Processor A**: Low cost, but unstable.
- **Processor B**: Higher cost, but stable.

Using the **Circuit Breaker** pattern, the gateway prioritizes Processor A, but automatically and instantly falls back to Processor B in case of failures or slowness, ensuring the operation never stops.

## Technologies Used
- **Language**: TypeScript
- **Platform**: Node.js with Express.js
- **Design Patterns**: Circuit Breaker, Adapter
- **Tools**: Docker, Jest (Testing), Opossum (Circuit Breaker)

## How to Run the Project

1. **Prerequisites**:
    - Docker and Docker Compose installed.

2. **Execution**:
    - Clone this repository.
    - Edit the `.env` files as needed.
    - Run:
      ```bash
      docker-compose up --build
      ```
    - The gateway will be available at `http://localhost:3000/pagar`.

3. **Automated Tests**
    - To run unit tests for the gateway:
      ```bash
      cd payment-gateway
      npm install
      npm test
      ```

## Request Example

```json
POST http://localhost:3000/pagar
{
  "valor": 100,
  "cliente": "joao",
  "cartao": {
    "numero": "1234567890123456",
    "cvv": "123",
    "validade": "12/25"
  }
}
```

## Architecture
- **Circuit Breaker**: Implemented with Opossum for resilience.
- **Fallback**: If the main processor fails, the gateway automatically falls back.
- **Containerization**: Each service runs in its own Docker container.

## Security & Production
- Environment variables for configuration.
- Ready for deployment in any Docker environment.
- For real production, it is recommended to add authentication, HTTPS, data validation, and monitoring.

---
</details> 