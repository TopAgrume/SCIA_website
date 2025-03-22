# EPITA SCIA Major Website

This project is the repository of the EPITA SCIA Major of EPITA. The tech stack is pretty simple :

- **Next.js** for frontend (_React + TS_) and backend (_TS_).
- **PostgreSQL**.
- **Prisma** as the ORM, used in the backend.
- **Liquibase** as DB migration tool.
- **Docker** for containers.

## Prerequisites

- _Node_ version: **22.9.0**.
- _npm_ version: **10.9.0**.
- _Docker_ and _Docker Compose_.
- _Make_ (for command aliases).

We also recommend to install these tools for easier development :

- A DB tool such as **DBeaver**.
- An API platform such as **Insomnia** or **Postman**.
- VSCode extensions: **Prettier**, **ESLint**, **Prettier ESLint**, **Prettier SQL VSCode**.

Also, have a look at docs of the tech stack.

## Development Setup

1. Clone the repository:

   ```console
   foo@bar:~$ git clone https://github.com/TopAgrume/SCIA_website
   foo@bar:~$ cd SCIA_website
   ```

2. Install the dependencies:

   ```bash
   foo@bar:~$ npm install
   ```

3. Set up environment variables:
   Create a `.env` file by doing the following command:

   ```bash
   foo@bar:~$ cp .env.example .env
   ```

4. Start the Development Environment:

   ```bash
   foo@bar:~$ npx prisma generate # generate a prisma client synced with /prisma/schema.prisma to use the prisma API in the backend.
   foo@bar:~$ make dbup
   foo@bar:~$ npm run dev
   ```

   You can also use `make allup` if you want to dockerized the _Next.js_ app (don't do `npm run dev` in that case). Consider using `make dbup` for hot reload when working on front or backend.

   `npx prisma generate` has to be done each time there is changes in _schema.prisma_.

## Production Deployment

- **_TODO_**

## Database Management

Database migrations are handled by **Liquibase**, here is how to use it:

- To add changes to the DB, add a file in _/db/changelogs/developpers_, starting with the date and what the file is about.
- To add this file to the DB version, either add a line to the last changelog file in _/db/chqngelogs/versions_, or create a new changelog file (if so, **change** the **DB_VERSION** in your `.env` file, you can also set it in the `.env.example`). Have a look at `changelog_init.xml` to understand how to add new files and link changelogs.
- Don't modify existing `.sql` files in _/developpers_, add a new one to update old code.

## Git

- Try using meaningfull commit messages.
- Commit format : `[{branch}] {feat/fix/tests}: {commit_message}`
- It's cool to have PR.
- Consider using **rebase** for sexy history (`merge` is also cool).
  ```bash
  foo@bar:~$ git branch
  > my_branch
  foo@bar:~$ git fetch origin main # if you want to merge on main
  foo@bar:~$ git rebase main
  foo@bar:~$ git checkout main
  foo@bar:~$ git merge my_branch
  ```

## Code Quality

```bash
foo@bar:~$ npm run lint    # Run ESLint check
foo@bar:~$ npm run format  # Run ESLint and Prettier fix
```

## Good practices

- If you use LLMs, **always** check and understand the code they produce (which is very error prone).
- Don't trust the user, meaning all frontend validations also need to be done in backend.
- Keep your code clean and concise so that it is understandable.
- Use Vim.
- Handle every error case, and don't show the raw error to the user.
- There is a lot of features in the tools we are using, consider reading the docs and update parts of this README.
- **_Don't Hesitate to add yours!_**

## Questions

Contact `djdonpablo` on Discord.
