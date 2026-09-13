# Food Factory Backend

This workspace now includes a simple JavaScript/Node Express + Sequelize-style project skeleton inspired by the requested structure.

## Structure

- `src/config` for environment and database configuration
- `src/modules/auth`, `src/modules/users`, and `src/modules/products` for feature modules
- `src/database/models`, `migrations`, and `seeders` for persistence concerns
- `src/middlewares` for auth, error, validation, and not-found handling
- `src/utils` for response, pagination, JWT, and async wrapper helpers
- `src/routes/index.js` for route aggregation

## Getting started

1. Copy `.env.example` to `.env` and configure values.
2. Install dependencies.
3. Run the application with `node src/server.js`.
