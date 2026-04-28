# ThingsLog Next.js Monitoring Template

Full-stack Next.js template for ThingsLog partner monitoring portals.

Use this stack when you want one repository with React pages, server-side API routes, and deployment options such as Vercel, Docker, or Node hosting.

## Quick Start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Mock mode is enabled by default. To use real ThingsLog data:

```bash
THINGSLOG_MOCK=false
THINGSLOG_BASE_URL=https://iot.thingslog.com:4443
THINGSLOG_TOKEN=your_api_token
THINGSLOG_DEVICE_NUMBER=00000109
```

## Security

- Keep `THINGSLOG_TOKEN` server-side.
- Do not expose token values through `NEXT_PUBLIC_*` variables.
- Add partner authentication and tenant checks before production use.

