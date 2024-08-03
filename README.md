# NRL Collection API

NRL Collection API is intended to provide data about the NRL competition which
could include seasons, teams, matches, fixtures, statistics, etc.

## Contributing

For now the project is in a very early development stage. If you would like to
contribute to the project do not hesitate in creating an issue or a pull
request.

## Installation

Clone the project.

```bash
git clone https://github.com/fisocodes/nrl-collection-api.git
```

Install the dependencies.

```bash
npm install
```

Generate Prisma client

```bash
npx prisma generate
```

Run tests

```bash
npm run test
```

Run project in development

```bash
npm run start:dev
```

To see the OpenAPI specification go to: http://localhost:3000/api

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Roadmap

1. Users module

    - [x] Sign up implementation.
    - [x] Email confirmation flow.
    - [ ] Reset password flow.
    - [ ] Delete account implementation.
    - [ ] Implement unit tests.

2. Authentication module.
    - [x] Generate JWT.
    - [ ] Protect routes.
    - [ ] Implement unit tests.
