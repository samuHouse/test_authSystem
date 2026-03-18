// Per avere una sola istanza del db in tutta l'app.
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH, (err)=>{
  if(err) console.error(err.message);
  else console.log("Connesso a database.db");
});

module.exports = db;