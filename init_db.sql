-- Creazione tabella utenti.
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL CHECK(email LIKE '%_@__%.__%'),
  -- Da hashare.
  password TEXT NOT NULL,
  reset_tkn TEXT,
  reset_exp TIMESTAMP
);

/* Il db non è popolato in quanto le password sono hashate e non memorizzate in chiaro; 
 * oltretutto è necessaria un'email con cui ricevere notifiche per testare il software.
 * È consigliato creare un utente con un'email di test e una password semplice, in modo
 * da poter testare tutte le funzionalità dell'applicativo.
 */
