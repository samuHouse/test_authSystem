// Connessione al db.
const db = require('../database/db');
// Per hashing delle password.
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Per generazione token.
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
// JWT
const SECRET = process.env.JWT_SECRET;
// Per invio delle mail.
const mailer = require('../notification/mailer');

// Registrazione.
exports.register = (req, res) => {
    // Etrazione dei dati dalla richiesta.
    const { username, email, password } = req.body;
    // Query di inserimento, l'utilizzo di '?' previene SQL injection.
    const sql = `INSERT INTO utenti (username, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [username, email, bcrypt.hashSync(password, saltRounds)], function(err) {
        if(err) {
            // Controllo per errori di unicità.
            if(err.message.includes('UNIQUE constraint failed: utenti.username')) {
                res.status(400).send('Username già usato.');
            } else if(err.message.includes('UNIQUE constraint failed: utenti.email')) {
                res.status(400).send('Email già usata.');
            } else {
                res.status(400).send('Errore durante la registrazione.');
            }
        }
        else {
            // Crezione JWT.
            const token = jwt.sign({ id: this.lastID, username }, SECRET, { expiresIn: '1h' });
            // Invio tramite cookie http.
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax"
            });
            mailer.sendWelcomeEmail(email);
            res.send('Registrazione avvenuta con successo.');
        }
    });
};

// Login.
exports.login = (req, res) => {
    const { email, password } = req.body;
    // Query di selezione.
    const sql = `SELECT * FROM utenti WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        // Se esiste un record -> login, se non esiste -> credenziali non valide, altrimenti -> errore.
        if(err) res.status(400).send('Errore durante il login.');
        else if(row) {
            // Verifica della password.
            if(bcrypt.compareSync(password, row.password)) {
                // Anche qui JWT.
                const token = jwt.sign({ id: row.id, username: row.username }, SECRET, { expiresIn: '1h' });
                res.cookie("token", token, {
                    httpOnly: true,
                    // in locale metto false.
                    secure: false,
                    sameSite: "lax"
                });
                mailer.sendLoginNotificationEmail(email);
                res.send('Accesso effettuato.');
            } else {
                res.status(401).send('Credenziali errate.');
            }
        } else {
            res.status(401).send('Utente non registrato.');
        }
    });
};

// Invio email per reset password.
exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    // Salvo il token in chiaro per comodità, andrebbe hashato.
    const tkn = crypto.randomBytes(20).toString('hex');
    const sql = `UPDATE utenti SET reset_tkn = ?, reset_exp = ? WHERE email = ?`;
    // Token con scadenza di 10 minuti.
    db.run(sql, [tkn, Date.now() + (1000 * 60 * 10), email], function(err) {
        if(err) {
            res.status(400).send('Errore durante il recupero della password.');
        } else {
            mailer.sendResetEmail(email, tkn);
            res.send(`Email di reset inviata all\'indirizzo ${email}.`);
        }
    }); 
}

// Reset password.
exports.resetPassword = (req, res) => {
    const { token, newPassword } = req.body;
    // Cerco l'utente per il token fornito, veloce ma non sicuro.
    const searchSql = `SELECT * FROM utenti WHERE reset_tkn = ?`;
    db.get(searchSql, [token], (err, row) => {
        if(err) {
            res.status(400).send('Errore durante il reset della password.');
        } else if(row) {
            // Controllo scadenza token.
            if(row.reset_exp < Date.now()) {
                res.status(400).send('Sessione scaduta.');
            } else {
                // Aggiorno la password e rimuovo il token.
                const updateSql = `UPDATE utenti SET password = ?,
                    reset_tkn = NULL, reset_exp = NULL WHERE id = ?`;
                db.run(updateSql, [bcrypt.hashSync(newPassword, saltRounds), row.id], function(err) {
                    if(err) {
                        res.status(400).send('Errore durante il reset della password.');
                    } else {
                        mailer.sendPasswordResetConfirmationEmail(row.email);
                        res.send('Password aggiornata con successo. Ritenta il login.');
                    }
                });
            }
        // Se non esiste un record -> token non valido.
        } else {
            res.status(400).send('Sessione scaduta.');
        }
    });
};