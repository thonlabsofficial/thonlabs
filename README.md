# ThonLabs Frontend Monorepo

ThonLabs is an open-source all-in-one platform that gives your SaaS the foundation it needs — with plug-and-play authentication, user and organization management, and more.

Join our waitlist - https://thonlabs.io

## Getting started

This is the frontend project and uses Next.js, TailwindCSS, ShadcnUI, turborepo and more.

### How to install

Make sure you have `pnpm` installed, since it's our package manager.

```bash
npm i -g pnpm
```

Install the packages

```bash
pnpm i
```

ThonLabs uses ThonLabs, so you need to create an `.env` file at `apps/labs` and adds your ThonLabs Environment ID and Public Key

```markdown
NEXT_PUBLIC_TL_API=http://localhost:3100 # Backend server URL
NEXT_PUBLIC_TL_AUTH_API=http://localhost:3100 # Backend server URL
NEXT_PUBLIC_TL_ENV_ID=<your_env_id>
NEXT_PUBLIC_TL_PK=<your_public_key>
```

**[Here](https://github.com/codeguslabs/thonlabs-services) you can learn how to setup the ThonLabs Services**

Run the project

```bash
turbo dev --filter labs
```

The project will start on port `https://localhost:3000`
