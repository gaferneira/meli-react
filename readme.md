# MeLi Test

Esto es un ejemplo de una aplicación en React desarrollada con clean architecture usando la API de mercadolibre.

## - Funcionalidades

- Busqueda de productos
- Guardado de favoritos

## - Tecnologias utilizadas

- TypeScript 5
- Clean architecture
- React 19
- Redux Toolkit 2
- Vite 8
- MUI 9
- Emotion (styling)
- Unit tests (vitest, testing-library)
- Playwright, E2E tests
- GitHub Actions
- ESLint 9 (flat config)
- Prettier 3

## - Clean architecture

El proyecto está estructurado en 3 módulos, cada módulo representa una capa de clean architecture

- UI (Components, redux, hocs)
- Domain (use cases, repositories, entities...)
- Data (api rest, localstorage...)

## - Testing

- Cada capa contiene sus propias pruebas unitarias

```
npm run test
```

## - Integration Testing

Comando para correr Playwright

```
npm run e2e
```

## - Code Quality Checks

```
npm run lint
```

## - Setup

Copy `.env.example` to `.env.local` and configure the required environment variables:

```
cp .env.example .env.local
```

Then run the development server:

```
npm run dev
```

Required environment variables:
- `VITE_API_URL`: Base URL for the MercadoLibre API (e.g., `https://api.mercadolibre.com`)

### Desarrollado por

Silvia Juliana Torres [linkedIn](https://www.linkedin.com/in/silvia-juliana-torres-gaona)

Gabriel Fernando Neira [linkedIn](https://www.linkedin.com/in/gabriel-fernando-neira-bermudez-419b2265)

### License

GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

---
