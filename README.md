## How to Start App

### For detailed info on this app such as Use Case Diagram, ERD, Date Flow etc, please view the presentation file **Slide Deck KHS.pdf**

You need nodejs installed, please follow instructions from here: https://nodejs.org/en/download

Install yarn

```bash
npm install --global yarn
```

## Getting Started

Run Project:

```bash
yarn dev
```

## Deploy Supabase

You need to make a new Supabase project and put the keys in your .env file, sample .env file is in .env.example

for DATABASE_URL and DIRECT_URL please refer to this article on how to find it in supabase: https://medium.com/@tibetdelek/supabase-and-prisma-setup-bfcd5d3c7e8b

## Migrate Database

After creating database, you need to push to supabase to create the tables using the migration files already created

```bash
npx prisma migrate reset
```

and then run prisma seed for dummy data

```bash
npx prisma db seed
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
