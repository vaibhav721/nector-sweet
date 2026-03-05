# Nectar Sweet MVP Monorepo

Full-stack MVP for a local dairy commerce platform.

## Projects
- `web` - React + Tailwind website and admin panel
- `mobile` - Expo React Native app (iOS + Android)
- `server` - Node.js + Express REST API with MongoDB
- `shared` - shared types/config/constants/validators

## Quick start
```bash
npm install
cp server/.env.example server/.env
cp web/.env.example web/.env
cp mobile/.env.example mobile/.env
npm run seed -w server
npm run dev:server
npm run dev:web
npm run dev:mobile
```

Detailed strategy, flows, schema, and extension plan:
- `docs/NECTAR_SWEET_MVP_BLUEPRINT.md`
