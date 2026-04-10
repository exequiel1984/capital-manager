# 📈 Capital Manager API

A robust, enterprise-grade RESTful backend built with NestJS to manage diverse, multi-asset financial portfolios. 

Originally conceived as a single-asset tracker, this system has been architected for high scalability. It features a fully normalized relational database, secure multi-tenant user authentication, real-time financial market data integration, and cloud-native deployment.

## 🚀 Tech Stack & Infrastructure
* **Framework:** [NestJS](https://nestjs.com/) (TypeScript)
* **Security:** JWT (JSON Web Tokens), `bcryptjs` (Password Hashing)
* **ORM:** TypeORM
* **Database:** MySQL 8 (Hosted on AWS RDS)
* **Market Data:** Yahoo Finance API (`yahoo-finance2`)
* **Architecture:** Modular Domain-Driven Design

## ✨ Core Architecture & Features

* **Secure Identity & Access Management:** Implements a full JWT-based authentication system. User passwords are cryptographically hashed using `bcryptjs` (Linux/cloud optimized), and database records are secured using UUID strings to prevent enumeration attacks.
* **Multi-Tenant Portfolios:** Transactions and assets are strictly mapped to individual authenticated users, allowing multiple investors to securely manage their distinct portfolios on a single server instance.
* **Dynamic Asset Ecosystem:** A normalized database structure (`asset_classes` -> `assets`) that dynamically supports Equities, CEDEARs, Cryptocurrencies, Bonds, and Mutual Funds without requiring schema modifications.
* **Automated Market Data:** Fetches live stock and asset prices in real-time to execute transactions and calculate accurate portfolio valuations.
* **Advanced Technical Analysis Engine:** Processes raw historical market data to perform complex financial calculations on-the-fly, including indicators like the Moving Average Convergence Divergence (MACD).
* **Cloud-Native Database:** Fully integrated with AWS Relational Database Service (RDS) for production-grade data persistence and remote accessibility.
* **Design Principles:** Built utilizing SOLID principles, specifically leveraging NestJS's dependency injection for strict Separation of Concerns between Controllers, Services, and Data Access layers.

## 🛠️ Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/exequiel1984/capital-manager.git
   cd capital-manager
   ```
2. **Install dependencies:**
(Requires Node.js v20+)
   ```bash
   npm install
   ```
3. **Configure Environment Variables:**
Create a .env file in the root directory and add your database credentials and security keys securely (this file is git-ignored):
   ```bash
   DB_PASSWORD=your_secure_rds_password
   JWT_SECRET=your_secure_jwt_secret
   ```
4. **Run the application:**
   ```bash
   npm run start:dev
   ```
## ☁️ Cloud Deployment & CI/CD
This API is deployed and running in production on AWS infrastructure with a fully automated CI/CD pipeline.

### Infrastructure
Compute: AWS EC2 (Ubuntu 24.04 LTS)

Process Manager: PM2 (Daemonized for continuous background execution and auto-restarts)

Networking: Custom VPC Security Groups exposing port 3000 for web traffic.

### Automated Deployment (GitHub Actions)
The deployment process is entirely zero-touch. Whenever code is pushed to the main branch, a GitHub Actions workflow automatically:

1. Connects securely to the AWS EC2 server via SSH.

2. Pulls the latest code repository.

3. Installs dependencies and builds the production-ready TypeScript code.

4. Seamlessly restarts the PM2 daemon to serve the updated API with zero downtime.