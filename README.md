# url-shortener

A self-hosted URL shortener in ~50 lines — Express + better-sqlite3.

## Quick start

```bash
npm install
node server.js
```

## API

```bash
curl -X POST localhost:3000/api/shorten \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://example.com/very/long/path"}'
# => {"short":"http://localhost:3000/x9f2kA"}
```

Visiting the short link redirects to the original URL.
