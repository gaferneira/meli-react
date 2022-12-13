# MeLi Test

Esto es un ejemplo de una aplicación en React desarrollada con clean architecture usando la API de mercadolibre.

## - Funcionalidades

- Busqueda de productos
- Guardado de favoritos

## - Tecnologias utilizadas

- Typescript
- Clean architecture
- Redux Toolkit
- Vite
- MUI
- Unit tests (ts-mockito, vitest, jest, testing-library)
- Cypress, E2E tests
- Git actions
- ESLint

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

Comando para correr Cypress

```
npm run cypress
```

## - Code Quality Checks

```
npm run lint
```

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
