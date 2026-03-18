// Per avere una sola istanza del mailer in tutta l'app.
const mailer = require('nodemailer');

// pw: hjoe snur kouq wais
// Configurazione del mittente di mail.
const transporter = mailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendWelcomeEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Benvenuto su Somesite',
    text: 'Grazie per esserti registrato su Somesite!'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Impossibile inviare l\'email a ${to}:`, error);
    } else {
      console.log(`Email inviata a ${to}`);
    }
  });
};

// Invio dell'email di reset password.
exports.sendResetEmail = (to, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Reset Password',
    text: `Click on the link to reset your password: http://localhost:3000/reset-password/${token}`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Impossibile inviare l\'email a ${to}:`, error);
    } else {
      console.log(`Email inviata a ${to}`);
    }
  });
};

// Notifica di reset password avvenuto.
exports.sendPasswordResetConfirmationEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Reset Password Completato',
    text: 'La tua password è stata resettata con successo!'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Impossibile inviare l\'email a ${to}:`, error);
    } else {
      console.log(`Email inviata a ${to}`);
    }
  });
};

// Notifica account aggiornato.
exports.sendProfileUpdateEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Profilo Aggiornato',
    text: 'Il tuo profilo è stato aggiornato con successo!'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Impossibile inviare l\'email a ${to}:`, error);
    } else {
      console.log(`Email inviata a ${to}`);
    }
  });
};

// Notifica di accesso.
exports.sendLoginNotificationEmail = (to) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Accesso Effettuato',
    text: 'Hai effettuato l\'accesso con successo!'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Impossibile inviare l\'email a ${to}:`, error);
    } else {
      console.log(`Email inviata a ${to}`);
    }
  });
};
