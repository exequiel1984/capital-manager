# 📈 CEDEAR Tracker API

A robust, RESTful backend API built with NestJS to track Argentine CEDEAR (Argentine Certificate of Deposit) portfolios. This system features real-time financial market data integration, a fully normalized relational database, and an automated transaction ledger.

## 🚀 Tech Stack
* **Framework:** [NestJS](https://nestjs.com/) (TypeScript)
* **Database:** MySQL & TypeORM
* **Market Data:** Yahoo Finance API (`yahoo-finance2`)

## ✨ Core Features
* **Automated Market Data:** Fetches live stock prices in real-time when executing transactions.
* **Normalized Ledger System:** Separates master asset catalogs from user transactional history.
* **Stateless Architecture:** Designed to serve modern decoupled frontend applications (React/Vue).

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/exequiel1984/cedear-tracker.git](https://github.com/exequiel1984/cedear-tracker.git)