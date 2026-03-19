# test_authSystem
prova pratica su un sistema di autenticazione (registrazione, login, update profilo) integrato con logiche di reset password e notifiche email.

Il sistema si basa sulle seguenti tecnologie:
- Database: SQLite (comodo per il testing, non va hostato e gira interamente su un file)
- Backend: Node + Express
- Frontend: nessun framework HTML + CSS + plain Javascript per API.

Il database è inizializzato vuoto e ha la seguente struttura: unica tabella `utenti` con i campi:
- `id`: intero, chiave primaria con autoincrement
- `username`: testuale, non nullo e unico
- `email`: testuale, non nullo, unico e soggetto a controlli sul formato (`'%_@__%.__%'`)
- `password`: testuale, non nulla e hashata (andrebbero introdotti anche controlli su lunghezza e formato, per testare velocemente non li ho messi)
- `reset_tkn`: testuale, può essere null
- `reset_exp`: timestamp. può essere null.

# Setup

Le dipendenze del sistema sono *NodeJs* e *SQLite*.

[Download SQLite](https://sqlite.org/download.html), per Windows consiglio la versione "sqlite-tools-win-x64-3510300.zip".
[Download NodeJs](https://nodejs.org/en/download).

La creazione del DB avviene tramite il comando `sqlite3 [database].db`, in seguito si può incollare lo script fornito nel file `init_db.sql`.

Se si ha GitBash si può anche usare un redirect:
`sqlite3 database_sqlite.db < init_db.sql`

il file .env va configurato con le seguenti variabili:

PORT=3000
DB_PATH=./database_sqlite.db
JWT_SECRET=chiave_JWT
EMAIL_USER=e-mail_per_notifiche
EMAIL_PASS=password_per_app_Google

Una volta creato il DB si inserisce il percorso del file nel file `.env`.

Si configura il file `.env` con una mail valida che fungerà da vettore delle notifiche con una apposita password per le app per permettere i servizi SMTP. 

Si sceglie una chiave per la codifica e la decodifica dei JWT token.

Si installano le dipendenze della backend lanciando il comando `npm install` all'interno della root.

Si avvia il server lanciando il comando `node ./index.js` sempre all'interno della root.

Infine il servizio web sarà accessibile all'url <http://localhost:3000> (porta di default, si può cambiare in env).

Le API esposte sono:
POST /register
POST /login
POST /reset-password
POST /forgot-password
POST /user/edit
GET  /user/profile

consultabili nelle cartelle `routes/` e `controller/`.