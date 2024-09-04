# Todolist Extension

## Description

This is a simple todolist extension for chrome.

# Install dependencies

```bash
pnpm install
```

# Config .env file with the connection Supabase

```bash
VITE_SUPABASE_URL=https://<your_supabase_url>.supabase.co
VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

# Prisma 

initial schema

```bash
npx prisma init
```
Run a migration to create your database tables with Prisma Migrate

```bash
npx prisma migrate dev --name init
```

# Build and install extension

## Build extension

```bash
pnpm build-extension
```
## Install extension in Chrome

1. Open Chrome
1. Go to `chrome://extensions/`
2. Enable `Developer mode`
3. Click on `Load unpacked`
4. Select the `dist` folder
5. The extension should be installed

## Install extension in Firefox

1. Open Firefox
2. Go to `about:debugging#/runtime/this-firefox`
3. Click on `Load Temporary Add-on`
4. Select the `dist/manifest.json` file
5. The extension should be installed
