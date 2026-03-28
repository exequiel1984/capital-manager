# 📈 Capital Manager API

A robust, enterprise-grade RESTful backend built with NestJS to manage diverse, multi-asset financial portfolios. 

Originally conceived as a single-asset tracker, this system has been architected for high scalability. It features a fully normalized relational database capable of handling infinite asset classes, real-time financial market data integration, and cloud-native deployment.

## 🚀 Tech Stack & Infrastructure
* **Framework:** [NestJS](https://nestjs.com/) (TypeScript)
* **ORM:** TypeORM
* **Database:** MySQL 8 (Hosted on AWS RDS)
* **Market Data:** Yahoo Finance API (`yahoo-finance2`)
* **Architecture:** Modular Domain-Driven Design

## ✨ Core Architecture & Features

* **Dynamic Asset Ecosystem:** A normalized database structure (`asset_classes` -> `assets`) that dynamically supports Equities, CEDEARs, Cryptocurrencies, Bonds, and Mutual Funds without requiring schema modifications.
* **Automated Market Data:** Fetches live stock and asset prices in real-time to execute transactions and calculate accurate portfolio valuations.
* **Cloud-Native Database:** Fully integrated with AWS Relational Database Service (RDS) for production-grade data persistence and remote accessibility.
* **Design Principles:** Built utilizing SOLID principles, specifically leveraging NestJS's dependency injection for strict Separation of Concerns between Controllers, Services, and Data Access layers.

## 🛠️ Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/exequiel1984/capital-manager.git](https://github.com/exequiel1984/capital-manager.git)
   cd capital-manager