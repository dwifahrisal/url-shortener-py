const express = require('express');
const Database = require('better-sqlite3');
const crypto = require('crypto');

const app = express();
const db = new Database('links.db');

db.exec('CREATE TABLE IF NOT EXISTS links (id TEXT PRIMARY KEY, url TEXT NOT NULL)');

app.use(express.json());

app.post('/api/shorten', (req, res) => {
  const url = (req.body || {}).url;
  if (!url || !/^https?:\/\//.test(url)) {
    return res.status(400).json({ error: 'invalid url' });
  }
  const id = crypto.randomBytes(4).toString('base64url');
  db.prepare('INSERT INTO links (id, url) VALUES (?, ?)').run(id, url);
  res.json({ short: `http://localhost:3000/${id}` });
});

app.get('/:id', (req, res) => {
  const row = db.prepare('SELECT url FROM links WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).send('not found');
  res.redirect(row.url);
});

app.listen(3000, () => console.log('listening on :3000'));
