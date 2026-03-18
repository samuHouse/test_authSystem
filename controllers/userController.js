// Connessione al db.
const db = require('../database/db');
// Per lettura del cookie.
const SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
// Per invio email.
const mailer = require('../notification/mailer');

// Modifica profilo.
exports.editProfile = (req, res) => {
    const { newUsername } = req.body;
    // Verifica del token.
    if (req.cookies) {
        const token = req.cookies.token;
        try {
            const decoded = jwt.verify(token, SECRET);
            req.userId = decoded.id;
        } catch (err) {
            return res.status(401).send('Token non valido');
        }
    } else {
        return res.status(401).send('Sessione scaduta');
    }
    const sql = `UPDATE utenti SET username = ? WHERE id = ?`;
    db.run(sql, [newUsername, req.userId], function(err) {
        if (err) {
            res.status(400).send('Username già usato');
        } else {
            const sqlEmail = `SELECT email FROM utenti WHERE id = ?`;
            db.get(sqlEmail, [req.userId], function(err, row) {
                if (err) {
                    res.status(400).send('Errore durante il recupero dell\'email');
                } else {
                    mailer.sendProfileUpdateEmail(row.email);
                }
                // Aggiorna email comunque, non è un errore critico.
                res.send('Profilo modificato');
            });
        }
    });
};

exports.getProfile = (req, res) => {
    // Verifica del token.
    if (req.cookies) {
        const token = req.cookies.token;
        try {
            const decoded = jwt.verify(token, SECRET);
            req.userId = decoded.id;
        } catch (err) {
            return res.status(401).send('Token non valido');
        }
    } else {
        return res.status(401).send('Sessione scaduta');
    }
    const sql = `SELECT username FROM utenti WHERE id = ?`;
    db.get(sql, [req.userId], function(err, row) {
        if (err) {
            res.status(400).send('Errore durante il recupero del profilo');
        } else {
            res.json(row);
        }
    });
};