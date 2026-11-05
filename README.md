# Mealio

Mealio is a REST API that turns whatever ingredients you have on hand into a full recipe. Tell it a meal you want to cook and what's in your kitchen, and an AI generates a complete recipe (ingredients, steps, cook time, difficulty) — plus a shopping list for anything you're missing.

## Features

- **JWT auth** — sign up, log in, and fetch the current user.
- **AI recipe generation** — given a meal name and your available ingredients, generates a full recipe via [OpenRouter](https://openrouter.ai).
- **Cooking context** — every generated recipe includes an estimated cook time (minutes) and a difficulty rating (`EASY` / `MEDIUM` / `HARD`).
- **Auto shopping lists** — ingredients the recipe needs that you didn't say you have are automatically collected into a shopping list.
- **Recipe history** — list all recipes you've previously generated.

## Tech stack

- [Express](https://expressjs.com/) + TypeScript
- [Prisma](https://www.prisma.io/) with the `pg` driver adapter, backed by PostgreSQL ([Neon](https://neon.tech/))
- JWT auth (`jsonwebtoken` + `bcryptjs`)
- AI recipe generation via [OpenRouter](https://openrouter.ai)

## Getting started

### Prerequisites

- Node.js
- A PostgreSQL database (e.g. a free [Neon](https://neon.tech/) instance)
- An [OpenRouter](https://openrouter.ai/keys) API key

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env` and fill in your own values:

   ```env
   DATABASE_URL="postgresql://..."
   PORT=3000
   NODE_ENV=development
   JWT_SECRET="a-long-random-secret"
   OPENROUTER_API_KEY="sk-or-v1-..."
   OPENROUTER_MODEL="openai/gpt-4o-mini"
   ```

3. Push the Prisma schema to your database:

   ```bash
   npx prisma db push
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`.

## Scripts

| Command                | Description                              |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Start the API with hot reload             |
| `npm run build`         | Compile TypeScript to `dist/`             |
| `npm start`             | Run the compiled build                    |
| `npm run prisma:generate` | Regenerate the Prisma client            |

## API reference

All request/response bodies are JSON. Authenticated routes require an `Authorization: Bearer <token>` header, using the token returned from sign up or login.

### Auth

| Method | Route              | Auth | Body                                 | Description                  |
| ------ | ------------------- | ---- | ------------------------------------- | ----------------------------- |
| POST   | `/api/auth/signup`  | No   | `{ name, email, password }`          | Create an account            |
| POST   | `/api/auth/login`   | No   | `{ email, password }`                | Log in                       |
| GET    | `/api/auth/me`      | Yes  | —                                      | Get the current user         |

### Recipes

| Method | Route                 | Auth | Body                                                | Description                                  |
| ------ | ---------------------- | ---- | ----------------------------------------------------- | ---------------------------------------------- |
| GET    | `/api/recipes`        | Yes  | —                                                       | List your generated recipes                  |
| POST   | `/api/recipes/generate` | Yes  | `{ mealName: string, availableIngredients: string[] }` | Generate a recipe and save it                |

A generated recipe looks like:

```json
{
  "recipe": {
    "id": "...",
    "title": "Garlic Butter Shrimp Pasta",
    "description": "...",
    "cuisine": "Italian",
    "servings": 4,
    "cookTimeMinutes": 25,
    "difficulty": "EASY",
    "ingredients": [{ "name": "shrimp", "quantity": 1, "unit": "lb" }],
    "steps": [{ "order": 1, "instruction": "..." }],
    "shoppingLists": [{ "items": [{ "name": "garlic", "quantity": 3, "unit": "cloves" }] }]
  }
}
```

## Project structure

```
src/
  controllers/   # request handlers
  routes/        # Express routers
  middleware/    # auth middleware
  services/      # AI recipe generation
  lib/           # Prisma client, JWT helpers
prisma/
  schema.prisma  # data model
  migrations/    # migration history
```
